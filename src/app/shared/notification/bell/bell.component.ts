import { Subscription } from 'rxjs';
import { Component, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NotificationService } from '../';

/**
 * The bell that showes that there are the new notifications and the amount of them
 */
@Component({
    selector: 'cc-bell',
    templateUrl: './bell.component.html',
    styleUrls: ['./bell.component.scss']
})
export class BellComponent implements OnDestroy {
    /**
     * firing bell click event for listeners. In our case it will shows or closes notificaiton window
     */
    @Output()
    public bellClick: EventEmitter<void> = new EventEmitter<void>();

    unreadNotificationCount = 0;

    private subscription: Subscription;

    constructor(notificationService: NotificationService) {
        this.subscription = notificationService.notifications$.subscribe(x =>
            this.unreadNotificationCount = x.filter(item => item.unread).length);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    click() {
        this.bellClick.next();
    }
}
