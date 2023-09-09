import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureModule } from './feature/feature.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpRequest } from './core/services/interceptor-http/interceptor-http.service';
import { LoaderModule } from './core/components/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatureModule,
    LoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpRequest,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
