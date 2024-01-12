import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page.component';
import { SilverListPageComponent } from './silver-list-page/silver-list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { GoldListPageComponent } from './gold-list-page/gold-list-page.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../shared/shared.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@NgModule({
  declarations: [
    ProductsPageComponent,
    SilverListPageComponent,
    GoldListPageComponent,
    SuppliesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CommonModule,
    GalleryModule,
    LightboxModule,
    SharedModule,
    AmplifyAuthenticatorModule
  ]
})
export class ProductsModule { }
