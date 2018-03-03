import { RouterModule, Routes } from '@angular/router';

import { NotificationPresentationComponent } from './notification-presentation/notification-presentation.component';

const routes: Routes = [
  { path: '', component: NotificationPresentationComponent },
];

export const routing = RouterModule.forRoot(routes);
