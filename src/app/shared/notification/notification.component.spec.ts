import { TestBed, ComponentFixture, inject } from '@angular/core/testing'

import { NotificationComponent, NotificationService } from './'
import { BellComponent } from './bell';
import { NotificationItemComponent } from './notification-item';

describe('Notification Component', () => {
    let fixture: ComponentFixture<NotificationComponent>;
    let component: NotificationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [NotificationComponent, BellComponent, NotificationItemComponent], providers: [NotificationService] });
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
    });

    it('should show 0 items', () => {
        fixture.detectChanges();
        expect(component.itemsToShow.length).toEqual(0);
    });

    it('should show 0 items before bell clicked', inject([NotificationService], (service: NotificationService) => {
        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        fixture.detectChanges();
        expect(component.itemsToShow.length).toEqual(0);
    }));

    it('should show 5 items after bell clicked',inject([NotificationService], (service: NotificationService) => {
        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        component.bellClick();
        fixture.detectChanges();

        expect(component.itemsToShow.length).toEqual(5);
    }));

    it('should show 10 items after show all clicked', inject([NotificationService], (service: NotificationService) => {
        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        component.bellClick();
        component.showAllClick();
        fixture.detectChanges();

        expect(component.itemsToShow.length).toEqual(10);
    }));
});