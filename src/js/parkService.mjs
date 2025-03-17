const API_KEY = import.meta.env.VITE_NPS_API_KEY; // Ensure API key is loaded
const BASE_URL = "https://developer.nps.gov/api/v1/";

// Function to fetch JSON data from API
async function getJson(endpoint) {
  const url = `${BASE_URL}${endpoint}&api_key=${API_KEY}`; // Ensure API key is included
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
    const data = await response.json();
    return data.data; // Extract `data` property for easy use
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array to avoid undefined errors
  }
}

// Fetch park details by parkCode
export async function getParkData(parkCode = "yell") {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);
  return parkData.length ? parkData[0] : null; // Return first result or null
}

// Fetch alerts for a specific park
export async function getParkAlerts(parkCode) {
  return await getJson(`alerts?parkCode=${parkCode}`);
}

// Fetch visitor centers for a specific park
export async function getParkVisitorCenters(parkCode) {
  return await getJson(`visitorcenters?parkCode=${parkCode}`);
}

// Fetch details of a specific visitor center by ID
export async function getParkVisitorCenterDetails(centerId) {
  return await getJson(`visitorcenters?id=${centerId}`);
}

// Information links (unchanged, but optimized with spread operator)
const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    description: "Learn about the visitor centers in the park."
  }
];

// Function to update image links dynamically
export function getInfoLinks(data) {
  return parkInfoLinks.map((item, index) => ({
    ...item,
    image: data[index + 2]?.url || "default-image.jpg" // Prevents errors if data is missing
  }));
}
