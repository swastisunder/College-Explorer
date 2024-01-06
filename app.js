let url = "http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  let country = document.querySelector("input").value;
  let inp = document.querySelector("input");
  let colleges = await getColleges(country);
  show(colleges);
  country.innerText = "";
  inp.innerText = "";
});

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
  list.innerText = "";
  for (col of colleges) {
    console.log(col.name);
    let li = document.createElement("li");
    li.innerText = col.name;
    list.appendChild(li);
  }
}
