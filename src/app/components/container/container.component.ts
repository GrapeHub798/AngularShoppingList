import { Component } from '@angular/core';
import {Item} from "../../interfaces/Item";
import { v4 as uuidv4 } from 'uuid';
import {ItemListComponent} from "../item-list/item-list.component";
import {SearchInputComponent} from "../search-input/search-input.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    ItemListComponent,
    SearchInputComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  shippingList: Item[] = [];

  addItemToList(item: string) : void {
    if (!item)
      return;
    this.shippingList.push({
        id: uuidv4(),
        name: item,
        checked: false
      });
  }

  removeItemFromList(id: string): void {
    if (!id)
      return;
    this.shippingList = this.shippingList.filter(item => item.id !== id);
  }

  toggleItem(id: string): void {
    if (!id)
      return;

    const foundItem = this.shippingList.find(item => item.id === id);
    if (!foundItem)
      return;
    foundItem.checked = !foundItem.checked;
  }
}
