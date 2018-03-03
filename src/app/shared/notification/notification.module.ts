import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BellComponent } from './bell';
import { NotificationItemComponent } from './notification-item';
import { NotificationService, NotificationComponent } from './';


/**
 * This module includes NotificationComponent
 * You need add this component and position it at top of your template.
 */
@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    BellComponent, NotificationItemComponent, NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  providers: [NotificationService],
})
export class NotificationModule {

}
