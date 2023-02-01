import { TestBed } from '@angular/core/testing';

import { ServerControlService } from './server-control.service';

describe('ServerControlService', () => {
  let service: ServerControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
