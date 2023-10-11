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
