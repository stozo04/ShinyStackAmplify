
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  products$: Observable<Product[]>;
  public url: any;
  breadcrumb: string;
  breadcrumbRoute: string;
  breadcrumbTitle: string;
  bullionType: string;
  format: string;
  availableYears: string[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.bullionType = params.get('type').toUpperCase();
      this.format = params.get('format').toUpperCase();
      this.breadcrumbTitle = params.get('type') + " Collection";
      this.breadcrumb = 'Format';
      this.breadcrumbRoute = `/products/${params.get('type')}/format`;
    });

    this.products$ = await this.productService.getProducts(true, this.bullionType, this.format);
    this.products$.subscribe(p => {
      this.availableYears = p.map(i => i.year);
      this.availableYears = this.availableYears.filter((item, i, ar) => ar.indexOf(item) === i);
      this.availableYears.unshift('All');
    }
    )
  }

  public async filterByDenomination(denomination: string): Promise<void> {
    if (denomination === 'ALL') {
      this.products$ = await this.productService.getProducts(true, this.bullionType, this.format);
    } else {
      this.products$.subscribe(p => {
        const results = [];
        p.forEach(e => {
          if (e.name.toUpperCase().includes(denomination)) {
            results.push(e);
          }
        });
        this.products$ = of(results);
      })
    }
  }

  public async filterByYear(year: string): Promise<void> {
    if (year.toUpperCase() === 'ALL') {
      this.products$ = await this.productService.getProducts(true, this.bullionType, this.format);
    } else {
      this.products$.subscribe(p => {
        const results = [];
        p.forEach(e => {
          if (e.year.toUpperCase().includes(year)) {
            results.push(e);
          }
        });
        this.products$ = of(results);
      })
    }
  }
}

