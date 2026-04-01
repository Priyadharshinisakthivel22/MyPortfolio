function animateSection(section){
  const items = section.querySelectorAll(".reveal-item");

  items.forEach((item) => {
    if(
      !item.classList.contains("reveal-up") &&
      !item.classList.contains("reveal-left") &&
      !item.classList.contains("reveal-right") &&
      !item.classList.contains("reveal-zoom")
    ){
      item.classList.add("reveal-up");
    }

    item.classList.remove("is-visible");
    void item.offsetWidth;
    item.classList.add("is-visible");
  });
}

function updateActiveNav(id){
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const isActive = link.dataset.section === id;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function showSection(id){
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const activeSection = document.getElementById(id);

  if(!activeSection){
    return;
  }

  activeSection.classList.add("active");
  updateActiveNav(id);
  animateSection(activeSection);
  updateScrollProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateScrollProgress(){
  const activeSection = document.querySelector("section.active");
  const progressBar = document.querySelector(".scroll-progress-bar");

  if(!activeSection || !progressBar){
    return;
  }

  const sectionRect = activeSection.getBoundingClientRect();
  const totalScrollable = Math.max(activeSection.offsetHeight - window.innerHeight, 1);
  const scrolled = Math.min(Math.max(-sectionRect.top, 0), totalScrollable);
  const progress = totalScrollable <= 1 ? 1 : scrolled / totalScrollable;

  progressBar.style.width = `${progress * 100}%`;
}

function setupScrollAnimations(){
  const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  }, options);

  document.querySelectorAll(".reveal-item").forEach((item) => {
    if(
      !item.classList.contains("reveal-up") &&
      !item.classList.contains("reveal-left") &&
      !item.classList.contains("reveal-right") &&
      !item.classList.contains("reveal-zoom")
    ){
      item.classList.add("reveal-up");
    }

    observer.observe(item);
  });
}

const typingText = "Designing smooth, modern, and user-friendly web experiences.";
let typingIndex = 0;

function typing(){
  const target = document.querySelector(".typing");

  if(!target){
    return;
  }

  if(typingIndex < typingText.length){
    target.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(typing, 55);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const firstSection = document.querySelector("section.active");

  if(firstSection){
    animateSection(firstSection);
    updateActiveNav(firstSection.id);
  }

  setupScrollAnimations();
  updateScrollProgress();
  typing();

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
});
