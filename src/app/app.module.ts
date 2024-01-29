import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MainContentComponent } from './components/navigations/main-content/main-content.component';
import { SidenavComponent } from './components/navigations/sidenav/sidenav.component';
import { ToolbarComponent } from './components/navigations/toolbar/toolbar.component';
import { ProductsCardComponent } from './components/navigations/products-card/products-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './pages/users/user.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { PhotoUploaderComponent } from './components/photo/photo-uploader/photo-uploader.component';
import { PhotoEditorComponent } from './components/photo/photo-editor/photo-editor.component';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { UserLikesComponent } from './components/likes/user-likes/user-likes.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ChatComponent } from './pages/chat/chat.component';
import { userDetailedResolver } from './resolves/user-detailed.resolver';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent,
    ProductsCardComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    RegisterComponent,
    UserComponent,
    UserCardComponent,
    UsersEditComponent,
    PhotoUploaderComponent,
    PhotoEditorComponent,
    TextInputComponent,
    UserLikesComponent,
    MessagesComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true},
    { provide: 'userDetailedResolver', useValue: userDetailedResolver},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
