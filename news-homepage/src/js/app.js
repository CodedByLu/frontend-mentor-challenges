const body = document.querySelector("body");

const hamburgerMenu = document.getElementById("hamburger-menu");
const hamburgerMenuIcon = document.querySelector(".header__toggle-icon");
const headerNav = document.querySelector(".header__nav");
const backdrop = document.querySelector(".backdrop");

hamburgerMenu.addEventListener("click", () => {
  const isOpen = hamburgerMenu.classList.toggle("open");

  // accessibility
  hamburgerMenu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  hamburgerMenu.setAttribute("aria-expanded", isOpen);

  // icon swap
  hamburgerMenuIcon.src = isOpen
    ? "./assets/images/icon-menu-close.svg"
    : "./assets/images/icon-menu.svg";

  // ui state
  headerNav.classList.toggle("header__nav--open", isOpen);
  backdrop.classList.toggle("backdrop--visible", isOpen);
  body.classList.toggle("body--locked", isOpen);
});

const mediaQuery = window.matchMedia("(min-width: 769px)");

function handleWidthChange(e) {
  if (e.matches) {
    hamburgerMenu.classList.remove("open");
    hamburgerMenu.removeAttribute("aria-label");
    hamburgerMenu.setAttribute("aria-expanded", "false");
    hamburgerMenuIcon.src = "./assets/images/icon-menu.svg";
    headerNav.classList.remove("header__nav--open");
    backdrop.classList.remove("backdrop--visible");
    body.classList.remove("body--locked");
  } else {
    hamburgerMenu.setAttribute("aria-label", "Open menu");
    hamburgerMenu.setAttribute("aria-expanded", "false");
  }
}

handleWidthChange(mediaQuery);
mediaQuery.addEventListener("change", handleWidthChange);
