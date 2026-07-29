import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sticky-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="href"
      class="wa-fab"
      [href]="href"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="locale === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm0 1.82c4.46 0 8.09 3.63 8.09 8.09 0 4.46-3.63 8.09-8.09 8.09-1.42 0-2.8-.37-4.02-1.07l-.29-.17-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.21-4.32c0-4.46 3.63-8.09 8.09-8.09zm4.55 10.74c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74 1.49.64 2.08.7 2.83.59.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z"/>
      </svg>
    </a>
  `,
  styles: [`
    .wa-fab {
      position: fixed;
      bottom: 24px;
      inset-inline-end: 24px;
      z-index: 55;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #25d366;
      color: #fff;
      display: grid;
      place-items: center;
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.4);
      transition: transform 0.15s ease, box-shadow 0.2s ease;
    }
    .wa-fab:hover,
    .wa-fab:focus-visible {
      transform: translateY(-3px);
      box-shadow: 0 16px 36px rgba(37, 211, 102, 0.5);
      outline: none;
    }
    .wa-fab svg {
      width: 28px;
      height: 28px;
    }
    @media (max-width: 640px) {
      .wa-fab {
        bottom: 18px;
        inset-inline-end: 16px;
        width: 52px;
        height: 52px;
      }
    }
  `]
})
export class StickyWhatsappComponent {
  @Input() href = '';
  @Input() locale: 'ar' | 'en' = 'ar';
}
