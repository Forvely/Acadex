document.addEventListener("DOMContentLoaded", function() {
  let svg = document.getElementById("world-map");
  if (!svg) {
      console.error("SVG element with ID 'world-map' not found");
    }
  document.addEventListener("click", function(event) {
      if (event.target.classList.contains("EU")) {
          svg.setAttribute("viewBox", `275 20 80 80`);
          console.log("EU was clicked");
        } else if (event.target.classList.contains("NA")){
          svg.setAttribute("viewBox", `0 0 140 145`);
          console.log("NA was clicked")
        } else {
          svg.setAttribute("viewBox", "0.34389990089197225 0.34389990089197225 701 299.98145193260655")
        }
  
    });
});



