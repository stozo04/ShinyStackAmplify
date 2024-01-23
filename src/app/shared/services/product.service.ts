import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../classes/product';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { listProducts } from '../../../graphql/queries';
import { updateProduct, deleteProduct, createProduct } from '../../../graphql/mutations';
import { NgToastService } from 'ng-angular-popup';

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
      console.log(result.errors[0])
      if (result.errors[0] !== undefined) {
        console.log(result.errors[0])
        this.toast.error({ detail: "ERROR", summary: `Error saving data: ${result.errors[0].message}`, duration: 5000, position: 'topCenter' });
        return of(null);
      }
      return of(result);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error saving data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('createProduct call failed: ', error);
    }
  }

  public async getProduct(id: string, withImage: boolean): Promise<Observable<Product>> {
    try {
      const result = await this.client.graphql({ query: listProducts, variables: { id: id } });
      console.log('result: ', result)
      if (withImage) {
        // Get Presigned URL
        result.data.listProducts.items.forEach(async item => {
          if (item.imageKey !== null) {
            const signedURL = await getUrl({ key: item.imageKey });
            item.presignedURL = signedURL.url;
          }
        });
      }
      return of(result.data.listProducts.items[0]);
    }
    catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error loading data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('getProducts call failed: ', error);
    }
  }

  public async getProducts(withImage: boolean): Promise<Observable<Product[]>> {
    try {
      const result = await this.client.graphql({ query: listProducts });
      if (withImage) {
        // Get Presigned URL
        result.data.listProducts.items.forEach(async item => {
          if (item.imageKey !== null) {
            const signedURL = await getUrl({ key: item.imageKey });
            item.presignedURL = signedURL.url;
          }
        });
      }
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
  // try {
  //   const response = await list({
  //     prefix: '',
  //     options: {
  //       listAll: true
  //     }
  //   });
  //   console.log('files: ', response)

  //   response.items.forEach(async image => {
  //     //const url = await getUrl({ key: image.key });
  //     console.log('image: ', image)
  //   });
  // } catch (error) {
  //   console.log('Error ', error);
  // }
}
