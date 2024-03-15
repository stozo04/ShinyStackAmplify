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
