import { Component } from '@angular/core';
import { NotificationService } from '../shared';

@Component({
  selector: 'cc-notification-presentation',
  templateUrl: './notification-presentation.component.html',
  styleUrls: ['./notification-presentation.component.scss']
})
export class NotificationPresentationComponent {

  public notification: any = {};

  constructor(private notificationService: NotificationService) {
  }

  public addNotification() {
    this.notificationService.addNotification(this.notification.text, this.notification.type, this.notification.title);
    this.notification = {};
  }

}
