import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-format-selection-page',
  templateUrl: './format-selection-page.component.html',
  styleUrl: './format-selection-page.component.scss'
})
export class FormatSelectionPageComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  breadcrumbTitle: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.breadcrumbTitle = params.get('type') + " Collection";
    });
  }
}
