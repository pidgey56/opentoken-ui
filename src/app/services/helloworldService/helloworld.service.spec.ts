import { TestBed } from '@angular/core/testing';

import { HelloworldService } from './helloworld.service';

describe('HelloworldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelloworldService = TestBed.get(HelloworldService);
    expect(service).toBeTruthy();
  });
});
