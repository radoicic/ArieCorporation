import { TestBed } from '@angular/core/testing';

import { FlowService } from './flow.service';

describe('FlowService', () => {
  let service: FlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
