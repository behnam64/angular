import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { NoConnectionComponent } from './no-connection/no-connection.component';
import { SliderModule } from 'primeng/slider';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { IconsModule } from './icons/icons.module';
import { OnlyNumberDirective } from '../services/onlyNumber.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    OnlyNumberDirective,
    ResultDialogComponent,
    NoConnectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IconsModule,
    LazyLoadImageModule,
    MatDialogModule,
    SliderModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
    LazyLoadImageModule,
    MatDialogModule,
    SliderModule,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    OnlyNumberDirective,
    ResultDialogComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ]
})

export class SharedModule {} 
