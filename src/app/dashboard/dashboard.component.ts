import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, catchError, filter, from, map, of, reduce, pipe } from 'rxjs';
import { Product } from '../shared/classes/product';
import e from 'cors';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  userIsLoggedIn: boolean;
  products$ = new BehaviorSubject<Product[]>(null);

  // Initializing totals to zero to ensure defined values.
  totalSILVERPurchase = 0;
  totalSILVERPieces = 0;
  totalCOPPERPurchase = 0;
  totalCOPPERPieces = 0;
  totalCLADPurchase = 0;
  totalCLADPieces = 0;

  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private productService: ProductService
  ) { }

  /**
   * Initializes the component by checking user login status and fetching products.
   */
  async ngOnInit(): Promise<void> {
    this.userIsLoggedIn = this.auth.isUserLoggedIn();
    if (!this.userIsLoggedIn) {
      this.toast.error({ detail: "ERROR", summary: "Permission Denied", duration: 5000, position: 'topCenter' });
      return;
    }
    this.fetchAndProcessProducts();
  }

  /**
   * Fetches all products and processes them to calculate totals based on bullion type.
   */
  private async fetchAndProcessProducts(): Promise<void> {
    const allProducts = await this.productService.getAllProducts(false, false);
    console.log('allProducts: ', allProducts)
    this.processProducts(allProducts);
    this.products$.next(allProducts);
  }

  /**
   * Processes products to calculate total purchases and pieces for each bullion type.
   * @param products The list of products to process.
   */
  private processProducts(products: Product[]): void {

    ['SILVER', 'COPPER', 'CLAD'].forEach(type => {
      const filteredProducts = products.filter(p => p.bullionType === type);
      const totalPurchase = filteredProducts.reduce((acc, curr) => acc + curr.purchasePrice * curr.quantity, 0);
      const totalPieces = filteredProducts.length;

      // Dynamically updating properties based on bullion type
      this[`total${type}Purchase`] = totalPurchase;
      this[`total${type}Pieces`] = totalPieces;
    });
  }
}
