import { TestBed } from '@angular/core/testing';

import { TdAppService } from './td-app.service';

describe('TdAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TdAppService = TestBed.get(TdAppService);
    expect(service).toBeTruthy();
  });
});
