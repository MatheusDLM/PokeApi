import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { Pokemon } from './app.interface';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  const MockPokemon = {name: 'pikachu', id: 25} as Pokemon;

  beforeEach(() => {
    const httpService = {} as HttpService;
    const formBuilder = new FormBuilder();
    component = new AppComponent(httpService, formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  describe('method: ngOnInit', () => {
    it('should: testando o ngOnInit', () => {
      (component as any).createForm = jest.fn();
      const spyCreateForm = jest.spyOn((component as any), 'createForm');

      component.ngOnInit();

      expect(spyCreateForm).toHaveBeenCalled();
    })
  });

  describe('method: onSubmit', () => {
    it('should: vendo se esta enviando o formulario', () => {
      (component as any).getPokemon = jest.fn();

      const spyGetPokemon = jest.spyOn((component as any), 'getPokemon');
      
      (component as any).createForm();
      component.onSubmit();

      expect(spyGetPokemon).toHaveBeenCalledWith('');
    })
  })

  describe('method: getPokemon', () => { //de onde ele vem e o que ta passando
    it('should: validar CASO se chama o getDados do Http', () => {
      (component as any).httpService.getDados = jest.fn();

      const spyGetDados = jest.spyOn((component as any).httpService, 'getDados');

      (component as any).getPokemon('pikachu'); 

      expect(spyGetDados).toHaveBeenCalledWith('pikachu');
    });

    it('should: validar tratativa de retorno da requisição', () => {
      (component as any).httpService.getDados = jest.fn()
        .mockReturnValue(of(MockPokemon));
      (component as any).addToSearchHistory = jest.fn();

      const spyAddToSearchHistory = jest.spyOn((component as any), 'addToSearchHistory');
      
      (component as any).getPokemon('pikachu'); 

      expect(component.pokemon).toEqual(MockPokemon);
      expect(spyAddToSearchHistory).toHaveBeenCalledWith(MockPokemon);
    });
  });

  describe('method: addToSearchHistory', () => {
    it('should: vendo se esta adicionando o card', () => {
      component.searchHistory = [MockPokemon, MockPokemon];

      (component as any).addToSearchHistory(MockPokemon);

      expect(component.searchHistory.length).toEqual(3);
      expect(component.searchHistory).toEqual([MockPokemon, MockPokemon, MockPokemon]);
    })
  })

  describe('method: removeFromHistory', () => {
    it('should: vendo se esta removendo o card', () => {
      component.searchHistory = [MockPokemon, MockPokemon];

      component.removeFromHistory(0);

      expect(component.searchHistory).toEqual([MockPokemon]);
    })
  })


  describe('method: createForm', () => {
    // TODO? Exemplo teste valor da variavel
    it('should: validar se formGroup existe no createForm', () => {
      const spyGroup = jest.spyOn((component as any).formBuilder, 'group');

      (component as any).createForm();

      expect(component.form.value).toEqual({
        name: '',
        cep: '',
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
