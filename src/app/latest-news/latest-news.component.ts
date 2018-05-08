import { Component } from '@angular/core';
import { NewsFeedService } from '../news-feed.service';

@Component({
  selector: 'latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent {
  news$ = this.newsfeed.news$;

  constructor(private newsfeed: NewsFeedService) {}
}
