import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();
  private supportedLanguages = ['en', 'vi'];

  constructor(private translate: TranslateService) {
    // Get language from localStorage if available, otherwise use browser language or default to English
    const savedLang = localStorage.getItem('language');
    const browserLang = this.translate.getBrowserLang();
    
    let defaultLang = 'en';
    if (savedLang && this.isLanguageSupported(savedLang)) {
      defaultLang = savedLang;
    } else if (browserLang && this.isLanguageSupported(browserLang)) {
      defaultLang = browserLang;
    }
    
    this.initLanguage(defaultLang);
  }

  private initLanguage(lang: string): void {
    this.translate.setDefaultLang('en');
    this.setLanguage(lang);
  }

  public setLanguage(lang: string): void {
    if (!this.isLanguageSupported(lang)) {
      lang = 'en';
    }
    
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.currentLangSubject.next(lang);
    document.documentElement.lang = lang;
  }

  public getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  public isLanguageSupported(lang: string): boolean {
    return this.supportedLanguages.includes(lang);
  }

  public getSupportedLanguages(): string[] {
    return [...this.supportedLanguages];
  }
} 