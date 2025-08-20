const API_URL = "https://barbe-demo-backend.onrender.com"; // reemplaza por tu backend en Render
// 🔹 Elementos del DOM
const authModal = document.getElementById("authModal");
const openAuth = document.getElementById("openAuth");
const closeAuth = document.getElementById("closeAuth");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const userEmailSpan = document.getElementById("userEmail");
const reservaGate = document.getElementById("reservaGate");
const reservaForm = document.getElementById("reservaForm");
const reservaMsg = document.getElementById("reservaMsg");

let currentUser = null;

// 🔹 Modal de autenticación
openAuth?.addEventListener("click", () => authModal.showModal());
closeAuth?.addEventListener("click", () => authModal.close());

// 🔹 Switch de tabs login/registro
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.add("hidden"));
    document.getElementById(`pane-${tab.dataset.tab}`).classList.remove("hidden");
  });
});

// 🔹 Registro
document.getElementById("formRegister")?.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  const name = document.getElementById("regName").value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass, name })
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) authModal.close();
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el backend");
  }
});

// 🔹 Login
document.getElementById("formLogin")?.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();

    if (data.success) {
      currentUser = email;
      userEmailSpan.textContent = email;
      btnLogin.style.display = "none";
      btnLogout.style.display = "inline-block";
      reservaGate.style.display = "none";
      reservaForm.style.display = "block";
      authModal.close();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el backend");
  }
});

// 🔹 Logout
btnLogout?.addEventListener("click", () => {
  currentUser = null;
  userEmailSpan.textContent = "";
  btnLogin.style.display = "inline-block";
  btnLogout.style.display = "none";
  reservaGate.style.display = "block";
  reservaForm.style.display = "none";
});

// 🔹 Reservar
document.getElementById("formReserva")?.addEventListener("submit", async e => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicioSel").value;

  if (!fecha || !hora || !servicio) {
    reservaMsg.textContent = "Completa todos los campos";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/reservar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fecha, hora, servicio })
    });
    const data = await res.json();
    reservaMsg.textContent = data.message;
  } catch (err) {
    console.error(err);
    reservaMsg.textContent = "Error al conectar con el backend";
  }
});
