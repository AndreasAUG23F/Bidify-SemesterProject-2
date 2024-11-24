/* import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;

form.addEventListener("submit", onRegister); */

import { onRegister } from '../../ui/auth/register.js';

const form = document.forms.register;

if (form) {
  form.addEventListener('submit', onRegister);
} else {
  console.error("Form with name 'register' not found!");
}
