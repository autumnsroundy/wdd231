import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// 1. Update the disclaimer link
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

// 2. Update the title of the page
document.title = parkData.fullName;

// 3. Update the hero image
const heroImage = document.querySelector(".hero-banner__image");
heroImage.src = parkData.images[0].url; // First image in the list

// 4. Update the hero info (name, designation, states)
function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
}

const heroInfo = document.querySelector(".hero-banner__info");
heroInfo.innerHTML = parkInfoTemplate(parkData);
