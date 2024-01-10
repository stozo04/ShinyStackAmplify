import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSlider, CollectionSlider } from '../shared/data/slider';
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

  public ProductSliderConfig: any = ProductSlider;
  public CollectionSliderConfig: any = CollectionSlider;
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

  public sliders = [{
    title: 'every time',
    subTitle: 'mittnalier',
    image: 'assets/images/slider/9.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Men Watch',
    image: 'assets/images/slider/10.jpg'
  }];



  // Collection
  public categories = [{
    image: 'assets/images/categories/gold.jpg',
    title: 'Gold',
    text: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Bars</a></li><li><a href="#">Coins</a></li><li><a href="#">By Wieght</a>'),
  }, {
    image: 'assets/images/categories/Silver.jpg',
    title: 'Silver',
    text: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Bars</a></li><li><a href="#">Coins</a></li><li><a href="#">By Wieght</a>'),
  }, {
    image: 'assets/images/categories/copper.jpg',
    title: 'Copper',
    text: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Bars</a></li><li><a href="#">Coins</a></li><li><a href="#">By Wieght</a>'),
  }, {
    image: 'assets/images/categories/Supplies.jpg',
    title: 'Supplies',
    text: this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">TODO</a></li><li><a href="#">TODO</a></li><li><a href="#">TODO</a>'),
  }]

  // collection
  public collections = [{
    image: 'assets/images/collection/watch/1.jpg',
    title: 'minimum 10% off',
    text: 'new watch'
  }, {
    image: 'assets/images/collection/watch/2.jpg',
  }, {
    image: 'assets/images/collection/watch/3.jpg',
    title: 'minimum 10% off',
    text: 'gold watch`'
  }]

  // Blog
  public blogs = [{
    image: 'assets/images/blog/10.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/11.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/12.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/13.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
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