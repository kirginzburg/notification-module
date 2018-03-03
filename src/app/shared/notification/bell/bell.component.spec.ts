import { TestBed, inject, ComponentFixture } from '@angular/core/testing'

import { BellComponent } from './'

import { NotificationService } from '../';

describe('Bell Component', () => {
    let fixture: ComponentFixture<BellComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [BellComponent], providers: [NotificationService] });

        fixture = TestBed.createComponent(BellComponent);
    });

    it('should white bell at the begin', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('bell-off');
    });

    it('should black bell after add message', inject([NotificationService], (service: NotificationService) => {
        service.addNotification(null,null,null);
        fixture.detectChanges();

        expect(fixture.nativeElement.innerHTML).toContain('bell-on');
    }));
});