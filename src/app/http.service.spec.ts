import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    let _httpClient = {
      get: jest.fn().mockReturnValue(of({}))
    } as any as HttpClient;
    service = new HttpService(_httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  describe('method: getDados', () => {

    it('should: validar retorno null string vazia', () => {
      const response = service.getDados('');

      expect(response).toBeNull();
    });

    it('should: validar se chama o get do Http', () => {
      const spyGet = jest.spyOn((service as any)._http, 'get');

      service.getDados('pikachu');

      expect(spyGet).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    });
  });
});
