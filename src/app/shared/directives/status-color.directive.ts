import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges, AfterViewInit {
  @Input() appStatusColor: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.applyStatusColor();
  }

  ngAfterViewInit() {
    this.applyStatusColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appStatusColor']) {
      this.applyStatusColor();
    }
  }

  private applyStatusColor() {
    const statusClasses = ['status-planifie', 'status-en-cours', 'status-livre', 'status-annule', 'status-echoue'];
    statusClasses.forEach(statusClass => {
      this.renderer.removeClass(this.el.nativeElement, statusClass);
    });

    const statusClass = this.getStatusClass(this.appStatusColor);
    if (statusClass) {
      this.renderer.addClass(this.el.nativeElement, statusClass);
    }
  }

  private getStatusClass(statusName: string | undefined): string {
    switch (statusName) {
      case 'Planifié':
        return 'status-planifie';
      case 'En cours de livraison':
        return 'status-en-cours';
      case 'Livré':
        return 'status-livre';
      case 'Annulé':
        return 'status-annule';
      case 'Échoué':
        return 'status-echoue';
      default:
        return '';
    }
  }
}
