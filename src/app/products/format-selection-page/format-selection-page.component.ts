import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-format-selection-page',
  templateUrl: './format-selection-page.component.html',
  styleUrl: './format-selection-page.component.scss'
})
export class FormatSelectionPageComponent implements OnInit {
  breadcrumbTitle: string;
  coinURL: string;
  barURL: string;
  roundURL: string;
  junkURL: string;
  showCreateButton: boolean;

  constructor(private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.showCreateButton = true;
    this.route.paramMap.subscribe((params) => {
      this.breadcrumbTitle = params.get('type') + " Collection";
      switch (params.get('type').toUpperCase()) {
        case "GOLD":
          this.coinURL = 'assets/images/products/gold/american_gold_eagle.jpg'
          this.barURL = 'assets/images/products/gold/bar.jpg'
          this.roundURL = 'assets/images/products/gold/gold_liberty.jpg'
          this.junkURL = 'assets/images/products/gold/junk_gold.jpg'
          break;
        case "SILVER":
          this.coinURL = 'assets/images/products/silver/american_silver_eagle.jpg'
          this.barURL = 'assets/images/products/silver/bar.jpg'
          this.roundURL = 'assets/images/products/silver/silver_buffalo.jpg'
          this.junkURL = 'assets/images/products/silver/junk_silver.jpg'
          break;
        case "COPPER":
          break;
      }
    });
  }
}
