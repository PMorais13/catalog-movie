import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private currentTheme: 'light' | 'dark' = 'dark';

    public initTheme(): void {
        this.applyTheme(this.currentTheme);
    }

    public toggleTheme(): void {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
    }

    private applyTheme(theme: 'light' | 'dark'): void {
        const body = document.body;
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${theme}-theme`);
    }
}
