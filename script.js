const API_URL = "https://barbe-demo-backend.onrender.com"; // reemplaza por tu backend en Render
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
openAuth?.addEventListener("click", () => authModal.showModal());
closeAuth?.addEventListener("click", () => authModal.close());
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.add("hidden"));
    document.getElementById(`pane-${tab.dataset.tab}`).classList.remove("hidden");
  });
});
document.getElementById("formRegister")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  const name = document.getElementById("regName").value;
  fetch(`${API_URL}/register`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ email, password:pass, name })
  }).then(r=>r.json()).then(data=>{
    alert(data.message);
    if(data.success){ authModal.close(); }
  });
});
document.getElementById("formLogin")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  fetch(`${API_URL}/login`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ email, password:pass })
  }).then(r=>r.json()).then(data=>{
    if(data.success){
      currentUser = email;
      userEmailSpan.textContent = email;
      btnLogin.style.display="none";
      btnLogout.style.display="inline-block";
      reservaGate.style.display="none";
      reservaForm.style.display="block";
      authModal.close();
    }else{
      alert(data.message);
    }
  });
});
btnLogout?.addEventListener("click", ()=>{
  currentUser=null;
  userEmailSpan.textContent="";
  btnLogin.style.display="inline-block";
  btnLogout.style.display="none";
  reservaGate.style.display="block";
  reservaForm.style.display="none";
});
document.getElementById("formReserva")?.addEventListener("submit", e=>{
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const servicio = document.getElementById("servicioSel").value;
  fetch(`${API_URL}/reservar`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ fecha, hora, servicio, user: currentUser })
  }).then(r=>r.json()).then(data=>{
    reservaMsg.textContent = data.message;
  });
});
