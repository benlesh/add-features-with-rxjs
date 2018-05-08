import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, share } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  news$ = this.http.get('/newsfeed').pipe(
    catchError(err => {
      console.error('error loading news feed');
      console.error(err);
      return EMPTY;
    }),
    share(),
  );

  constructor(private http: HttpClient) { }
}
