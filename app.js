// API URL for fetching college data based on the country
let url = "http://universities.hipolabs.com/search?name=";

// Getting reference to HTML elements
let searchButton = document.getElementById("searchButton");
let countryInput = document.getElementById("countryInput");
let countriesList = document.getElementById("countries");

// Adding click event listener to the search button
searchButton.addEventListener("click", async () => {
  await searchColleges();
});

// Adding keydown event listener to the country input
countryInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    await searchColleges();
  }
});

// Function to search for colleges based on the entered country
async function searchColleges() {
  let country = countryInput.value;
  let colleges = await getColleges(country);
  show(colleges);
  countryInput.value = "";
}

// Function to fetch colleges from the API
async function getColleges(country) {
  try {
    let res = await axios.get(url + country);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Function to display the list of colleges
function show(colleges) {
  let list = document.querySelector(".list");
  list.innerHTML = "";

  // Check if colleges data is empty
  if (colleges.length === 0) {
    let li = document.createElement("li");
    li.innerText = "Sorry, I didn't find any data for the country.";
    list.appendChild(li);
  } else {
    for (col of colleges) {
      let li = document.createElement("li");
      let googleLink = document.createElement("a");
      // Create a link to Google search for the college name
      googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(
        col.name
      )}`;
      googleLink.target = "_blank";
      googleLink.innerText = col.name;

      googleLink.style.textDecoration = "none";
      googleLink.style.color = "inherit";
      googleLink.style.cursor = "pointer";

      li.addEventListener("click", function () {
        window.open(googleLink.href, "_blank");
      });

      // Append the link to the list item and add it to the list
      li.appendChild(googleLink);
      list.appendChild(li);
    }
  }
}

// Fetch the list of countries and populate the datalist
axios
  .get("https://restcountries.com/v2/all")
  .then((response) => {
    const countries = response.data.map((country) => country.name);
    countriesList.innerHTML = countries
      .map((country) => `<option value="${country}">`)
      .join("");
  })
  .catch((error) => console.error("Error fetching country list:", error));
