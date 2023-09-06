import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aside-search',
  templateUrl: './aside-search.component.html',
  styleUrls: ['./aside-search.component.scss']
})
export class AsideSearchComponent implements OnInit {
  @Output() valueSeachMovie = new EventEmitter<string>(); 
  public searchInput = false;
  public form: FormGroup;

  /**
   * construtor do componente AsideSearchComponent 
   */
  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search: [null]
    })
  }

  ngOnInit() {
  }

  /**
   * busca o filme pesquisado
   */
  public searchMovie(): void {
    if (!this.form) {
      return;
    }
    this.valueSeachMovie.emit(this.form.controls['search'].value)
  }

}
