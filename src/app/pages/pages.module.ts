import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

// Pages Components
import { TypographyComponent } from './typography/typography.component';
import { CollectionComponent } from './collection/collection.component';
import { ErrorComponent } from './error/error.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    TypographyComponent,
    CollectionComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    GalleryModule,
    LightboxModule,
    SharedModule,
    PagesRoutingModule,
    AmplifyAuthenticatorModule
  ]
})
export class PagesModule { }
