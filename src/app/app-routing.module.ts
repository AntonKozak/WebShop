import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './pages/users/user.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MessageUserComponent } from './components/messages/message-user/message-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'users', component: UserComponent },
      { path: 'users/:username', component: UserDetailsComponent },
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
