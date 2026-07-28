import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const CONSENT_KEY = 'lychee_cookie_consent';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cookie-banner" *ngIf="visible" role="dialog" [attr.aria-label]="locale === 'ar' ? 'موافقة ملفات تعريف الارتباط' : 'Cookie consent'">
      <p>
        <ng-container *ngIf="locale === 'ar'; else enCopy">
          نستخدم ملفات تعريف ارتباط ضرورية لتشغيل الموقع، واختيارية لتحسين التجربة.
          راجع <a routerLink="/cookies">سياسة ملفات تعريف الارتباط</a>.
        </ng-container>
        <ng-template #enCopy>
          We use essential cookies to run the site, and optional cookies to improve your experience.
          See our <a routerLink="/cookies">Cookie Policy</a>.
        </ng-template>
      </p>
      <div class="cookie-actions">
        <button type="button" class="btn btn-outline btn-sm" (click)="decline()">
          {{ locale === 'ar' ? 'الضرورية فقط' : 'Essential only' }}
        </button>
        <button type="button" class="btn btn-primary btn-sm" (click)="accept()">
          {{ locale === 'ar' ? 'قبول الكل' : 'Accept all' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      inset-inline: 16px;
      bottom: 16px;
      z-index: 90;
      max-width: 560px;
      margin-inline: auto;
      left: 16px;
      right: 16px;
      background: #fff;
      border: 1px solid #e8e8ea;
      border-radius: 20px;
      box-shadow: 0 24px 60px rgba(6, 38, 18, 0.16);
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .cookie-banner p {
      margin: 0;
      font-size: 14px;
      color: #555;
      line-height: 1.55;
    }
    .cookie-banner a {
      color: #12a851;
      font-weight: 700;
      text-decoration: none;
    }
    .cookie-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: flex-end;
    }
  `]
})
export class CookieBannerComponent implements OnInit {
  @Input() locale: 'ar' | 'en' = 'ar';
  visible = false;

  ngOnInit(): void {
    try {
      this.visible = !localStorage.getItem(CONSENT_KEY);
    } catch {
      this.visible = true;
    }
  }

  accept(): void {
    this.persist('all');
  }

  decline(): void {
    this.persist('essential');
  }

  private persist(value: string): void {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    this.visible = false;
  }
}
