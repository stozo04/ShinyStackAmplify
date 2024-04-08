import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../classes/product';
import { generateClient } from 'aws-amplify/api';
import { getUrl, list, uploadData } from 'aws-amplify/storage';
import { listProducts, getProduct } from '../../../graphql/queries';
import { updateProduct, deleteProduct, createProduct } from '../../../graphql/mutations';
import { NgToastService } from 'ng-angular-popup';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  client = generateClient();
  constructor(private toast: NgToastService) { }

  // Product
  public async createProduct(product: Product): Promise<Observable<Product>> {
    try {
      const result = await this.client.graphql({
        query: createProduct,
        variables: {
          input: product
        }
      });

      return of(result);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error saving data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('createProduct call failed: ', error);
    }
  }

  public async getProduct(id: string, withImage: boolean): Promise<Observable<Product>> {
    try {
      const result = await this.client.graphql({ query: getProduct, variables: { id: id } });
      if (withImage) {
        // Get Presigned URL
        if (result.data.getProduct.imageKey !== null) {
          const signedURL = await getUrl({ key: result.data.getProduct.imageKey });
          result.data.getProduct.presignedURL = signedURL.url;
        }
      }
      return of(result.data.getProduct);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error loading data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('getProducts call failed: ', error);
    }
  }

  /**
   * Fetches all products with optional enhancements.
   *
   * This method retrieves all products up to a limit of 1000. It can optionally
   * fetch presigned URLs for product images if `withImage` is true and sort the products
   * by their `year` if `sorted` is true.
   *
   * @param {boolean} withImage - If true, fetches presigned URLs for product images.
   * @param {boolean} sorted - If true, sorts the products by their `year`.
   * @returns {Promise<Product[]>} A promise that resolves to an array of products,
   * possibly with presigned URLs and sorted by year. In case of error, resolves to an empty array.
   * @throws {Error} Throws an error if the fetching process fails.
   */
  public async getAllProducts(withImage: boolean, sorted: boolean): Promise<Product[]> {
    try {
      const result = await this.client.graphql({
        query: listProducts,
        variables: { limit: 1000 },
      });

      let items = result.data.listProducts.items;

      // Only fetch presigned URLs if withImage is true
      if (withImage) {
        // Use Promise.all to wait for all getUrl promises to resolve
        items = await Promise.all(
          items.map(async (item) => {
            if (item.imageKey) {
              const signedURL = await getUrl({ key: item.imageKey });
              return { ...item, presignedURL: signedURL.url }; // Append presignedURL to the item
            }
            return item;
          })
        );
      }

      // Sort items by year if sorted is true
      if (sorted) {
        items.sort((a, b) => a.year - b.year);
      }

      return items;
    } catch (error) {
      console.error('getProducts call failed: ', error);
      this.toast.error({
        detail: "ERROR",
        summary: `Error loading data: ${error.message || error.err || 'Unknown Error'}`,
        duration: 5000,
        position: 'topCenter',
      });
      return []; // Return an empty array in case of error
    }
  }

  public async getProducts(withImage: boolean, bullionType: string, format: string): Promise<Observable<Product[]>> {
    try {
      // listBlog(filter: { name: { eq: "My New Blog!" } })
      const result = await this.client.graphql(
        {
          query: listProducts,
          variables: {
            filter:
            {
              bullionType: { eq: bullionType },
              format: { eq: format }
            }
          }
        });
      if (withImage) {
        // Get Presigned URL
        result.data.listProducts.items.forEach(async item => {
          if (item.imageKey !== null) {
            const signedURL = await getUrl({ key: item.imageKey });
            item.presignedURL = signedURL.url;
          }
        });
      }
      result.data.listProducts.items.sort((a, b) => a.year - b.year);
      return of(result.data.listProducts.items);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error loading data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('getProducts call failed: ', error);
    }
  }

  public async updateProduct(product: Product): Promise<Observable<Product>> {
    try {
      const result = await this.client.graphql({
        query: updateProduct,
        variables: {
          input: product
        }
      });

      return of(result);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error saving data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('updateProduct call failed: ', error);
    }
  }

  public async deleteProduct(id: string): Promise<Observable<any>> {
    try {

      const result = this.client.graphql({
        query: deleteProduct,
        variables: {
          input: {
            id: id
          }
        }
      });

      return of(null);
    }
    catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  //GET ALL IMAGES
  public async getAllImages(): Promise<void> {
    try {
      const response = await list({
        prefix: '',
        options: {
          listAll: true
        }
      });
      console.log('files: ', response)

    } catch (error) {
      console.log('Error ', error);
    }
  }

  public async uploadImage(image): Promise<Observable<string>> {
    try {
      const result = await uploadData({
        key: uuidv4() + ".jpg",
        data: image
      }).result;
      console.log('Succeeded: ', result);
      this.toast.success({ detail: "SUCCESS", summary: `File Uploaded`, duration: 5000, position: 'topCenter' });
      return of(result.key);
    } catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error uploading file: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('Error uploading file: ', error);
    }
  }
}
