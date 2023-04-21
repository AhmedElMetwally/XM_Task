import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Output() infiniteScroll = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.infiniteScroll.emit();
      }
    }, options);

    observer.observe(elementRef.nativeElement);
  }
}