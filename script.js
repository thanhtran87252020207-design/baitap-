
// 1. TỰ ĐỘNG CẬP NHẬT NĂM

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 2. MENU DÀNH CHO ĐIỆN THOẠI

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Đóng menu" : "Mở menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  // Khi chọn một mục, menu tự đóng
  const links = navLinks.querySelectorAll("a");

  links.forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Mở menu");

    });

  });

}


// 3. HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion || !("IntersectionObserver" in window)) {

  revealElements.forEach((element) => {
    element.classList.add("active");
  });

} else {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.05
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

}
