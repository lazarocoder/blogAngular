import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageService, Ng2Webstorage } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HeaderModule } from './header/header.module';
import { HttpClientInterceptor } from './http-client-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot(),
    HeaderModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true},
    LocalStorageService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
