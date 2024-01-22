import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SilverListPageComponent } from './silver-list-page/silver-list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { GoldListPageComponent } from './gold-list-page/gold-list-page.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../shared/shared.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { TypeSelectionPageComponent } from './type-selection-page/type-selection-page.component';

@NgModule({
  declarations: [
    SilverListPageComponent,
    GoldListPageComponent,
    SuppliesComponent,
    CreatePageComponent,
    DetailsPageComponent,
    TypeSelectionPageComponent
  ],
  imports: [
    FontAwesomeModule,
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