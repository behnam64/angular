import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  oldUrl: string = "";
  hideHeaderFooter: boolean = false;

  unSubscribe$ = new Subject();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router,
  ) {
    this.removeSplashScreen();
  }

  ngOnInit() {
    this.removeSplashScreen();
    this.handleRoute();
    this._router.events.takeUntil(this.unSubscribe$).subscribe(this.handleRoute.bind(this));
  }

  removeSplashScreen(): void {
    if(isPlatformBrowser(this.platformId)) {
      let splash_logo_container = document.getElementById('splash-logo-container');
      if(splash_logo_container) {
        splash_logo_container.style.display = 'none';
      }
    }
  }

  handleRoute() {
    if(this._router.url !== this.oldUrl) {
      this.oldUrl = this._router.url;
      let url: any = this._router.url.split("?")[0].split("/");
      this.hideHeaderFooter = url[1] && url[1] === "no-connection";
    }
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
