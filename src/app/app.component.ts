import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pokemon } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  pokemon!: Pokemon;
  form!: FormGroup<formGroup>;


  searchHistory: Pokemon[] = [];

  constructor(private httpService: HttpService, private _formBuilder: FormBuilder) {
    this.createForm();
    // this.form.value // { cep: valorCep, bairro: valorBairro, estado: valorEstado }
  }

  onSubmit() {
    const pokemonName = this.form.controls.name.value;

    this.getPokemon(pokemonName);
  }

  removeFromHistory(index: number) {
    this.searchHistory.splice(index, 1);
  }

  private getPokemon(name: string) {
    this.httpService.getDados(name)?.subscribe((pokemon: Pokemon) => {
      this.pokemon = pokemon;
      this.addToSearchHistory(pokemon);
    });
  }

  private addToSearchHistory(pokemon: Pokemon) {
    this.searchHistory.unshift(pokemon);
  }


  private createForm() {

    //  this._formBuilder.group === new FormGroup()
    this.form = this._formBuilder.group<formGroup>({
      name: new FormControl<string>('', { validators: Validators.required,  nonNullable: true }),

      cep: new FormControl('', { validators: Validators.required, nonNullable: true }),
      bairro: new FormControl('', { validators: Validators.required }),
      numero: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    });

    // this.cepControl = new FormControl(null, { validators: Validators.required });
  }

}

interface formGroup {
  name: FormControl<string>,
  cep: FormControl<string>,
  numero: FormControl<number>,
  bairro: FormControl<string | null>
}
