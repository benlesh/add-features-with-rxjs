import { TestBed, inject } from '@angular/core/testing';

import { NewsFeedService } from './news-feed.service';

describe('NewsFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsFeedService]
    });
  });

  it('should be created', inject([NewsFeedService], (service: NewsFeedService) => {
    expect(service).toBeTruthy();
  }));
});
