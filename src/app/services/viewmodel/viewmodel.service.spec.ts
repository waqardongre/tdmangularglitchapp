import { TestBed } from '@angular/core/testing';

import { ViewmodelService } from './viewmodel.service';

describe('ViewmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewmodelService = TestBed.get(ViewmodelService);
    expect(service).toBeTruthy();
  });
});
