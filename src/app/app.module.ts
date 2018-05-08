import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { NewsFeedInterceptor } from './newsfeed-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TouchDragToRefreshComponent } from './touch-drag-to-refresh/touch-drag-to-refresh.component';

@NgModule({
  declarations: [
    AppComponent,
    LatestNewsComponent,
    TouchDragToRefreshComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NewsFeedInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
