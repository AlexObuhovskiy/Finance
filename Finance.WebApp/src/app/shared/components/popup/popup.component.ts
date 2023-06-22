import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent {
  @Input() isOpen = false;
  @Output() closePopup = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closePopup.emit();
  }
}
