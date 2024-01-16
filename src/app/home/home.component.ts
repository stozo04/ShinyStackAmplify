import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/classes/product';
import { ProductService } from '../shared/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;

  constructor(private _sanitizer: DomSanitizer,
    public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'watch');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }


  // Collection
  public categories = [{
    image: 'assets/images/products/gold/one_ounce_american_eagle_obverse.jpg',
    title: 'Gold',
    url: '/products/gold'
  }, {
    image: 'assets/images/products/silver/one_ounce_american_eagle_obverse.jpg',
    title: 'Silver',
    url: '/products/silver'
  }, {
    image: 'assets/images/products/copper/one_ounce_american_eagle_obverse.jpg',
    title: 'Copper',
    url: '/products/copper'
  }, {
    image: 'assets/images/products/supplies/supplies.jpg',
    title: 'Supplies',
    url: '/products/supplies'
  }]


  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#e4604a');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
