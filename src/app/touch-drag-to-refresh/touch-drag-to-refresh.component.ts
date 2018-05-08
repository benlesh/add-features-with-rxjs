import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { of, fromEvent, concat, defer } from 'rxjs';
import { map, exhaustMap, takeUntil, startWith, tap, takeWhile, repeat, ignoreElements } from 'rxjs/operators';
import { RxAnimationsService } from '../rx-animations.service';
import { NewsFeedService } from '../news-feed.service';

@Component({
  selector: 'touch-drag-to-refresh',
  templateUrl: './touch-drag-to-refresh.component.html',
  styleUrls: ['./touch-drag-to-refresh.component.css']
})
export class TouchDragToRefreshComponent implements OnInit {
  @Output()
  refresh = new EventEmitter<any>();

  private _pos = 0;

  touchStart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');

  touchDrag$ = this.touchStart$.pipe(
    exhaustMap(start => {
      return concat(
        this.touchMove$.pipe(
          map(move => move.touches[0].pageY - start.touches[0].pageY),
          takeUntil(this.touchEnd$),
          tap(p => this._pos = p),
        ),
        this.moveHome$,
      );
    }),
    tap(y => {
      if (y > window.innerHeight / 2) {
        this.refresh.emit();
      }
    }),
    takeWhile(y => y <= window.innerHeight / 2),
  );

  moveHome$ = defer(() => this.rxAnimations.tween(this._pos, 0, 200))

  moveHomeAfterLoad$ = this.newsfeed.loadNews$.pipe(
    exhaustMap(() => this.moveHome$)
  );

  positionUpdate$ = concat(
    this.touchDrag$,
    this.moveHomeAfterLoad$,
  ).pipe(
    repeat()
  );

  position$ = this.positionUpdate$.pipe(
    startWith(0),
    map(y => y - 70),
  );

  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );

  rotate$ = this.newsfeed.refresh$.pipe(
    exhaustMap(() => this.rxAnimations.tween(0, 360, 500).pipe(
      repeat(),
      takeUntil(this.newsfeed.loadNews$),
      x => concat(x, of(0)), // endWith(0)
    ))
  );

  transformRotate$ = this.rotate$.pipe(
    map(r => `rotate(${r}deg)`)
  );

  constructor(private newsfeed: NewsFeedService, private rxAnimations: RxAnimationsService) { }

  ngOnInit() {
  }
}
