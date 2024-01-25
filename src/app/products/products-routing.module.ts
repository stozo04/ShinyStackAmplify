import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';

import { DetailsPageComponent } from './details-page/details-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { FormatSelectionPageComponent } from './format-selection-page/format-selection-page.component';

const routes: Routes = [
  {
    path: ':type/:format/list',
    component: ListPageComponent
  },
  {
    path: 'create',
    component: CreatePageComponent
  },
  {
    path: 'supplies',
    component: SuppliesComponent
  },
  {
    path: ':type/:format/:id',
    component: DetailsPageComponent
  },
  {
    path: ':type/format',
    component: FormatSelectionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
