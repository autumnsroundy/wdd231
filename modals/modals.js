// modals.js
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openButton = document.getElementById("open-modal");
    const closeButton = document.querySelector(".close-button");
  
    function openModal() {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  
    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  
    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
  
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });