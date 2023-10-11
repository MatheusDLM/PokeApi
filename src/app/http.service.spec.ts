import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    let _httpClient = {} as HttpClient;
    service = new HttpService(_httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
});
