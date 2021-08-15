import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import * as jalali_moment from "jalali-moment";

@Injectable()
export class StorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  set(name: string, val: any, exp_unit?: "second" | "hour" | "day", exp_amount?: number): any {
    if(isPlatformBrowser(this.platformId)) {
      let ob: any = {};
      ob.data = val;
      let date;
      if(exp_unit && exp_amount) {
        date = new Date();
        let addedNum = 0;
        if(exp_unit === "second") {
          addedNum = exp_amount * 1000;
        } else if(exp_unit === "hour") {
          addedNum = 60 * 60 * exp_amount * 1000;
        } else if(exp_unit === "day") {
          addedNum = 60 * 60 * 24 * exp_amount * 1000;
        }
        date.setTime(date.getTime() + addedNum);
      }
      date ? ob.date = date.getTime() : null;
      localStorage.setItem(name, JSON.stringify(ob))
    } else {
      return null;
    }
  }

  get(name: string): any {
    if(isPlatformBrowser(this.platformId)) {
      let a = localStorage.getItem(name);
      if(a) {
        let ob = JSON.parse(a);
        if(ob) {
          if(!ob.date || ob.date > new Date().getTime()) {
            return ob.data;
          } else {
            this.remove(name);
            return null;
          }
        } else {
          this.remove(name);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  remove(name: string) {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(name);
    }
  }
}