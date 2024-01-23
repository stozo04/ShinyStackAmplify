import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  // // Product
  // private get products(): Observable<Product[]> {
  //   this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
  //   this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
  //   return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  // }

  // // Get Products
  // public get getProducts(): Observable<Product[]> {
  //   return this.products;
  // }

  // // Get Products By Slug
  // public getProductBySlug(slug: string): Observable<Product> {
  //   return this.products.pipe(map(items => { 
  //     return items.find((item: any) => { 
  //       return item.title.replace(' ', '-') === slug; 
  //     }); 
  //   }));




  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  // public filterProducts(filter: any): Observable<Product[]> {
  //   return this.products.pipe(map(product => 
  //     product.filter((item: Product) => {
  //       if (!filter.length) return true
  //       const Tags = filter.some((prev) => { // Match Tags
  //         if (item.tags) {
  //           if (item.tags.includes(prev)) {
  //             return prev
  //           }
  //         }
  //       })
  //       return Tags
  //     })
  //   ));
  // }

  // Sorting Filter
  // public sortProducts(products: Product[], payload: string): any {

  //   if(payload === 'ascending') {
  //     return products.sort((a, b) => {
  //       if (a.id < b.id) {
  //         return -1;
  //       } else if (a.id > b.id) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'a-z') {
  //     return products.sort((a, b) => {
  //       if (a.title < b.title) {
  //         return -1;
  //       } else if (a.title > b.title) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'z-a') {
  //     return products.sort((a, b) => {
  //       if (a.title > b.title) {
  //         return -1;
  //       } else if (a.title < b.title) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'low') {
  //     return products.sort((a, b) => {
  //       if (a.price < b.price) {
  //         return -1;
  //       } else if (a.price > b.price) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'high') {
  //     return products.sort((a, b) => {
  //       if (a.price > b.price) {
  //         return -1;
  //       } else if (a.price < b.price) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } 
  // }

}
