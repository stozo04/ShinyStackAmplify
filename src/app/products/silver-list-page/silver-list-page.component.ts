
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-silver-list-page',
  templateUrl: './silver-list-page.component.html',
  styleUrl: './silver-list-page.component.scss'
})
export class SilverListPageComponent implements OnInit {
  products$: Observable<Product[]>;
  public url: any;
  breadCrumbTitle: string;
  breadCrumbPath: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.breadCrumbTitle = params.get('type') + " Collection";
      this.breadCrumbPath = params.get('format');
    });

    this.products$ = await this.productService.getProducts(true);
  }
}

