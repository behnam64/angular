import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  set(name: string, val: string, exp_unit: "second" | "hour" | "day", exp_amount: number) {
    if(isPlatformBrowser(this.platformId)) {
      let date = new Date();
      let expString = "";
      if(val) {
        if(exp_unit && exp_amount) {
          let addedNum = 0;
          if(exp_unit === "second") {
            addedNum = exp_amount * 1000;
          } else if(exp_unit === "hour") {
            addedNum = 60 * 60 * exp_amount * 1000;
          } else if(exp_unit === "day") {
            addedNum = 60 * 60 * 24 * exp_amount * 1000;
          }
          date.setTime(date.getTime() + addedNum);
          expString = `; expires=${date.toUTCString()}`;
        }
      } else {
        date.setTime(date.getTime() - 10000);
        expString = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${val}${expString}; path=/;`;
    }
  }

  delete(name: string) {
    if(isPlatformBrowser(this.platformId)) {
      let date = new Date();
      let expString = "";
      date.setTime(date.getTime() - 10000);
      expString = `; expires=${date.toUTCString()}`;
      document.cookie = `${name}=${expString}; path=/;`;
    }
  }

  get(name: string) {
    if(isPlatformBrowser(this.platformId)) {
      let arr: any = document.cookie.split(";");
      for(let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
        arr[i] = arr[i].split("=");
        if(arr[i][0] === name) {
          return arr[i][1];
        }
      }
    }
  }
}