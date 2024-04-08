
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  products$ = new BehaviorSubject<Product[]>(null);
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

      // Log the count of filtered products
      console.log('count: ', this.products$.value.length);

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


  public async filterByDenomination(denomination: string): Promise<void> {
    // if (denomination === 'ALL') {
    //   this.products$ = await this.productService.getProducts(true, this.bullionType, this.format);
    // } else {
    //   this.products$.subscribe(p => {
    //     const results = [];
    //     p.forEach(e => {
    //       if (e.name.toUpperCase().includes(denomination)) {
    //         results.push(e);
    //       }
    //     });
    //     this.products$ = of(results);
    //   })
    // }
  }

  public async filterByYear(year: string): Promise<void> {
    // if (year.toUpperCase() === 'ALL') {
    //   this.products$ = await this.productService.getProducts(true, this.bullionType, this.format);
    // } else {
    //   this.products$.subscribe(p => {
    //     const results = [];
    //     p.forEach(e => {
    //       if (e.year.toUpperCase().includes(year)) {
    //         results.push(e);
    //       }
    //     });
    //     this.products$ = of(results);
    //   })
    // }
  }
}

