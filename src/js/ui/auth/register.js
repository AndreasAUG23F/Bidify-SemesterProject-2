/* import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    register(registerData);
  } */

    import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault(); // Hindrer skjemaet fra å sende inn og refreshe siden.

  // Henter data fra skjemaet
  const formData = new FormData(event.target);

  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Debug: Logg dataen for å bekrefte at alt er korrekt
  console.log("Register Data:", registerData);

  // Send dataen til API
  register(registerData);
}