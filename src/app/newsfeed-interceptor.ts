import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptionsArgs, RequestOptions, Http, ConnectionBackend } from '@angular/http';
import { Observable, of } from 'rxjs';
import * as faker from 'faker';
import { delay } from 'rxjs/operators';

@Injectable()
export class NewsFeedInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === '/newsfeed') {
      const response = new HttpResponse({
        body: generateRandomData(),
      });

      return of(response).pipe(
        delay(1000)
      );
    } else {
      return next.handle(request);
    }
  }
}

export function generateRandomData() {
  return Array.from({ length: 20 }, generateRandomDataItem);
}

export function generateRandomDataItem() {
  return {
    author: faker.name.findName(),
    date: faker.date.recent(),
    title: capitalizeTitle(
      faker.hacker.adjective() + 
      ' ' + faker.hacker.noun() + 
      ' ' + faker.hacker.ingverb() + 
      ' ' + faker.hacker.noun()
    ),
    contentSample: faker.lorem.paragraph(3),
  };
}

function capitalizeTitle(str: string): string {
  return str.replace(/\w\S*/g, (txt: string) => txt[0].toUpperCase() + txt.substr(1))
}