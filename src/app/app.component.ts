import { Component } from '@angular/core';
import { HttpService, Pokemon } from './http.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  pokemon!: Pokemon;
  form: FormGroup; 
  name = new FormControl('', Validators.required);
  searchHistory: Pokemon[] = [];
 
  constructor(private httpService: HttpService) {
    this.form = new FormGroup({
      name: this.name
    });
  }

  onSubmit() {
    const pokemonName = this.form.get('name')?.value;
    console.log(pokemonName);
    this.httpService.setPokemon(pokemonName);
    this.getPokemon();
  }

  private getPokemon() {
    this.httpService.getDados().subscribe((pokemon: Pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;
      this.addToSearchHistory(pokemon);
    });
  }

  private addToSearchHistory(pokemon: Pokemon) {
    this.searchHistory.unshift(pokemon);
  }

  removeFromHistory(index: number) {
    this.searchHistory.splice(index, 1);
  }
  
}
