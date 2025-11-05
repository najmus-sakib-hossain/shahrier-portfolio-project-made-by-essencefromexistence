import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Frontend pages that should always use light theme
const frontendPages = [
    'Home/Page/Home',
    'Blogs/Page/Blogs',
    'Books/Page/Books',
    'Events/Page/Events',
    'Videos/Page/Videos',
    'Technology/Page/Technology',
    'Donation/Page/Donation',
    'LifeEvents/Page/LifeEvent',
    'Entepreneourship/Page/Entepreneouship',
    'AboutMe/Page/AboutMe',
    'Contact/Page/Contact',
];

// Wrapper component to handle theme forcing
function ThemeWrapper({ children, page }: { children: React.ReactNode; page: string }) {
    useEffect(() => {
        const isFrontendPage = frontendPages.some(p => page.startsWith(p));
        
        if (isFrontendPage) {
            // Force light theme on frontend pages
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            // Restore saved theme on admin pages
            const savedAppearance = localStorage.getItem('appearance') || 'system';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = savedAppearance === 'dark' || (savedAppearance === 'system' && prefersDark);
            
            document.documentElement.classList.toggle('dark', isDark);
            document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        }
    }, [page]);

    return <>{children}</>;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        // Load all pages with both .tsx and .jsx extensions
        const pages = import.meta.glob('./pages/**/*.{tsx,jsx}');
        
        // Try .tsx first, then .jsx
        for (const extension of ['tsx', 'jsx']) {
            const path = `./pages/${name}.${extension}`;
            if (pages[path]) {
                const module = await pages[path]();
                return module;
            }
        }
        
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ThemeWrapper page={props.initialPage.component}>
                    <App {...props} />
                </ThemeWrapper>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

