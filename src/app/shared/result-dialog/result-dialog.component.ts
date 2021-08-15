import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { dialogInterface } from 'src/app/interfaces/dialog-interface';

@Component({
  selector: 'resultDialog',
  templateUrl: 'result-dialog.component.html',
  styleUrls: ['result-dialog.component.scss'],
})
export class ResultDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogInterface,
  ) {}
   
  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
