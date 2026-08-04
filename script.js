// =========================================================
// Velvet Leaf V2 - Complete JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const announcementBar = document.getElementById("announcementBar");
  const closeAnnouncement = document.getElementById("closeAnnouncement");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  // Current year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Header scroll state + back-to-top visibility
  const updateScrollState = () => {
    const scrolled = window.scrollY > 20;

    if (header) {
      header.classList.toggle("scrolled", scrolled);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    }
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  // Mobile menu
  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    body.classList.remove("menu-open");
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    body.classList.add("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMobileMenu();
      }
    });
  }

  // Announcement bar
  if (announcementBar && closeAnnouncement) {
    closeAnnouncement.addEventListener("click", () => {
      announcementBar.style.display = "none";
      sessionStorage.setItem("velvetAnnouncementClosed", "true");
    });

    if (sessionStorage.getItem("velvetAnnouncementClosed") === "true") {
      announcementBar.style.display = "none";
    }
  }

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item?.querySelector(".faq-answer");
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-question").forEach((otherButton) => {
        if (otherButton === button) return;

        const otherItem = otherButton.closest(".faq-item");
        const otherAnswer = otherItem?.querySelector(".faq-answer");

        otherButton.setAttribute("aria-expanded", "false");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0px";
        }
      });

      button.setAttribute("aria-expanded", String(!isExpanded));

      if (answer) {
        answer.style.maxHeight = isExpanded
          ? "0px"
          : `${answer.scrollHeight}px`;
      }
    });
  });

  // Back to top
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Smooth scroll for same-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      closeMobileMenu();

      const headerOffset = header ? header.offsetHeight + 10 : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  // Image fallback
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");
      image.alt = image.alt || "Image unavailable";
    });
  });
});
