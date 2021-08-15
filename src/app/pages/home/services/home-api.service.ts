import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import "rxjs/add/operator/map";

@Injectable()
export class HomeApiService {

  constructor(
    private _http: HttpClient,
  ) {}

  getSpeakers() {
    return this._http
    .get<any>(`${environment.apiAddress}/speakers`)
  }

  getSpeakerDetail(id: string) {
    return this._http
    .get<any>(`${environment.apiAddress}/speaker/${id}`)
  }

  getSpeakerSessions(id: string) {
    return this._http
    .get<any>(`${environment.apiAddress}/speaker/${id}/sessions`)
  }
}