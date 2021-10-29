import { TestBed } from '@angular/core/testing';

import { AddProjetoService } from './add-projeto.service';

describe('AddProjetoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddProjetoService = TestBed.get(AddProjetoService);
    expect(service).toBeTruthy();
  });
});
