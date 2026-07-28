import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { environment } from '../../../../environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContactService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts contact payload', () => {
    let done = false;
    service.submit({
      name: 'A',
      email: 'a@b.com',
      topic: 'Hi',
      message: 'Hello',
      website: ''
    }).subscribe(() => {
      done = true;
    });

    const req = http.expectOne(`${environment.apiBaseUrl}/public/contact`);
    expect(req.request.method).toBe('POST');
    req.flush('', { status: 204, statusText: 'No Content' });
    expect(done).toBeTrue();
  });

  it('maps 429 to RATE_LIMIT', () => {
    let errMsg = '';
    service.submit({
      name: 'A',
      email: 'a@b.com',
      topic: 'Hi',
      message: 'Hello'
    }).subscribe({
      error: (e: Error) => { errMsg = e.message; }
    });

    const req = http.expectOne(`${environment.apiBaseUrl}/public/contact`);
    req.flush('limit', { status: 429, statusText: 'Too Many Requests' });
    expect(errMsg).toBe('RATE_LIMIT');
  });
});
