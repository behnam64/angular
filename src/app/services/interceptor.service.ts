import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { SubjectService } from '../subject.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { StateKey, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

@Injectable()
export class InterceptorService implements HttpInterceptor {
	constructor(
		@Inject(PLATFORM_ID) private platformId: any,
		private _subjectService: SubjectService,
		private _transferState: TransferState,
		private _cookieService: CookieService,
		private _router: Router
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let headers = request.headers;
		let url = request.url;

		if(!request.headers.get("set-content")) {
			headers = headers.set('Content-Type', 'application/json');
		} else {
			headers = request.headers.delete("set-content");
		}

		this._subjectService.isLoading.next( true);

		const key: StateKey<string> = makeStateKey<string>(url);
		
		request = request.clone({
			// headers: headers,
			url: url,
			withCredentials: true
		});

		console.log("log", window.navigator.onLine)
		this._subjectService.isOnline = window.navigator.onLine;
		if(!window.navigator.onLine) {
			this._router.navigate(["/", "no-connection"]);
		}
		if(isPlatformServer(this.platformId)) {
			return next.handle(request)
			.map((response: any) => {
				if(response instanceof HttpResponse) {
					this._subjectService.isLoading.next(false);
					this._transferState.set(key, response.body);
				}
				return response;
			})
			.catch((error: any) => {
				if(error instanceof HttpErrorResponse) {
					this._subjectService.isLoading.next(false);
					this.parseError(error);
				}
				return throwError(error.error);
			});
		} else {
			request = request.clone({
				// headers: headers,
				url: url,
				withCredentials: true
			});
			const storedResponse = this._transferState.get<any>(key, null);
			if (storedResponse) {
				this._subjectService.isLoading.next(false);
				const response = new HttpResponse({body: storedResponse, status: 200});
				this._transferState.remove(key);
				return of(response);
			}
			else {
				request = request.clone({
					// headers: headers,
					url: url
				});
				return next.handle(request)
				.map((response: any) => {
					if(response instanceof HttpResponse) {
						this._subjectService.isLoading.next(false);
					}
					return response;
				})
				.catch((error: any) => {
					if(error instanceof HttpErrorResponse) {
						this._subjectService.isLoading.next(false);
						this.parseError(error);
					}
					return throwError(error.error);
				});
			}
		}
	}
	
	parseError(error: any) {
		if(error.status) {
			switch(error.status) {
				case 404: this._router.navigate(["/not-found"]); break;
			}
		}
	}
}
