const defViewBox = "0 0 2000 800";
const euViewBox = "800 55 230 230"
const naViewBox = "100 0 350 350"

document.addEventListener("DOMContentLoaded", function () {
  let svg = document.getElementById("world-map");
  function updateHover() {
    const euCountries = document.querySelectorAll(".EU");
    const naCountries = document.querySelectorAll(".NA");
    
    // Remove old event listeners by cloning the elements
    euCountries.forEach((el) => {
      let newEl = el.cloneNode(true);
      el.replaceWith(newEl);
    });
    naCountries.forEach((el) => {
      let newEl = el.cloneNode(true);
      el.replaceWith(newEl);
    });
    
    const newEuCountries = document.querySelectorAll(".EU");
    const newNaCountries = document.querySelectorAll(".NA");
    // Change change country colours to same on hover when in world view
    if (svg.getAttribute("viewBox") === defViewBox) {
      console.log("WORLD")
      newEuCountries.forEach((country) => {
        country.addEventListener("mouseover", () => {
          newEuCountries.forEach((el) => (el.style.fill = "#c99aff"));
        });
        country.addEventListener("mouseout", () => {
          newEuCountries.forEach((el) => (el.style.fill = ""));
        });
      });
      newNaCountries.forEach((country) => {
        country.addEventListener("mouseover", () => {
          newNaCountries.forEach((el) => (el.style.fill = "#c99aff"));
        });
        country.addEventListener("mouseout", () => {
          newNaCountries.forEach((el) => (el.style.fill = ""));
        });
      });
    }
    // Only hovered country changes colour 
    else if (svg.getAttribute("viewBox") == euViewBox){
      console.log("EU")
      // Change all the country colours to violet (since it wouldn't work without this)
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
    // Doing the same with the NA
    else if (svg.getAttribute("viewBox") == naViewBox){
      newNaCountries.forEach((el) => (el.style.fill = "violet"));
      console.log("NA")
      newNaCountries.forEach((el) => {
        el.addEventListener("mouseover", () => {
          el.style.fill = "#c99aff";
        });
        el.addEventListener("mouseout", () => {
          el.style.fill = "";
        });
      });
    }
  }
  // Observe if viewbox changes
  const observer = new MutationObserver(() => {
    updateHover();
  });
  observer.observe(svg, { attributes: true, attributeFilter: ["viewBox"] });
  updateHover();
  
  // Animate viewBox transition
  function animateViewBoxChange(fromBox, toBox, duration = 300) {
    const fromValues = fromBox.split(" ").map(parseFloat);
    const toValues = toBox.split(" ").map(parseFloat);
    const startTime = performance.now();
    
    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const currentValues = fromValues.map((from, i) => from + (toValues[i] - from) * progress);
      svg.setAttribute("viewBox", currentValues.join(" "));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        svg.setAttribute("viewBox", toBox);
      }
    }
    requestAnimationFrame(animate);
  }
  
  // Zoom
  document.addEventListener("click", function (event) {
    let targetBox = defViewBox;
    const currentBox = svg.getAttribute("viewBox");
    if (event.target.classList.contains("EU")) {
      targetBox = euViewBox;
    } else if (event.target.classList.contains("NA")) {
      targetBox = naViewBox;  
    }
    if (currentBox !== targetBox) {
      animateViewBoxChange(currentBox, targetBox, 300);
    }
  });
  
  
  function zoomToCountry(countryId) {
    const country = document.getElementById(countryId);
    const bbox = country.getBBox();
    
    // Add some padding
    const padding = 10;
    const viewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
    
    svg.setAttribute("viewBox", viewBox);
  }
  document.addEventListener("click", function (event) {
    if (svg.getAttribute("viewBox") === euViewBox && event.target.classList.contains("EU")) {
      zoomToCountry(event.target.id)
    } else if (svg.getAttribute("viewBox") === naViewBox && event.target.classList.contains("NA")){
      zoomToCountry(event.target.id)
    }
  });
});
