import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() title: string;
  @Input() breadcrumb: string;
  @Input() breadcrumbRoute: string;
  @Input() showCreateButton: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public navigateToCreate(): void {
    this.router.navigate(['/products/create']);
  }

  public navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
