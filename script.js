const contactModal = document.getElementById("contactModal");
const contactTriggers = document.querySelectorAll(".contact-trigger, .talk-btn");
const closeContactButtons = document.querySelectorAll("#contactModal [data-close-modal]");

const galleryModals = document.querySelectorAll(".gallery-modal");
const activityCards = document.querySelectorAll(".activity-clickable");
const closeGalleryButtons = document.querySelectorAll("[data-close-gallery]");

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".contact-modal.show, .gallery-modal.show")) {
    document.body.classList.remove("modal-open");
  }
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();

    openModal(contactModal);

    const nameField = document.getElementById("contactName");

    if (nameField) {
      setTimeout(() => {
        nameField.focus();
      }, 150);
    }
  });
});

closeContactButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    closeModal(contactModal);
  });
});

activityCards.forEach((card) => {
  card.addEventListener("click", () => {
    const modalId = card.dataset.modal;
    const modal = document.getElementById(modalId);

    openModal(modal);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      const modalId = card.dataset.modal;
      const modal = document.getElementById(modalId);

      openModal(modal);
    }
  });
});

closeGalleryButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const modal = button.closest(".gallery-modal");

    closeModal(modal);
  });
});

document.querySelectorAll(".contact-backdrop, .gallery-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", () => {
    const modal = backdrop.closest(".contact-modal, .gallery-modal");

    closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  document.querySelectorAll(".contact-modal.show, .gallery-modal.show").forEach((modal) => {
    closeModal(modal);
  });
});

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        // Remove active from all navigation links
        navLinks.forEach((navLink) => {
            navLink.classList.remove("active");
        });

        // Add active to the clicked link
        link.classList.add("active");

        // Get the section from href
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        // Scroll to the selected section
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});