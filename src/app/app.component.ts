import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from './app.interface';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly $COMPONENT_DESTROY = new Subject<boolean>();
  title = 'rxjs';
  pokemon!: Pokemon;
  form!: FormGroup<formGroup>;


  searchHistory: Pokemon[] = [];

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.$COMPONENT_DESTROY.next(true);
    this.$COMPONENT_DESTROY.complete();
  }

  onSubmit() {
    const pokemonName = this.form.controls.name.value;

    this.getPokemon(pokemonName);
  }

  removeFromHistory(index: number) {
    this.searchHistory.splice(index, 1);
  }
  
  private getPokemon(name: string) {
    this.httpService.getDados(name)
    ?.pipe(
      take(1), // uma unica requisicao
      takeUntil(this.$COMPONENT_DESTROY) // eventos ocorrendo 
    )
    .subscribe((pokemon: Pokemon) => {
      this.pokemon = pokemon;
      this.addToSearchHistory(pokemon);
    });
  }

  private addToSearchHistory(pokemon: Pokemon) {
    this.searchHistory.unshift(pokemon);
  }


  private createForm() {

    //  this._formBuilder.group === new FormGroup()
    this.form = this.formBuilder.group<formGroup>({
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
