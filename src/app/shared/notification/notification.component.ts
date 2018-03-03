import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from './';
import { NotificationModel } from './notification.model';

/**
 * The main component which contains the bell and the notification window
 */
@Component({
    selector: 'cc-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
    showNotifications = false; // Opens or closes the notification window. The bell controls it
    showAll = false;           // Showes all or only five notifications in the notification window

    items: NotificationModel[] = [];

    /**
     * Incapsulate logic to show correct number of notifications
     */
    get itemsToShow(): NotificationModel[] {
        if (!this.showNotifications) {
            return [];
        }

        if (this.showAll) {
            return this.items;
        } else {
            if (this.items.length <= 5) {
                return this.items;
            } else {
                return this.items.slice(0, 5);
            }
        }
    }

    private subscription: Subscription; // for unsubscribe in destroy method

    /**
     * Constructs a component, subscribes to the service
     * @param notificationService provides notification items and methods of the notifications to this component
     */
    constructor(private notificationService: NotificationService) {
        this.subscription = notificationService.notifications$.subscribe(x => {
            this.items = x;
            this.checkRead();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    bellClick() {
        this.showNotifications = !this.showNotifications;
        this.checkRead();
    }

    itemClose(item: NotificationModel) {
        this.notificationService.removeNotification(item);
    }

    showAllClick() {
        this.showAll = !this.showAll;
    }

    /**
     * Checking and flagging of the notifications if they are readed or not
     */
    private checkRead() {
        if (this.showNotifications) {
            if (this.showAll) {
                this.notificationService.readAll();
            } else {
                this.notificationService.readTopFive();
            }
        }
    }
}
