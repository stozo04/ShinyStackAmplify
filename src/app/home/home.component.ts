import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/classes/product';
import { ProductService } from '../shared/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { generateClient } from 'aws-amplify/api';
import { createProduct, updateTodo, deleteTodo } from '../../graphql/mutations';
import { listProducts } from '../../graphql/queries';
import { randomUUID } from 'crypto';

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

  constructor(private _sanitizer: DomSanitizer, public productService: ProductService) {

  }


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


  async ngOnInit(): Promise<void> {
    const client = generateClient();

    // CREATE
    // const result = await client.graphql({
    //   query: createProduct,
    //   variables: {
    //     input: {
    //       id: '24596f0b-2df4-4251-91ab-2a5dafd770ed',
    //       name: '1 oz Buffalo Round',
    //       description: 'The 1 oz Silver Buffalo round captures the essence of American history and natural beauty in a tangible form. Struck from one troy ounce of .999 fine silver, the Silver Buffalo round offers investors a way to own physical Silver. Inspired by the iconic Buffalo Nickel designed by James Earle Fraser in 1913, this round pays homage to the rugged spirit of the American West. The obverse features a detailed profile of a Native American chief, exuding a sense of dignity and cultural significance. On the reverse, a powerful depiction of an American bison stands as a symbol of strength and the untamed wilderness. The 1 oz Silver Buffalo round not only celebrates America\'s past but also gives an accessible way to own a piece of Americana.',
    //       type: 'ROUND',
    //       bullionType: 'SILVER',
    //       quantity: '20',
    //       purchasePrice: '24.30',
    //       weight: '1 oz'
    //     }
    //   }
    // });

    // GET
    const result = await client.graphql({ query: listProducts });
    console.log(result);

    // UPDATE
    // const result = await client.graphql({
    //   query: updateTodo,
    //   variables: {
    //     input: {
    //       id: '423194d8-8396-452e-97b5-8ec43950ce7b',
    //       name: 'My first updated todo!'
    //     }
    //   }
    // });
    // console.log(result);
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#e4604a');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

}
