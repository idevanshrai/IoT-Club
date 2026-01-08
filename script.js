// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smooth cursor movement with easing
  const ease = 0.15;
  const followerEase = 0.08;
  
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  
  followerX += (mouseX - followerX) * followerEase;
  followerY += (mouseY - followerY) * followerEase;
  
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .card, .nav-link');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(2)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
  });
});

// ==================== SPLASH SCREEN ====================
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.classList.add('fade-out');
    
    setTimeout(() => {
      splash.style.display = "none";
    }, 800);
  }, 3000);
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  body.classList.toggle("dark");
  
  const theme = body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  
  // Smooth transition
  document.documentElement.style.scrollBehavior = 'auto';
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, 400);
});

// Load saved theme preference
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.remove("dark");
    body.classList.add("light");
  }
});

// ==================== SMOOTH NAVIGATION ====================
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ==================== APPLY BUTTON - REVEAL TEAMS ====================
const applyBtn = document.getElementById("applyBtn");
const teamsSection = document.getElementById("teams");

applyBtn.addEventListener("click", () => {
  teamsSection.classList.remove("hidden");
  
  const headerHeight = document.querySelector('header').offsetHeight;
  const targetPosition = teamsSection.offsetTop - headerHeight - 20;
  
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
  
  setTimeout(() => {
    const cards = teamsSection.querySelectorAll(".card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    });
  }, 400);
});

// ==================== TEAM CARD CLICKS ====================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank");
    }
  });
  
  card.setAttribute("tabindex", "0");
  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const link = card.getAttribute("data-link");
      if (link) {
        window.open(link, "_blank");
      }
    }
  });
});

// ==================== SCROLL REVEAL ANIMATION ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach(el => observer.observe(el));

// ==================== HEADER SCROLL EFFECT ====================
let lastScroll = 0;
const header = document.querySelector("header");

const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.padding = "0.8rem 2rem";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.padding = "1.2rem 2rem";
    header.style.boxShadow = "none";
  }
  
  lastScroll = currentScroll;
};

// Debounced scroll handler
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ==================== KEYBOARD NAVIGATION ENHANCEMENT ====================
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "h") {
    e.preventDefault();
    const homeSection = document.getElementById("home");
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      top: homeSection.offsetTop - headerHeight - 20,
      behavior: "smooth"
    });
  }
  
  if (e.altKey && e.key === "a") {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      top: aboutSection.offsetTop - headerHeight - 20,
      behavior: "smooth"
    });
  }
  
  if (e.altKey && e.key === "t") {
    e.preventDefault();
    if (!teamsSection.classList.contains("hidden")) {
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo({
        top: teamsSection.offsetTop - headerHeight - 20,
        behavior: "smooth"
      });
    } else {
      applyBtn.click();
    }
  }
});

// ==================== PRELOAD IMAGES ====================
window.addEventListener("load", () => {
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    if (img.loading !== "lazy") {
      const tempImg = new Image();
      tempImg.src = img.src;
    }
  });
});

// ==================== PARALLAX EFFECT FOR CIRCUIT ====================
const circuitSvg = document.querySelector('.circuit-svg');

if (circuitSvg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (circuitSvg.getBoundingClientRect().top < window.innerHeight) {
      circuitSvg.style.transform = `translateY(${rate}px)`;
    }
  });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Intersection Observer for lazy animations
const lazyAnimationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

// Apply to animated elements
document.querySelectorAll('.circuit-line, .circuit-node, .data-pulse').forEach(el => {
  el.style.animationPlayState = 'paused';
  lazyAnimationObserver.observe(el);
});

// ==================== MOBILE TOUCH OPTIMIZATION ====================
if ('ontouchstart' in window) {
  // Hide custom cursor on touch devices
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  
  // Add touch feedback
  cards.forEach(card => {
    card.addEventListener('touchstart', () => {
      card.style.transform = 'translateY(-8px) scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });
}