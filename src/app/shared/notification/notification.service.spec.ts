import { inject, TestBed } from '@angular/core/testing';

import { NotificationService } from './';

describe('Notiifcation Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [NotificationService] });
    });

    it('should return as much messages as you added', inject([NotificationService], (service: NotificationService) => {
        let items: any[];
        service.notifications$.subscribe(x => {
            items = x;
        })

        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        expect(10).toEqual(items.length);
    }));

    it('should return correct number of items after delete', inject([NotificationService], (service: NotificationService) => {
        let items: any[];
        service.notifications$.subscribe(x => {
            items = x;
        })

        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        let itemsToRemove = items.slice(0, 7);

        for (let i = 0; i < 7; i++) {
            service.removeNotification(itemsToRemove[i]);
        }

        expect(3).toEqual(items.length);
    }));

    it('should makes all items read', inject([NotificationService], (service: NotificationService) => {
        let items: any[];
        service.notifications$.subscribe(x => {
            items = x;
        })

        for (let i = 0; i < 10; i++) {
            service.addNotification(null, null, null);
        }

        service.readAll();

        let read = true;

        setTimeout(() => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].unread) {
                    read = false;
                    break;
                }
            }

            expect(true).toEqual(read);
        }, 100);
    }));

});