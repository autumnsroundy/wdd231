import "../css/style.css";
import "../css/conditions.css";
import {
  getParkData,
  getParkAlerts,
  getParkVisitorCenters
} from "./parkService.mjs";
import {
  activityListTemplate,
  alertTemplate,
  visitorCenterTemplate
} from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

/**
 * Displays park alerts on the page.
 * @param {Array} alerts - List of park alerts.
 */
function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  if (!alertsContainer) {
    console.error("Error: Alerts container not found.");
    return;
  }

  alertsContainer.innerHTML = "";

  if (!alerts || alerts.length === 0) {
    alertsContainer.innerHTML = "<li>No current alerts.</li>";
    return;
  }

  const html = alerts.map(alertTemplate).join("");
  alertsContainer.insertAdjacentHTML("afterbegin", html);
}

/**
 * Displays visitor centers on the page.
 * @param {Array} centers - List of visitor centers.
 */
function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor ul");
  if (!centersContainer) {
    console.error("Error: Visitor centers container not found.");
    return;
  }

  centersContainer.innerHTML = "";

  if (!centers || centers.length === 0) {
    centersContainer.innerHTML = "<li>No visitor centers available.</li>";
    return;
  }

  const html = centers.map(visitorCenterTemplate).join("");
  centersContainer.insertAdjacentHTML("afterbegin", html);
}

/**
 * Displays activities on the page.
 * @param {Array} activities - List of park activities.
 */
function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  if (!activitiesContainer) {
    console.error("Error: Activities container not found.");
    return;
  }

  activitiesContainer.innerHTML = "";

  if (!activities || activities.length === 0) {
    activitiesContainer.innerHTML = "<li>No activities available.</li>";
    return;
  }

  const html = activityListTemplate(activities);
  activitiesContainer.insertAdjacentHTML("afterbegin", html);
}

/**
 * Initializes the conditions page by fetching data and populating elements.
 */
async function init() {
  try {
    const parkData = await getParkData();
    if (!parkData || !parkData.parkCode) {
      throw new Error("Invalid park data received.");
    }

    setHeaderFooter(parkData);

    const [alerts, visitorCenters] = await Promise.all([
      getParkAlerts(parkData.parkCode),
      getParkVisitorCenters(parkData.parkCode)
    ]);

    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities);
  } catch (error) {
    console.error("Error initializing conditions page:", error);
    document.querySelector("main").innerHTML = `<p>${error.message}</p>`;
  }
}

init();
