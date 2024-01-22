
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductRename } from '../../shared/classes/product';
import { get } from 'aws-amplify/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-silver-list-page',
  templateUrl: './silver-list-page.component.html',
  styleUrl: './silver-list-page.component.scss'
})
export class SilverListPageComponent implements OnInit {
  products$ = new BehaviorSubject<ProductRename[]>(null);
  public url: any;
  breadCrumbTitle: string;
  breadCrumbPath: string;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.breadCrumbTitle = params.get('type') + " Collection";
      this.breadCrumbPath = params.get('format');
      console.log('params: ', params)
    });

    // GET PRODUCTS (WORKS)
    try {
      const restOperation = get({
        apiName: 'productsApi',
        path: '/products'
      });
      const { body } = await restOperation.response;
      const json = await body.json() as unknown as ProductRename[];
      this.products$.next(json);
      this.products$.subscribe(x => console.log('HERE: ', x));
      console.log('GET call succeeded: ', json);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

}

