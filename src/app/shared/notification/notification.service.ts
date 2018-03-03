import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NotificationModel, NotificationType } from './notification.model';

/**
 * Provides notifications and methods to interact with them
 */
@Injectable()
export class NotificationService implements OnDestroy {
    public notifications$: Observable<NotificationModel[]>;

    private notificationsSubj: Subject<NotificationModel[]> = new Subject<NotificationModel[]>();
    private notifications: NotificationModel[] = [];

    private timerIds: number[] = []; // time ids to clearTimeout in destroy method

    constructor() {
        this.notifications$ = this.notificationsSubj.asObservable();
    }

    ngOnDestroy() {
        this.timerIds.forEach(id => {
            clearTimeout(id);
        });
    }

    /**
     * adding notification to the list of the notifications
     * @param notificationText the content of the notification
     * @param notificationType
     * @param notificationTitle
     */
    public addNotification(notificationText: string, notificationType: NotificationType, notificationTitle: string) {
        // creating a new model and fill out it with properties
        let model = new NotificationModel();
        model.message = notificationText;
        model.title = notificationTitle;
        model.type = notificationType;
        model.unread = true;

        // pushing the notification at the beginning of the list
        this.notifications.splice(0, 0, model);

        // notifying the subscribers that there are some changes in the notifications list
        this.notificationsSubj.next(this.notifications);

        if (model.type === NotificationType.Info) {
            // the info notification will be closed in 90 sec
            this.closeNotificationInTime(model, 90000);
        }

    }

    /**
     * removing the notificaiton from the list
     * @param notification that should be removed
     */
    public removeNotification(notification: NotificationModel) {
        let index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
            this.notificationsSubj.next(this.notifications);
        }
    }

    /**
     * flagging the top 5 notifications as readed
     */
    public readTopFive() {
        let iterationsCount = this.notifications.length < 5 ? this.notifications.length : 5;
        this.readNotifications(iterationsCount);
    }

    /**
     * flagging all the notifications as readed
     */
    public readAll() {
        this.readNotifications(this.notifications.length);
    }

    /**
     * closing the notification after some time
     * @param notification that will be closed
     * @param ms period of time after which the notificaiton will be closed
     */
    private closeNotificationInTime(notification: NotificationModel, ms: number) {
        let timerId = window.setTimeout(() => {
            this.removeNotification(notification);
        }, ms);

        this.timerIds.push(timerId);
    }

    /**
     * flagging the predetermined number of the notifications from the beginning of the list as readed
     * @param count the nomber of the notifications
     */
    private readNotifications(count: number) {
        let timerId = setTimeout(() => {
            for (let i = 0; i < count; i++) {
                if (this.notifications[i]) {
                    this.notifications[i].unread = false;
                }
            }
            this.notificationsSubj.next(this.notifications);
        });

        this.timerIds.push(timerId);
    }
}
