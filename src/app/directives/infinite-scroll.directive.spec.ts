import { InfiniteScrollDirective } from './infinite-scroll.directive';

describe('InfiniteScrollDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {
      nativeElement: document.createElement('div'),
    };

    const directive = new InfiniteScrollDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });

  it('should emit infiniteScroll event when element intersects with viewport', () => {
    const mockElement = document.createElement('div');
    mockElement.style.position = 'absolute';
    mockElement.style.top = '2000px';
    mockElement.style.width = '100px';
    mockElement.style.height = '100px';
    document.body.appendChild(mockElement);

    const mockElementRef = {
      nativeElement: mockElement,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        directive.infiniteScroll.emit();
      }
    });
    observer.observe(mockElement);

    const directive = new InfiniteScrollDirective(mockElementRef);
    spyOn(directive.infiniteScroll, 'emit');

    // Use setTimeout to simulate the element intersecting with the viewport after 1 second
    setTimeout(() => {
      mockElement.style.top = '0px';
      expect(directive.infiniteScroll.emit).toHaveBeenCalled();
    }, 1000);
  });

  it('should not emit infiniteScroll event when element does not intersect with viewport', () => {
    const mockElement = document.createElement('div');
    mockElement.style.position = 'absolute';
    mockElement.style.top = '2000px';
    mockElement.style.width = '100px';
    mockElement.style.height = '100px';
    document.body.appendChild(mockElement);

    const mockElementRef = {
      nativeElement: mockElement,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          directive.infiniteScroll.emit();
        }
      },
      { threshold: 0 }
    );
    observer.observe(mockElement);

    const directive = new InfiniteScrollDirective(mockElementRef);
    spyOn(directive.infiniteScroll, 'emit');

    expect(directive.infiniteScroll.emit).not.toHaveBeenCalled();
  });
});
