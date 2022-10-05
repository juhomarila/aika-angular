import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { delay, filter } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  title = 'aika-angular';
  loading$ = this.loader.loading$;
  minHeight: number = 0;
  constructor(
    public loader: LoadingService,
    private cdr: ChangeDetectorRef,
    router: Router,
    viewportScroller: ViewportScroller
  ) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1)) // <--------------------------- This line
      .subscribe(e => {
        if (e.position) {
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.footer) {
      this.minHeight =
        window.innerHeight -
        this.footer.nativeElement.getBoundingClientRect().height -
        this.header.nativeElement.getBoundingClientRect().height;
    }
    this.cdr.detectChanges();
  }
}
