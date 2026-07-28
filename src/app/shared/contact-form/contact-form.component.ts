import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalizedString, resolveLocalized } from '../../core/models/landing-page.model';
import { ContactService } from '../../core/services/contact/contact.service';
import { LandingLocale } from '../../core/services/locale/locale.service';

export interface ContactFormLabels {
  nameLabel: LocalizedString;
  emailLabel: LocalizedString;
  topicLabel: LocalizedString;
  messageLabel: LocalizedString;
  sendLabel: LocalizedString;
  sendingLabel: LocalizedString;
  privacyNote: LocalizedString;
  consentLabel: LocalizedString;
  consentLinkLabel: LocalizedString;
  successMessage: LocalizedString;
  errorMessage: LocalizedString;
  rateLimitMessage: LocalizedString;
  requiredError: LocalizedString;
  emailError: LocalizedString;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  @Input() labels!: ContactFormLabels;
  @Input() locale: LandingLocale = 'ar';

  submitting = false;
  submitted = false;
  success = false;
  errorKey: 'GENERIC' | 'RATE_LIMIT' | 'NETWORK' | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      topic: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
      consent: [false, Validators.requiredTrue],
      website: ['']
    });
  }

  ngOnInit(): void {
    /* form ready */
  }

  t(value: LocalizedString | undefined | null): string {
    return resolveLocalized(value, this.locale);
  }

  fieldInvalid(name: 'name' | 'email' | 'topic' | 'message' | 'consent'): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorKey = null;
    this.success = false;
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, topic, message, website } = this.form.getRawValue();
    this.submitting = true;
    this.contactService
      .submit({
        name: String(name).trim(),
        email: String(email).trim(),
        topic: String(topic).trim(),
        message: String(message).trim(),
        website: website ? String(website) : ''
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.form.reset({ name: '', email: '', topic: '', message: '', consent: false, website: '' });
          this.submitted = false;
          this.errorKey = null;
          this.success = true;
        },
        error: (err: Error) => {
          this.submitting = false;
          if (err.message === 'RATE_LIMIT') {
            this.errorKey = 'RATE_LIMIT';
          } else if (err.message === 'NETWORK') {
            this.errorKey = 'NETWORK';
          } else {
            this.errorKey = 'GENERIC';
          }
        }
      });
  }

  errorText(): string {
    if (this.errorKey === 'RATE_LIMIT') {
      return this.t(this.labels.rateLimitMessage);
    }
    return this.t(this.labels.errorMessage);
  }
}
