import { getParkData, parkInfoLinks } from "./parkService.mjs";
import {
  parkInfoTemplate,
  mediaCardTemplate,
  footerTemplate
} from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
const parkData = getParkData();

//step 1 on todo list
function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${parkData.fullName}</h1><p>${parkData.description}</p>`;
}

//step 3 on todo list:
function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  //Loop through and run mediaCardTemplate -take HTML returned and insert into info section (MAP)
  const html = data.map(mediaCardTemplate); //step 4 on todo list
  infoEl.innerHTML = html.join("");
}

setHeaderInfo(parkData);
setHeaderFooter(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
setFooter(parkData);