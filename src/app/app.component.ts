import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

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
    private _zone: NgZone,
  ) {
    this.removeSplashScreen();
  }

  ngOnInit() {
    this.initializeApp()
    this.removeSplashScreen();
    this.handleRoute();
    this._router.events.takeUntil(this.unSubscribe$).subscribe(this.handleRoute.bind(this));
  }

  initializeApp() {
    App.addListener('appUrlOpen', (data: any) => {
      this._zone.run(() => {
        const slug = data.url.split("com.abidarcity.android://")[1];
        if(slug) {
          this._router.navigateByUrl(`/${slug}`);
        }
      });
    });
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
