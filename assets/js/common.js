let faBars = document.querySelector(".g-header-fa-bars");

faBars.addEventListener("click", function() {
  let navBars = document.querySelector(".g-header-navbars");
  if(navBars.style.display === "none" || navBars.style.display == "" || navBars.style.display == null || navBars.style.display == undefined) {
    navBars.style.display = "inline-block";
  } else {
    navBars.style.display = "none";
  }
})