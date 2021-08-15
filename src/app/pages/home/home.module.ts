import { SharedModule } from './../../shared/shared.module';
import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { HomeApiService } from './services/home-api.service';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  providers: [
    HomeApiService
  ]
})

export class HomeModule {} 
