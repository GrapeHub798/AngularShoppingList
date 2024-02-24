import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {debounceTime, filter, Subject, switchMap, tap} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [HttpClientModule, NgForOf, NgIf, FormsModule, FaIconComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Output() addItemToParent: EventEmitter<string> = new EventEmitter<string>();
  searchSubject = new Subject<string>();
  results: string[] = [];
  searchText: string = ''; // Added for input clearing
  faXmark = faXmark;

  constructor(private http: HttpClient) {
    this.searchSubject.pipe(
      debounceTime(500),
      tap(text => {
        if (text.length < 2){
          this.results = [];
        }
      }),
      filter(text => text.length >= 2),
      switchMap(text => this.fetchFood(text))
    ).subscribe((matches: string[]) => {
      this.results = matches;
    })
  }

  addItemToList(item: string): void {
    if (!item)
      return;

    this.addItemToParent.emit(item);
  }

  onSearchChange(searchEvent: Event ){
    this.searchSubject.next((searchEvent.target as HTMLInputElement).value);
  }

  fetchFood(query: string){
    return this.http.get<string[]>(`https://api.frontendeval.com/fake/food/${query}`)
  }

  clearSearch() {
    this.searchText = '';
    this.results = [];
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }
}
