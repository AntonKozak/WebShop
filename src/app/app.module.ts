import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './pages/users/user.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';


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
    AboutComponent,
    RegisterComponent,
    UserComponent,
    UserCardComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
