import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/classes/product';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  public products: Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService) { }


  // Collection
  public categories = [{
    image: 'assets/images/products/gold/one_ounce_american_eagle_obverse.jpg',
    title: 'Gold',
    url: '/products/gold/format'
  }, {
    image: 'assets/images/products/silver/one_ounce_american_eagle_obverse.jpg',
    title: 'Silver',
    url: '/products/silver/format'
  }, {
    image: 'assets/images/products/copper/one_ounce_american_eagle_obverse.jpg',
    title: 'Copper',
    url: '/products/copper/format'
  }, {
    image: 'assets/images/products/supplies/supplies.jpg',
    title: 'Supplies',
    url: '/products/supplies'
  }]
}
