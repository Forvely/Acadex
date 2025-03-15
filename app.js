const defViewBox = "0.34389990089197225 0.34389990089197225 701 299.98145193260655";
const euViewBox = "275 20 80 80"
const naViewBox = "0 0 140 145"



document.addEventListener("DOMContentLoaded", function () {
  const france = document.getElementById("FR"); // Example for France
  const bbox = france.getBBox();
  
  console.log(`France X: ${bbox.x}, Y: ${bbox.y}`);
  console.log(`Width: ${bbox.width}, Height: ${bbox.height}`);
  let svg = document.getElementById("world-map");
  function updateHover() {
    const euCountries = document.querySelectorAll(".EU");
    
    // Remove old event listeners by cloning the elements
    euCountries.forEach((el) => {
      let newEl = el.cloneNode(true);
      el.replaceWith(newEl);
    });
    
    const newEuCountries = document.querySelectorAll(".EU");
    // Change change country colours to same on hover when in world view
    if (svg.getAttribute("viewBox") === defViewBox) {
      console.log("if")
      newEuCountries.forEach((country) => {
        country.addEventListener("mouseover", () => {
          newEuCountries.forEach((el) => (el.style.fill = "#c99aff"));
        });
        
        country.addEventListener("mouseout", () => {
          newEuCountries.forEach((el) => (el.style.fill = ""));
        });
      });
    }
    // Only hovered country changes colour 
    else if (svg.getAttribute("viewBox") == euViewBox){
      console.log("else")
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
    if (event.target.classList.contains("EU")) {
      targetBox = euViewBox;
    } else if (event.target.classList.contains("NA")) {
      targetBox = naViewBox;  
    }
    const currentBox = svg.getAttribute("viewBox");
    animateViewBoxChange(currentBox, targetBox, 300);
  });
  const padding = 10;
  const FRviewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
  svg.setAttribute("viewBox", FRviewBox);
});
