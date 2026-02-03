function scrollToTarget(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// Botones con data-scroll
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => scrollToTarget(btn.dataset.scroll));
});

// ✅ Formulario (mock) - AHORA NO ROMPE si no existe
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name")?.value?.trim() || "",
      email: document.getElementById("email")?.value?.trim() || "",
      message: document.getElementById("message")?.value?.trim() || "",
      date: new Date().toISOString(),
    };

    if (!data.name || !data.email || !data.message) {
      toast("Completa todos los campos.");
      return;
    }

    const key = "mock_contact_messages";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.unshift(data);
    localStorage.setItem(key, JSON.stringify(prev));

    e.target.reset();
    toast("Mensaje guardado (mock).");
  });
}

// ===== HERO BACKGROUND CAROUSEL (crossfade) =====
const slides = document.querySelectorAll(".hero__bg");
let currentSlide = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove("is-active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("is-active");
  }, 7000); // cambia cada 7s
}

// (Opcional) Pausar el video cuando no está en pantalla
const demoVideo = document.querySelector(".media-card__media");

if (demoVideo && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) demoVideo.play().catch(() => {});
      else demoVideo.pause();
    });
  }, { threshold: 0.25 });

  io.observe(demoVideo);
}
