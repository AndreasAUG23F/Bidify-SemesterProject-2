import './css/styles.css';

import router from './js/router';

import { makeHeader } from './js/ui/auth/header';

makeHeader();

await router(window.location.pathname);
