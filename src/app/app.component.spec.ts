import { AppComponent } from './app.component';
import { HttpService } from './http.service';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    const httpService = {} as HttpService;
    component = new AppComponent(httpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

});


// TODO? Exemplo teste valor da variavel
// expect(component.form).toEqual(new FormGroup({
//   name: new FormControl<string>('', { validators: Validators.required,  nonNullable: true }),

//   cep: new FormControl('', { validators: Validators.required, nonNullable: true }),
//   bairro: new FormControl('', { validators: Validators.required }),
//   numero: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),  
// }))

// expect(component.cepControl).toEqual(new FormControl('' , { validators: Validators.required, nonNullable: true }));