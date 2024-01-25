
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { Observable } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.breadcrumbTitle = params.get('type') + " Collection";
      this.breadcrumb = 'Format';
      this.breadcrumbRoute = `/products/${params.get('type')}/format`;
    });

    this.products$ = await this.productService.getProducts(true);
  }
}

