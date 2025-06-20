import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { authGuard } from './guards/auth.guard'; // ✅ Same guard
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    canActivate: [authGuard], // ✅ block if logged in
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'chatDashboard',
    component: DashBoardComponent,
    canActivate: [authGuard], // ✅ block if not logged in
  },
  {
    path: 'main',
    component: DashBoardComponent,
  },
];
