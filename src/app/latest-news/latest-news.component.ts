import { Component } from '@angular/core';
import { NewsFeedService } from '../news-feed.service';
import { timer, Subscription } from 'rxjs';
import { } from 'rxjs/operators';

@Component({
  selector: 'latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent {
  subscription: Subscription;

  refreshTimer$ = timer(0, 30000);

  news$ = this.newsfeed.news$;

  constructor(private newsfeed: NewsFeedService) {}

  ngOnInit() {
    this.subscription = this.refreshTimer$.subscribe(this.newsfeed.refresh$);
  }
}
