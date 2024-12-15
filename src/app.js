/**
 * @file Entry point for the application.
 * @description This file initializes the header, footer, and routes for the application.
 * It also applies global styles and dynamically handles page-specific scripts based on the URL.
 *
 * @requires ./css/styles.css
 * @requires ./js/router
 * @requires ./js/ui/auth/header
 * @requires ./js/ui/auth/footer
 */

import './css/styles.css';
import router from './js/router';
import { makeHeader } from './js/ui/auth/header';
import { makeFooter } from './js/ui/auth/footer';

makeHeader();
makeFooter();
await router(window.location.pathname);
