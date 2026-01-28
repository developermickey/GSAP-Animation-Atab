const logos = document.querySelectorAll(".logo");
const container = document.querySelector(".hotspots-logos");

const cRect = container.getBoundingClientRect();
const centerX = cRect.width / 2;
const centerY = cRect.height / 2;

logos.forEach((logo) => {
  const rect = logo.getBoundingClientRect();

  const logoCenterX = rect.left + rect.width / 2;
  const logoCenterY = rect.top + rect.height / 2;

  const parentLeft = cRect.left;
  const parentTop = cRect.top;

  const dx = centerX + parentLeft - logoCenterX;
  const dy = centerY + parentTop - logoCenterY;

  logo.dataset.dx = dx;
  logo.dataset.dy = dy;

  gsap.set(logo, {
    x: dx,
    y: dy,
    opacity: 0,
    scale: 0.45,
    force3D: true
  });
});

/* 🌟 MASTER TIMELINE */
const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 1.5,
  defaults: {
    ease: "power2.inOut"   // 👈 very smooth
  }
});

/* 1️⃣ center → position */
tl.to(logos, {
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  duration: 1.6,
  stagger: 0.14
})

/* 2️⃣ small pull */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.18,
  y: (i, el) => el.dataset.dy * 0.18,
  duration: 0.8
})

/* back */
.to(logos, {
  x: 0,
  y: 0,
  duration: 0.75
})

/* 3️⃣ medium pull */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.35,
  y: (i, el) => el.dataset.dy * 0.35,
  duration: 0.9
})

/* back */
.to(logos, {
  x: 0,
  y: 0,
  duration: 0.85
})

/* 4️⃣ deep pull */
.to(logos, {
  x: (i, el) => el.dataset.dx * 0.5,
  y: (i, el) => el.dataset.dy * 0.5,
  duration: 1
})

/* back */
.to(logos, {
  x: 0,
  y: 0,
  duration: 0.9
})

/* 5️⃣ final vanish */
.to(logos, {
  x: (i, el) => el.dataset.dx,
  y: (i, el) => el.dataset.dy,
  opacity: 0,
  scale: 0.4,
  duration: 1.3,
  ease: "power2.in"
});
