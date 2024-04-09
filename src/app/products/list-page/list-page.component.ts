
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  products$ = new BehaviorSubject<Product[]>(null);
  productsClone$ = new BehaviorSubject<Product[]>(null); // This is used to store clone of products. When user filters we can use this to set back to orignal state
  public url: any;
  breadcrumb: string;
  breadcrumbRoute: string;
  breadcrumbTitle: string;
  bullionType: string;
  format: string;
  availableYears: string[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bullionType = params.get('type').toUpperCase();
      this.format = params.get('format').toUpperCase();
      this.breadcrumbTitle = `${params.get('type')} Collection`;
      this.breadcrumb = 'Format';
      this.breadcrumbRoute = `/products/${params.get('type')}/format`;

      // Fetch products after setting parameters to ensure they are available
      this.fetchProducts();
    });
  }

  async fetchProducts(): Promise<void> {
    try {
      const allProducts = await this.productService.getAllProducts(true, true);
      this.products$.next(allProducts.filter(x => x.bullionType === this.bullionType && x.format === this.format));
      this.productsClone$.next(this.products$.value);
      // Deduplicate and set available years
      const years = this.products$.value.map(product => product.year);
      this.availableYears = Array.from(new Set(years));
      this.availableYears.unshift('All');
    } catch (error) {
      console.error('Failed to fetch products:', error);
      this.toast.error({
        detail: "ERROR",
        summary: `Error loading data: ${error.message || error.err || 'Unknown Error'}`,
        duration: 5000,
        position: 'topCenter',
      });
    }
  }


  public filterByDenomination(denomination: string): void {
    if (denomination === 'ALL') {
      this.products$.next(this.productsClone$.value);
    } else {
      const filteredProducts = this.productsClone$.value.filter((product: Product) => product.name.toUpperCase().includes(denomination));
      this.products$.next(filteredProducts);
    }

  }

  public async filterByYear(year: string): Promise<void> {
    if (year.toUpperCase() === 'ALL') {
      this.products$.next(this.productsClone$.value);
    } else {
      const filteredProducts = this.productsClone$.value.filter((product: Product) => product.year.toUpperCase().includes(year));
      this.products$.next(filteredProducts);
    }
  }
}

