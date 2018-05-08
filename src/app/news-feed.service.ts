import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, share, exhaustMap } from 'rxjs/operators';
import { EMPTY, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  loadNews$ = this.http.get('/newsfeed').pipe(
    catchError(err => {
      console.error('error loading news feed');
      console.error(err);
      return EMPTY;
    }),
    share(),
  );

  refresh$ = new BehaviorSubject(null);

  news$ = this.refresh$.pipe(
    exhaustMap(() => this.loadNews$)
  );

  constructor(private http: HttpClient) { }
}
