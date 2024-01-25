import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BarRatingModule } from "ngx-bar-rating";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

// Header and Footer Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Components
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// Tap To Top
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    TapToTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    TapToTopComponent,
  ]
})
export class SharedModule { }