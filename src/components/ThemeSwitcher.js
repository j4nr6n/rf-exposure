export class ThemeSwitcher {
    constructor() {
        this.setTheme(this.getPreferredTheme());
    }

    setTheme(theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'auto');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }

    getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark').matches;

        return storedTheme ?? (prefersDarkMode ? 'dark' : 'light');
    }
}
