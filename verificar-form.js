const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validar nombre
  if (name === "") {
    alert("El nombre es obligatorio");
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Ingresa un email válido");
    return;
  }

  // Validar mensaje
  if (message.length < 10) {
    alert("El mensaje debe tener al menos 10 caracteres");
    return;
  }

  alert("Formulario enviado correctamente");
  form.submit();
});
