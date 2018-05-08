import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, share, switchMapTo } from 'rxjs/operators';
import { EMPTY, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  refresher$ = timer(0, 3000);

  news$ = this.refresher$.pipe(
    switchMapTo(this.http.get('/newsfeed').pipe(
      catchError(err => {
        console.error('error loading news feed');
        console.error(err);
        return EMPTY;
      }),
      share(),
    ))
  );

  constructor(private http: HttpClient) { }
}
