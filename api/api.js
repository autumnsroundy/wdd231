const baseUrl = "https://developer.nps.gov/api/v1/";
// defines the base URL for making requests to the NPS API

// general function of getJson is to fetch JSON data from the NPS API
// takes an endpoint as an argument (alerts or activities/parks) which will be appended to the baseURL to form the full API URL
async function getJson(endpoint) {
  const apiKey = "hmWz5bCYkWZrvVE4VnsOckzxkKHkUuDbri0fQTnh";
  // construct the url: baseUrl + endpoint + parameters (forms complete URL)
  const url = baseUrl + endpoint;
  // Fetch request uses a Get method with headers specifying the content type and API key
  //  set the options. The important one here is the X-Api-Key
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
      }
  }

  // fetch() function is used to make the request, await is used to make the function wait for a response before continuing execution.
  const response = await fetch(url, options)
  const data = await response.json()
  //once the response is received, it is converted to JSON with response.json()
  console.log(data) //JSON data is logged to the console and returned
  return data;
}

getJson('alerts?parkCode=acad,dena'); //getJson function with the alerts endpoint and query parameters
// retrieve from Acadia (acad) and Denali (dena) national parks from the NPS API

// function listTemplate is used to generateHTML list items (<li>) for each park returned from the API
// The (item) parameter represents a park object, for each park:
        // item.url (link to the park's page)
        // item.fullname: The full name of the park
        // item.states : the states where the park is located (ID)
function listTemplate(item) {
    return `<li><a href="${item.url}">${item.fullname}</a> ${item.states}</li>`
}

// renderClimbingList function fetches parks where climbing is an activity and displays the results in an HTML element
    // endpoint: 'activities/parks?q=climbing' is defined which will fetch parks offering climbing activities
    // DOM Mainpulation: It gets a reference to the HTML element with the ID outputList, where the results will be displayed
    // API request: it calls getJson(endpoint) to fetch the data from the API
    // Data: the response data is expected to contain an array of parks in the data.data property
    // rendering HTML: The parks array is mapped to generate a list of HTML list items using the listTemplate function (above)
    // The .join("") converts the array of HTML list items into a single str of HTML
    // Updating the DOM: the innerHTML of the outputList element is set to the generated HTML, displaying the list of parks
async function renderClimbingList() {
    const endpoint = "activities/parks?q=climbing"
    const listElement = document.getElementById("outputList")
    const data = await getJson(endpoint)
    const parks = data.data
    const listHtml = parks.map(listTemplate).join("")
    listElement.innerHTML = listHtml;
}

// this calls the renderCLimbingList function (above), triggering the process of fetching and displaying the climbing-related parks
renderClimbingList()

