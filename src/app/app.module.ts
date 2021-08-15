import { InterceptorService } from './services/interceptor.service';
import { DialogService } from './services/dialog.service';
import { CookieService } from './services/cookie.service';
import { SharedModule } from './shared/shared.module';
import { StorageService } from './services/storage.service';
import { SubjectService } from './subject.service';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerWhenStable:30000'}),
    BrowserAnimationsModule
  ],
  providers: [
    SubjectService,
    StorageService,
    CookieService,
    DialogService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
