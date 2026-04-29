// PAGE FADE IN / OUT
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        this.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});


// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach((el) => observer.observe(el));
}


// SCRAMBLE TEXT
const letters = "*?><[]&@#)(.%$-_:/;?!";

document.querySelectorAll(".scramble").forEach((el) => {
  const originalHTML = el.innerHTML;
  const originalText = el.innerText;

  el.addEventListener("mouseenter", () => {
    let iteration = 0;

    clearInterval(el.scrambleInterval);

    el.scrambleInterval = setInterval(() => {
      const scrambled = originalText
        .split("")
        .map((char, index) => {
          if (char === "\n") return "\n";
          if (char === " ") return " ";
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      el.innerHTML = scrambled.replace(/\n/g, "<br>");

      if (iteration >= originalText.length) {
        clearInterval(el.scrambleInterval);
      }

      iteration += 0.36;
    }, 30);
  });

  el.addEventListener("mouseleave", () => {
    clearInterval(el.scrambleInterval);
    el.innerHTML = originalHTML;
  });
});

const isTablet = window.matchMedia("(max-width: 1024px) and (min-width: 769px)").matches;

if (isTablet) {
  const scrambleWord = document.querySelector(".hero-title .scramble");

  if (scrambleWord && typeof gsap !== "undefined") {
    const originalText = scrambleWord.textContent;

    gsap.to(scrambleWord, {
      duration: 1.2,
      delay: 0.5,
      scrambleText: {
        text: originalText,
        chars: "upperCase",
        speed: 0.4
      }
    });
  }
}

// DRAGGABLE ELEMENTS (tablet + desktop OK, mobile off)
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach((item) => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    item.addEventListener("pointerdown", (e) => {
      isDragging = true;
      item.setPointerCapture(e.pointerId);

      const rect = item.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      item.classList.add("dragging");
      item.style.zIndex = "999";
    });

    item.addEventListener("pointermove", (e) => {
      if (!isDragging) return;

      item.style.left = `${e.clientX - offsetX}px`;
      item.style.top = `${e.clientY - offsetY}px`;
      item.style.right = "auto";
      item.style.bottom = "auto";
    });

    item.addEventListener("pointerup", () => {
      isDragging = false;
      item.classList.remove("dragging");
    });

    item.addEventListener("pointercancel", () => {
      isDragging = false;
      item.classList.remove("dragging");
    });
  });
} 
// smiley face animation
  const smileys = [":-)", ":3", ":D", ":>", ";-D", ":]", ":^)"];
  let index = 0;

  const el = document.querySelector(".smiley");

  setInterval(() => {
    index = (index + 1) % smileys.length;
    el.textContent = smileys[index];
  }, 1000);


// mobile hidden menu buttons
  const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileOverlay = document.querySelector(".mobile-overlay");

if (menuBtn && mobileNav && mobileOverlay) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileNav.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
  });

  mobileOverlay.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");
  });
}