const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav a")];

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  links.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${visible.target.id}`
    );
  });
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: [0, 0.2, 0.5]
});

sections.forEach(section => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();
