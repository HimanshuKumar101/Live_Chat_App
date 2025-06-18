import { Routes } from '@angular/router'; 



import { AuthenticationComponent} from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';

import { DashBoardComponent } from './dash-board/dash-board.component';


export const routes: Routes = [
    {
        path: "",
        component: AuthenticationComponent,
        children: [
            {
                path: "",
                component: LoginComponent
            }
        ]
        
    },
    {
        path: "chatDashboard",
        component: DashBoardComponent
    }
];
