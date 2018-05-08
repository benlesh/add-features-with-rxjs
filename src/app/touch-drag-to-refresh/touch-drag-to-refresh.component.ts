import { Component, OnInit } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { map, exhaustMap, takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'touch-drag-to-refresh',
  templateUrl: './touch-drag-to-refresh.component.html',
  styleUrls: ['./touch-drag-to-refresh.component.css']
})
export class TouchDragToRefreshComponent implements OnInit {
  touchStart$ = fromEvent<TouchEvent>(document, 'touchstart');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove');
  touchEnd$ = fromEvent<TouchEvent>(document, 'touchEnd');

  touchDrag$ = this.touchStart$.pipe(
    exhaustMap(start => {
      return this.touchMove$.pipe(
        map(move => move.touches[0].pageY - start.touches[0].pageY),
        takeUntil(this.touchEnd$),
      )
    })
  );

  position$ = this.touchDrag$.pipe(
    startWith(0),
    map(y => y - 70),
  );

  transformPosition$ = this.position$.pipe(
    map(y => `translate3d(-35px, ${y}px, 0)`)
  );

  transformRotate$ = of('rotate(0deg)');

  constructor() { }

  ngOnInit() {
  }
}
