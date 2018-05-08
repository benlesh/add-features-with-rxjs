import { Component, OnInit } from '@angular/core';
import { of, fromEvent, concat, defer } from 'rxjs';
import { map, exhaustMap, takeUntil, startWith, tap } from 'rxjs/operators';
import { RxAnimationsService } from '../rx-animations.service';

@Component({
  selector: 'touch-drag-to-refresh',
  templateUrl: './touch-drag-to-refresh.component.html',
  styleUrls: ['./touch-drag-to-refresh.component.css']
})
export class TouchDragToRefreshComponent implements OnInit {
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
        defer(() => this.rxAnimations.tween(this._pos, 0, 200)),
      );
    }),
  );

  position$ = this.touchDrag$.pipe(
    startWith(0),
    map(y => y - 70),
  );

  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );

  transformRotate$ = of('rotate(0deg)');

  constructor(private rxAnimations: RxAnimationsService) { }

  ngOnInit() {
  }
}
