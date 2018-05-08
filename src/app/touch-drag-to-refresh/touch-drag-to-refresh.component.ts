import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-touch-drag-to-refresh',
  templateUrl: './touch-drag-to-refresh.component.html',
  styleUrls: ['./touch-drag-to-refresh.component.css']
})
export class TouchDragToRefreshComponent implements OnInit {

  transformPosition$ = of('translate3d(0, 0, 0)');

  transformRotate$ = of('rotate(0deg)');
  
  constructor() { }

  ngOnInit() {
  }

}
