import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, catchError, filter, from, map, of, reduce, pipe } from 'rxjs';
import { Product } from '../shared/classes/product';
import e from 'cors';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  products$ = new BehaviorSubject<Product[]>(null);

  // Initializing totals to zero to ensure defined values.
  totalSILVERPurchase = 0;
  totalSILVERPieces = 0;
  totalSILVERWeight = 0;
  totalCOPPERPurchase = 0;
  totalCOPPERPieces = 0;
  totalCOPPERWeight = 0;
  totalCLADPurchase = 0;
  totalCLADPieces = 0;
  totalCLADWeight = 0;

  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private productService: ProductService,
    private router: Router
  ) { }

  /**
   * Initializes the component by checking user login status and fetching products.
   */
  async ngOnInit(): Promise<void> {
    if (!this.auth.isUserAuthenticated()) {
      this.toast.error({ detail: "ERROR", summary: "Permission Denied", duration: 5000, position: 'topCenter' });
      this.router.navigate(['/login']);
    }
    await this.fetchAndProcessProducts();
  }

  /**
   * Fetches all products and processes them to calculate totals based on bullion type.
   */
  private async fetchAndProcessProducts(): Promise<void> {
    const allProducts = await this.productService.getAllProducts(false, false);
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
      const totalPieces = filteredProducts.reduce((sum, product) => sum + product.quantity, 0);
      const totalWeight = this.sumWeightsInTroyOunces(filteredProducts);

      // Dynamically updating properties based on bullion type
      this[`total${type}Purchase`] = totalPurchase;
      this[`total${type}Pieces`] = totalPieces;
      this[`total${type}Weight`] = totalWeight;
    });
  }

  // Function to parse the weight and its unit from a string
  private parseWeight(weightStr: string): { value: number, unit: string } {
    const weightParts = weightStr.match(/(\d+(\.\d+)?)\s*(Grams|Troy Ounce)/i);
    if (!weightParts) {
      this.toast.error({ detail: "ERROR", summary: `Invalid weight format: ${weightStr}`, duration: 5000, position: 'topCenter' });
    }
    //console.log('weightParts: ', weightParts)
    return { value: parseFloat(weightParts[1]), unit: weightParts[3].toLowerCase() };
  }

  // Function to convert Grams to Troy Ounces
  private gramsToTroyOunces(grams: number): number {
    // There are approximately 31.1035 grams in a Troy Ounce
    return grams / 31.1035;
  }

  // Function to sum up weights in Troy Ounces
  private sumWeightsInTroyOunces(products: { weight: string, quantity: number }[]): number {
    return products.reduce((total, product) => {
      const { value, unit } = this.parseWeight(product.weight);
      const quantity = product.quantity;
      let troyOunces = unit === 'grams' ? this.gramsToTroyOunces(value) : value;
      return total + (troyOunces * quantity);
    }, 0);
  }

}
