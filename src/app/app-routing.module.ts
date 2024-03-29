import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/authentication/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MessageUserComponent } from './components/messages/message-user/message-user.component';
import { AdminPanelComponent } from './pages/admin/admin-panel/admin-panel.component';
import { adminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'users', component: UserComponent },
      { path: 'users/:username', component: UserDetailsComponent, resolve: {member: 'userDetailedResolver'}},
      { path: 'user/edit', component: UsersEditComponent },
      { path: 'messages', component: MessageUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
