let url = "http://universities.hipolabs.com/search?name=";
let searchButton = document.getElementById("searchButton");
let countryInput = document.getElementById("countryInput");
let countriesList = document.getElementById("countries");

searchButton.addEventListener("click", async () => {
  await searchColleges();
});

countryInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    await searchColleges();
  }
});

async function searchColleges() {
  let country = countryInput.value;
  let colleges = await getColleges(country);
  show(colleges);
  countryInput.value = "";
}

async function getColleges(country) {
  try {
    let res = await axios.get(url + country);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function show(colleges) {
  let list = document.querySelector(".list");
  list.innerHTML = ""; // Use innerHTML to clear the list

  if (colleges.length === 0) {
    // If no data found, display a message
    let li = document.createElement("li");
    li.innerText = "Sorry, I didn't find any data for  country.";
    list.appendChild(li);
  } else {
    // If data found, display the list
    for (col of colleges) {
      let li = document.createElement("li");
      let googleLink = document.createElement("a");
      googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(
        col.name
      )}`;
      googleLink.target = "_blank";
      googleLink.innerText = col.name;

      // Reset link styles
      googleLink.style.textDecoration = "none";
      googleLink.style.color = "inherit";
      googleLink.style.cursor = "pointer";

      // Add click event listener to each li
      li.addEventListener("click", function () {
        window.open(googleLink.href, "_blank");
      });

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
