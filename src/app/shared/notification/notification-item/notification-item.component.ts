import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotificationModel, NotificationType } from '../notification.model';

@Component({
  selector: 'cc-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  notificationType = NotificationType;

  @Input() item: NotificationModel;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

}
