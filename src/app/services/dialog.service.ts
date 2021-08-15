import { ResultDialogComponent } from './../shared/result-dialog/result-dialog.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { dialogInterface } from '../interfaces/dialog-interface';

@Injectable()
export class DialogService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _dialog: MatDialog,
  ) {}

  onTop = new Subject<any>(); 

  openResultDialog(data: dialogInterface) {
    if(isPlatformBrowser(this.platformId)) {
      if(this._dialog.openDialogs.length === 0) {
        this.onTop.next(window.scrollY);
        const dialog_data: {width: string, data: dialogInterface} = {
          width: '20rem',
          data: {type: data.type, message: data.message}
        }
        let dialog = this._dialog.open(ResultDialogComponent, dialog_data);
        dialog.afterClosed().subscribe(() => {
          this.onTop.next(0)
        });
      }
    }
  }
}