import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
}