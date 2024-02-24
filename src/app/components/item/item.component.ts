import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../interfaces/Item";
import {NgClass, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faXmark, faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    NgIf,
    FontAwesomeModule,
    NgClass
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: Item | null = null;
  @Output() deleteItemFromParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleItemOnParent: EventEmitter<string> = new EventEmitter<string>();

  faXmark = faXmark;
  faCircleCheck = faCircleCheck;
  faCheck = faCheck;

  deleteItem(): void {
    this.deleteItemFromParent.emit(this.item?.id);
  }

  toggleItem(): void {
    this.toggleItemOnParent.emit(this.item?.id);
  }
}
