import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LandingLocale } from '../../core/services/locale/locale.service';

@Component({
  selector: 'app-whatsapp-lead-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './whatsapp-lead-modal.component.html',
  styleUrl: './whatsapp-lead-modal.component.scss'
})
export class WhatsappLeadModalComponent implements OnChanges {
  @Input() open = false;
  @Input() locale: LandingLocale = 'ar';
  /** Digits only, e.g. 970598999890 */
  @Input() phone = '970598999890';
  @Input() title = '';
  @Input() helper = '';
  @Input() initialMessage = '';

  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogPanel') dialogPanel?: ElementRef<HTMLElement>;
  @ViewChild('messageField') messageField?: ElementRef<HTMLTextAreaElement>;

  form: FormGroup;
  private previouslyFocused: HTMLElement | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form = this.fb.nonNullable.group({
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) {
      return;
    }
    if (changes['open'] && this.open) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      this.form.reset({ message: this.initialMessage || '' });
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.messageField?.nativeElement?.focus(), 0);
    }
    if (changes['open'] && !this.open) {
      document.body.style.overflow = '';
    }
    if (changes['initialMessage'] && this.open && !this.form.dirty) {
      this.form.patchValue({ message: this.initialMessage || '' });
    }
  }

  get messageInvalid(): boolean {
    const c = this.form.get('message');
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isBrowser || !this.open) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
    this.closed.emit();
    if (this.isBrowser) {
      setTimeout(() => this.previouslyFocused?.focus?.(), 0);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const message = (this.form.getRawValue().message as string).trim();
    if (!message) {
      this.form.get('message')?.setErrors({ required: true });
      return;
    }
    if (!this.isBrowser) {
      return;
    }
    const digits = (this.phone || '').replace(/\D/g, '');
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.close();
  }

  private trapFocus(event: KeyboardEvent): void {
    const root = this.dialogPanel?.nativeElement;
    if (!root) {
      return;
    }
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
