import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../shared/shared.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FormatSelectionPageComponent } from './format-selection-page/format-selection-page.component';

@NgModule({
  declarations: [
    ListPageComponent,
    SuppliesComponent,
    CreatePageComponent,
    DetailsPageComponent,
    FormatSelectionPageComponent
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