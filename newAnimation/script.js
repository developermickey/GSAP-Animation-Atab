const logos = document.querySelectorAll(".logo");
const container = document.querySelector(".hotspots-logos");

const cRect = container.getBoundingClientRect();
const centerX = cRect.width / 2;
const centerY = cRect.height / 2;

/* prepare logos */
logos.forEach((logo) => {
  const rect = logo.getBoundingClientRect();

  const logoCenterX = rect.left + rect.width / 2;
  const logoCenterY = rect.top + rect.height / 2;

  const dx = centerX + cRect.left - logoCenterX;
  const dy = centerY + cRect.top - logoCenterY;

  logo.dataset.dx = dx;
  logo.dataset.dy = dy;

  gsap.set(logo, {
    x: dx,
    y: dy,
    scale: 0.45,
    opacity: 0,
    force3D: true
  });
});

const rand = () => gsap.utils.random(-18, 18);

/* MASTER TIMELINE */
const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 1.2,
  defaults: {
    ease: "power2.inOut"
  }
});

/* 1️⃣ FAST ENTRY — ALL TOGETHER */
tl.to(logos, {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 1,
  duration: 0.9,
  ease: "power3.out"
})

/* 2️⃣ BIG bounce */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.45,
  y: (i, el) => el.dataset.dy * 0.45,
  duration: 0.35
})

.to(logos, {
  x: 0,
  y: 0,
  duration: 0.25
})

/* 3️⃣ MEDIUM bounce */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.25,
  y: (i, el) => el.dataset.dy * 0.25,
  duration: 0.3
})

.to(logos, {
  x: 0,
  y: 0,
  duration: 0.22
})

/* 4️⃣ SMALL bounce */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.12,
  y: (i, el) => el.dataset.dy * 0.12,
  duration: 0.25
})

.to(logos, {
  x: 0,
  y: 0,
  duration: 0.2
})

/* 5️⃣ GO UP TOGETHER */
.to(logos, {
  y: -25,
  duration: 0.6,
  ease: "power2.out"
})

/* 6️⃣ RANDOM MOVE (position random but same time) */
.to(logos, {
  x: () => rand(),
  y: () => rand(),
  duration: 1.2
})

/* 7️⃣ RETURN */
.to(logos, {
  x: 0,
  y: 0,
  duration: 0.8
})

/* 8️⃣ COLLAPSE */
.to(logos, {
  x: (i, el) => el.dataset.dx,
  y: (i, el) => el.dataset.dy,
  scale: 0.4,
  opacity: 0,
  duration: 1.2,
  ease: "power2.in"
});
