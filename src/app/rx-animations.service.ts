import { Injectable } from '@angular/core';
import { timer, animationFrameScheduler, SchedulerLike, defer, concat, of } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RxAnimationsService {
  frames$ = timer(0, 0, animationFrameScheduler);

  ticks$ = defer(() => {
    const start = animationFrameScheduler.now();
    return this.frames$.pipe(
      map(() => animationFrameScheduler.now() - start),
    );
  });
  
  duration(ms: number) {
    return this.ticks$.pipe(
      map(t => t / ms),
      takeWhile(t => t <= 1),
      x => concat(x, of(1)),
    ) 
  }

  tween(start: number, end: number, duration: number) {
    const difference = end - start;
    return this.duration(duration).pipe(
      map(d => Math.round(start + (d * difference)))
    );
  }

  constructor() { }
}
