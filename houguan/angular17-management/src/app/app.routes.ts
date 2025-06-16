import { Routes } from '@angular/router';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import { GeneralComponent } from './pages/settings/general/general.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'users/roles', component: UserListComponent }, // 暂时使用用户列表组件
  { path: 'settings/general', component: GeneralComponent },
  { path: 'settings/security', component: GeneralComponent }, // 暂时使用通用设置组件
  { path: 'settings/backup', component: GeneralComponent }, // 暂时使用通用设置组件
  { path: 'statistics/overview', component: UserListComponent }, // 暂时使用用户列表组件
  { path: 'statistics/reports', component: UserListComponent }, // 暂时使用用户列表组件
  { path: 'statistics/analytics', component: UserListComponent }, // 暂时使用用户列表组件
  { path: 'help', component: GeneralComponent }, // 暂时使用通用设置组件
  { path: '**', redirectTo: '/users' }
];
