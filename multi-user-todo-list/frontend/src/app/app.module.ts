import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { TodoListComponent } from './pages/home/todo-list/todo-list.component';
import { ErrorPanelComponent } from './pages/home/error-panel/error-panel.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    TodoListComponent,
    ErrorPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
