import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-silver-list-page',
  templateUrl: './silver-list-page.component.html',
  styleUrl: './silver-list-page.component.scss'
})

export class SilverListPageComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  constructor() { }

  ngOnInit(): void {

  }

}
