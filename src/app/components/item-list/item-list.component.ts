import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../interfaces/Item";
import {ItemComponent} from "../item/item.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @Input() items: Item[] = [];
  @Output() deleteItemFromParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() toggleItemOnParent: EventEmitter<string> = new EventEmitter<string>();

  deleteItem(id: string): void {
    this.deleteItemFromParent.emit(id);
  }

  toggleItem(id: string): void {
    this.toggleItemOnParent.emit(id);
  }
}
