import './css/styles.css';
import router from './js/router';
import { makeHeader } from './js/ui/auth/header';
import { makeFooter } from './js/ui/auth/footer';

makeHeader();
makeFooter();
await router(window.location.pathname);
