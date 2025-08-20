const API_URL = "https://barbe-demo-backend.onrender.com"; // reemplaza por tu backend en Render
// Login
document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      alert("✅ Inicio de sesión exitoso");
      document.getElementById("reservaGate").style.display = "none";
      document.getElementById("reservaForm").style.display = "block";
      document.getElementById("userEmail").textContent = email;
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el backend");
  }
});

// Registro
document.getElementById("formRegister").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el backend");
  }
});

// Reservar
document.getElementById("formReserva").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicioSel").value;

  if (!fecha || !hora || !servicio) {
    return alert("Completa todos los campos");
  }

  try {
    const res = await fetch(`${API_URL}/reservar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fecha, hora, servicio })
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el backend");
  }
});
