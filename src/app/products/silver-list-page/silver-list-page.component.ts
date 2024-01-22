
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    console.log('here')
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

