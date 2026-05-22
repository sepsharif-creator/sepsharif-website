const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const backToTopButton = document.querySelector("[data-back-to-top]");

if (backToTopButton) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let ticking = false;

  const updateBackToTopVisibility = () => {
    const shouldShow = window.scrollY > 400;
    backToTopButton.classList.toggle("is-visible", shouldShow);
    backToTopButton.tabIndex = shouldShow ? 0 : -1;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBackToTopVisibility);
      ticking = true;
    }
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    });
  });

  updateBackToTopVisibility();
  window.addEventListener("scroll", handleScroll, { passive: true });
}
