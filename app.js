const defViewBox =
  "0.34389990089197225 0.34389990089197225 701 299.98145193260655";

document.addEventListener("DOMContentLoaded", function () {
  let svg = document.getElementById("world-map");
  function updateHover() {
    const euCountries = document.querySelectorAll(".EU");

    euCountries.forEach((el) => {
      let newEl = el.cloneNode(true);
      el.replaceWith(newEl);
    });

    const newEuCountries = document.querySelectorAll(".EU");

    if (svg.getAttribute("viewBox") === defViewBox) {
      newEuCountries.forEach((country) => {
        country.addEventListener("mouseover", () => {
          newEuCountries.forEach((el) => (el.style.fill = "#c99aff")); // Change all to blue
        });

        country.addEventListener("mouseout", () => {
          newEuCountries.forEach((el) => (el.style.fill = "")); // Reset all
        });
      });
    } else {
      newEuCountries.forEach((el) => (el.style.fill = "violet"));

      newEuCountries.forEach((el) => {
        el.addEventListener("mouseover", () => {
          el.style.fill = "#c99aff";
        });
        el.addEventListener("mouseout", () => {
          el.style.fill = "";
        });
      });
    }
  }

  const observer = new MutationObserver(() => {
    updateHover();
  });
  observer.observe(svg, { attributes: true, attributeFilter: ["viewBox"] });

  updateHover();
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("EU")) {
      svg.setAttribute("viewBox", `275 20 80 80`);
      console.log("EU was clicked");
    } else if (event.target.classList.contains("NA")) {
      svg.setAttribute("viewBox", `0 0 140 145`);
      console.log("NA was clicked");
    } else {
      svg.setAttribute("viewBox", defViewBox);
    }
  });
});
