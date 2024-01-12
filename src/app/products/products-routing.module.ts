import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page.component';
import { SilverListPageComponent } from './silver-list-page/silver-list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { GoldListPageComponent } from './gold-list-page/gold-list-page.component';
import { CopperListPageComponent } from './copper-list-page/copper-list-page.component';

const routes: Routes = [
  {
    path: 'gold',
    component: GoldListPageComponent
  },
  {
    path: 'silver',
    component: SilverListPageComponent
  },
  {
    path: 'copper',
    component: CopperListPageComponent
  },
  {
    path: 'gold/:productId',
    component: ProductsPageComponent
  },
  {
    path: 'silver/:productId',
    component: ProductsPageComponent
  },
  {
    path: 'copper/:productId',
    component: ProductsPageComponent
  },
  {
    path: 'supplies',
    component: SuppliesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
