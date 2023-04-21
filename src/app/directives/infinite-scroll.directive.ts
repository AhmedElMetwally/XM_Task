import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() infiniteScroll = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('isIntersecting');
        this.infiniteScroll.emit();
      }
    }, options);

    observer.observe(elementRef.nativeElement);
  }
}
