/*======================
    ANIMATED COUNTER
    ======================*/

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseFloat(counter.dataset.target);

      let current = 0;
      const increment = target / 120;

      function updateCounter() {
        if (current + increment < target) {
          current += increment;

          if (target % 1 !== 0) {
            counter.textContent = current.toFixed(1);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }

          requestAnimationFrame(updateCounter);
        } else {
          if (target % 1 !== 0) {
            counter.textContent = target.toFixed(1);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
      }

      updateCounter();

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});
/*======================
    FAQ ACCORDION
    ======================*/

const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach((faq) => {
        if (faq !== item) faq.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });
}
/*======================
    SCROLL REVEAL
    ======================*/

const reveals = document.querySelectorAll(".reveal");

function revealSection() {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;

    const revealTop = element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSection, {
  passive: true,
});

/*======================
    LOADER
    ======================*/

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1200);
  }
});

/*======================
    STICKY NAVBAR & BACK TO TOP
    ======================*/

const header = document.querySelector("header");
const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
  header?.classList.toggle("sticky", window.scrollY > 80);
  topBtn?.classList.toggle("show", window.scrollY > 400);
});

/*======================
    ACTIVE NAVIGATION
    ======================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;

    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

if (typeof Lenis !== "undefined") {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/*==============================
    CURSOR GLOW
    ==============================*/

const glow = document.querySelector(".glow");

if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

const particleContainer = document.getElementById("particles");
let lastTime = 0;

if (particleContainer) {
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 40) return;
    lastTime = now;

    const star = document.createElement("div");
    star.className = "star";
    star.style.left = e.clientX + "px";
    star.style.top = e.clientY + "px";
    star.style.width = Math.random() * 5 + 3 + "px";
    star.style.height = star.style.width;

    const colors = ["#ffffff", "#60a5fa", "#3b82f6", "#8ec5ff"];
    star.style.background = colors[Math.floor(Math.random() * colors.length)];

    particleContainer.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 800);
  });
}

const indicator = document.querySelector(".nav-indicator");
const links = document.querySelectorAll("nav a");

if (indicator) {
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.left = `${link.offsetLeft}px`;
    });
  });
}

/*======================
    WHY CAROUSEL
    (tombol panah + drag mouse + drag jari/touch + scroll wheel + auto-scroll)
    ======================*/
const whyTrack = document.getElementById("whyTrack");

if (whyTrack) {
  const arrowRight = document.querySelector(".why-arrow.right");
  const arrowLeft = document.querySelector(".why-arrow.left");

  // Tombol panah
  arrowRight?.addEventListener("click", () => {
    whyTrack.scrollBy({ left: 420, behavior: "smooth" });
  });

  arrowLeft?.addEventListener("click", () => {
    whyTrack.scrollBy({ left: -420, behavior: "smooth" });
  });

  // Drag pakai mouse
  let isDown = false;
  let startX;
  let scrollLeftStart;
  let isPaused = false;

  whyTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    whyTrack.classList.add("dragging");
    startX = e.pageX - whyTrack.offsetLeft;
    scrollLeftStart = whyTrack.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    whyTrack.classList.remove("dragging");
  });

  whyTrack.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - whyTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    whyTrack.scrollLeft = scrollLeftStart - walk;
  });

  // Drag pakai jari (HP/tablet)
  let touchStartX;
  let touchScrollStart;

  whyTrack.addEventListener(
    "touchstart",
    (e) => {
      isPaused = true;
      touchStartX = e.touches[0].pageX;
      touchScrollStart = whyTrack.scrollLeft;
    },
    { passive: true },
  );

  whyTrack.addEventListener(
    "touchmove",
    (e) => {
      const x = e.touches[0].pageX;
      const walk = (touchStartX - x) * 1.2;
      whyTrack.scrollLeft = touchScrollStart + walk;
    },
    { passive: true },
  );

  whyTrack.addEventListener("touchend", () => {
    isPaused = false;
  });

  // Scroll pakai mouse wheel (roda mouse jadi geser horizontal)
  whyTrack.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      whyTrack.scrollLeft += e.deltaY * 1.2;
    },
    { passive: false },
  );

  // Auto-scroll pelan pas gak disentuh
  whyTrack.addEventListener("mouseenter", () => (isPaused = true));
  whyTrack.addEventListener("mouseleave", () => {
    isPaused = false;
    isDown = false;
    whyTrack.classList.remove("dragging");
  });

  setInterval(() => {
    if (isPaused || isDown) return;

    const maxScroll = whyTrack.scrollWidth - whyTrack.clientWidth;

    if (whyTrack.scrollLeft >= maxScroll - 2) {
      whyTrack.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      whyTrack.scrollLeft += 1;
    }
  }, 30);
}

/*======================
    INFO MODAL (Learn More / Watch Demo / Footer links)
    ======================*/
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalClose2 = document.getElementById("modalClose2");

document.querySelectorAll(".js-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = el.dataset.title || "";
    modalDesc.textContent = el.dataset.desc || "";
    modalOverlay.classList.add("show");
  });
});

function closeModal() {
  modalOverlay.classList.remove("show");
}

modalClose?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
modalClose2?.addEventListener("click", closeModal);

/*======================
    AUTH MODAL (Get Started -> Login/Daftar)
    ======================*/
const authOverlay = document.getElementById("authModalOverlay");
const authClose = document.getElementById("authModalClose");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");

document.querySelectorAll(".js-auth").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    authOverlay.classList.add("show");
  });
});

function closeAuthModal() {
  authOverlay.classList.remove("show");
}

authClose?.addEventListener("click", closeAuthModal);
authOverlay?.addEventListener("click", (e) => {
  if (e.target === authOverlay) closeAuthModal();
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    authTabs.forEach((t) => t.classList.remove("active"));
    authForms.forEach((f) => f.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "Form").classList.add("active");
  });
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Fitur login akan segera aktif. Website ini masih versi tampilan (belum terhubung ke server).",
  );
  closeAuthModal();
});

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Fitur pendaftaran akan segera aktif. Website ini masih versi tampilan (belum terhubung ke server).",
  );
  closeAuthModal();
});
