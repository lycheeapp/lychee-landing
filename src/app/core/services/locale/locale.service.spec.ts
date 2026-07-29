import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleService);
  });

  it('defaults to Arabic', () => {
    expect(service.locale).toBe('ar');
  });

  it('toggles between ar and en', () => {
    expect(service.toggle()).toBe('en');
    expect(service.locale).toBe('en');
    expect(service.toggle()).toBe('ar');
  });
});
