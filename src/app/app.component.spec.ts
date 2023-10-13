import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { Pokemon } from './app.interface';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    const httpService = {} as HttpService;
    const formBuilder = new FormBuilder();
    component = new AppComponent(httpService, formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })


  describe('method: onSubmit', () => {
    it('should: vendo se esta enviando o formulario', () => {
      (component as any).getPokemon = jest.fn();

      const spyGetPokemon = jest.spyOn((component as any), 'getPokemon');

      component.onSubmit();

      expect(spyGetPokemon).toHaveBeenCalledWith('');
    })
  })

  describe('method: addToSearchHistory', () => {
    it('should: vendo se esta adicionando o card', () => {
      component.searchHistory = [{} as Pokemon,{} as Pokemon];

      (component as any).addToSearchHistory({} as Pokemon);

      expect(component.searchHistory).toEqual([{} as Pokemon,{} as Pokemon,{} as Pokemon]);
    })
  })

  describe('method: removeFromHistory', () => {
    it('should: vendo se esta removendo o card', () => {
      component.searchHistory = [{} as Pokemon,{} as Pokemon];

      component.removeFromHistory(0);

      expect(component.searchHistory).toEqual([{} as Pokemon]);
    })
  })


  describe('method: createForm', () => {
    // TODO? Exemplo teste valor da variavel
    it('should: validar se formGroup existe no createForm', () => {
      const spyGroup = jest.spyOn((component as any)._formBuilder, 'group');

      (component as any).createForm();

      expect(component.form.value).toEqual({
        name:'',
        cep:'',
        bairro: '',
        numero: 0
      });

      expect(spyGroup).toHaveBeenCalled();

      // expect(component.form).toEqual(new FormGroup({
      //   name: new FormControl<string>('', { validators: Validators.required,  nonNullable: true }),
      //   cep: new FormControl('', { validators: Validators.required, nonNullable: true }),
      //   bairro: new FormControl('', { validators: Validators.required }),
      //   numero: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
      // }))
    })
  })
});

// expect(component.cepControl).toEqual(new FormControl('' , { validators: Validators.required, nonNullable: true }));
