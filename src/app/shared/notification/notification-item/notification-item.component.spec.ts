import { TestBed, ComponentFixture } from '@angular/core/testing'

import { NotificationItemComponent } from './'

import { NotificationModel, NotificationType } from '../notification.model'

describe('NotificationItem Component', () => {
    let fixture:    ComponentFixture<NotificationItemComponent>;
    let component:  NotificationItemComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [NotificationItemComponent] });
        fixture = TestBed.createComponent(NotificationItemComponent);
        component = fixture.componentInstance;
    });

    it('should put error class to div', () => {
        let notification = new NotificationModel();
        notification.type = NotificationType.Error;
        component.item = notification;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('class="notification-icon error"');
    });

    it('should put info class to div', () => {
        let notification = new NotificationModel();
        notification.type = NotificationType.Info;
        component.item = notification;
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('class="notification-icon info"');
    });

    it('should put warning class to div', () => {
        let notification = new NotificationModel();
        notification.type = NotificationType.Warning;
        component.item = notification;
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('class="notification-icon warning"');
    });

    it('should be unread', () => {
        let notification = new NotificationModel();
        notification.unread = true
        component.item = notification;
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('class="notification-block unread"');
    });

    it('should not be unread', () => {
        let notification = new NotificationModel();
        notification.unread = false

        component.item = notification;
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('class="notification-block"');
    });
});