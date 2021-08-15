import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
const jalali_moment = require("jalali-moment");
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  loading = false;
  isLoading = new Subject<boolean>();
  isOnline: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isLoading.subscribe(this.LoadingFun.bind(this));
  }

  loadingval = 0;
  LoadingFun(bool: boolean) {
    if(bool) {
      this.loadingval++;
    } else {
      this.loadingval ? this.loadingval-- : null;
    }
    if(isPlatformBrowser(this.platformId)) {
      if(this.loadingval) {
        this.loading = true;
        document.body.style.cursor = "progress";
      } else {
        this.loading = false;
        document.body.style.cursor = "auto";
      }
    }
  }
}
