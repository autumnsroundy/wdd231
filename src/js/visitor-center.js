import "../css/style.css"; // Allowed due to Vite
import "../css/visitor-center.css";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import {
  vcInfoTemplate,
  vcTitleTemplate,
  vcDetailsTemplate,
  vcAmenityTemplate,
  vcImageTemplate,
  listTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate
} from "./templates.mjs";

/**
 * Extracts the value of a given query parameter from the URL.
 * @param {string} param - The query parameter key to retrieve.
 * @returns {string | null} - The value of the query parameter or null if not found.
 */
function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Populates the page with visitor center details.
 * @param {object} data - Visitor center data.
 */
function buildPage(data) {
  if (!data) {
    console.error("Error: No visitor center data available.");
    document.querySelector("main").innerHTML = "<p>Error loading visitor center details.</p>";
    return;
  }

  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(data.name);
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(data);

  const detailsEl = document.querySelector(".vc-details-list");
  detailsEl.innerHTML = ""; // Clear previous content

  // Addresses Section
  if (data.addresses?.length) {
    const addressHTML = vcAddressesListTemplate(data.addresses);
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcAddresses", "Addresses", "heading-icon_map-pin", addressHTML)
    );
  } else {
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcAddresses", "Addresses", "heading-icon_map-pin", "<p>No addresses available</p>")
    );
  }

  // Directions Section
  if (data.directionsInfo) {
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcDirections", "Directions", "directions", vcDirectionsTemplate(data.directionsInfo))
    );
  }

  // Amenities Section
  if (data.amenities?.length) {
    const amenitiesHTML = listTemplate(data.amenities, vcAmenityTemplate);
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcAmenities", "Amenities", "heading-icon_info", amenitiesHTML)
    );
  } else {
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcAmenities", "Amenities", "heading-icon_info", "<p>No amenities available</p>")
    );
  }

  // Contacts Section
  if (data.contacts) {
    const contactHTML = vcContactsTemplate(data.contacts);
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcContacts", "Contacts", "phone", contactHTML)
    );
  } else {
    detailsEl.insertAdjacentHTML(
      "beforeend",
      vcDetailsTemplate("vcContacts", "Contacts", "phone", "<p>No contact information available</p>")
    );
  }

  // Gallery Section
  if (data.images?.length) {
    const galleryHTML = listTemplate(data.images, vcImageTemplate);
    document.querySelector(".vc-gallery").insertAdjacentHTML("beforeend", galleryHTML);
  } else {
    document.querySelector(".vc-gallery").insertAdjacentHTML("beforeend", "<p>No images available</p>");
  }
}

/**
 * Initializes the visitor center page by fetching data and setting up the layout.
 */
async function init() {
  try {
    // Fetch the common park data for header and footer
    const parkData = await getParkData();
    setHeaderFooter(parkData);

    // Get the visitor center ID from URL parameters
    const id = getParam("id");
    if (!id) {
      throw new Error("Visitor center ID not provided in URL.");
    }

    // Fetch visitor center details based on the ID
    const centerDetails = await getParkVisitorCenterDetails(id);
    if (!centerDetails) {
      throw new Error("No visitor center details found.");
    }

    // Populate the page with the fetched data
    buildPage(centerDetails);

  } catch (error) {
    console.error("Error initializing visitor center page:", error);
    document.querySelector("main").innerHTML = `<p>${error.message}</p>`;
  }
}

// Run the initialization
init();
