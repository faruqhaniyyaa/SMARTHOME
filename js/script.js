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
        if (current < target) {
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

window.addEventListener("scroll", revealSection);

revealSection();

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
    BACK TO TOP
    ======================*/

const topBtn = document.querySelector(".top-btn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });
}

/*======================
    STICKY NAVBAR
    ======================*/

const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 80);
  });
}

/*======================
    ACTIVE NAVIGATION
    ======================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;

    const height = section.clientHeight;

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

if (particleContainer) {
  document.addEventListener("mousemove", (e) => {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = e.clientX + "px";
    star.style.top = e.clientY + "px";

    // ukuran random
    star.style.width = Math.random() * 5 + 3 + "px";
    star.style.height = star.style.width;

    // warna random
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
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.left = link.offsetLeft + "px";
    });
  });
}
gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".why-track");

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),

  ease: "none",

  scrollTrigger: {
    trigger: ".why",

    start: "top top",

    end: () => "+=" + track.scrollWidth,

    pin: true,

    scrub: 1,

    invalidateOnRefresh: true,
  },
});
const whyTrack = document.getElementById("whyTrack");

document.querySelector(".why-arrow.right").addEventListener("click", () => {
  whyTrack.scrollBy({
    left: 420,
    behavior: "smooth",
  });
});

document.querySelector(".why-arrow.left").addEventListener("click", () => {
  whyTrack.scrollBy({
    left: -420,
    behavior: "smooth",
  });
});
