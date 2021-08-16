import { IconSearchComponent } from './icons/icon-search.component';
import { IconCheckComponent } from './icons/icon-check.component';
import { NgModule } from "@angular/core";
import { IconLeftArrowComponent } from './icons/icon-left-arrow.component';

@NgModule({
  declarations: [
    IconLeftArrowComponent,
    IconCheckComponent,
    IconSearchComponent,
  ],
  exports: [
    IconLeftArrowComponent,
    IconCheckComponent,
    IconSearchComponent,
  ]
})
export class IconsModule {}
