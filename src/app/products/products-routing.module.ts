import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SilverListPageComponent } from './silver-list-page/silver-list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { GoldListPageComponent } from './gold-list-page/gold-list-page.component';
import { CopperListPageComponent } from './copper-list-page/copper-list-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { TypeSelectionPageComponent } from './type-selection-page/type-selection-page.component';

const routes: Routes = [
  {
    path: 'gold/',
    component: GoldListPageComponent
  },
  {
    path: ':type/:format/list',
    component: SilverListPageComponent
  },
  {
    path: 'copper',
    component: CopperListPageComponent
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
    component: TypeSelectionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
