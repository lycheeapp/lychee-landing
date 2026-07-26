import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LandingContent } from '../../models/landing-page.model';
import { LANDING_CONTENT_DEFAULTS } from './landing-content.defaults';

const STORAGE_KEY = 'lychee_landing_content_v1';

@Injectable({
  providedIn: 'root'
})
export class LandingContentService {

  getContent(): Observable<LandingContent> {
    const stored = this.readStorage();
    const content = stored ? this.mergeDeep(this.cloneDefaults(), stored) : this.cloneDefaults();
    return of(content).pipe(delay(0));
  }

  updateContent(content: LandingContent): Observable<LandingContent> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to persist landing content', e);
    }
    return of(this.clone(content)).pipe(delay(0));
  }

  resetToDefaults(): Observable<LandingContent> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear landing content', e);
    }
    return of(this.cloneDefaults()).pipe(delay(0));
  }

  private readStorage(): LandingContent | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as LandingContent;
    } catch (e) {
      console.error('Failed to read landing content', e);
      return null;
    }
  }

  private cloneDefaults(): LandingContent {
    return this.clone(LANDING_CONTENT_DEFAULTS);
  }

  private clone(value: LandingContent): LandingContent {
    return JSON.parse(JSON.stringify(value));
  }

  private mergeDeep(target: any, source: any): any {
    if (!source || typeof source !== 'object') {
      return target;
    }
    Object.keys(source).forEach((key) => {
      const srcVal = source[key];
      if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        this.mergeDeep(target[key], srcVal);
      } else if (srcVal !== undefined) {
        target[key] = srcVal;
      }
    });
    return target;
  }
}
