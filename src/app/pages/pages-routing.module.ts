import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { TypographyComponent } from './typography/typography.component';
import { CollectionComponent } from './collection/collection.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'typography',
    component: TypographyComponent
  },
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: '404',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
