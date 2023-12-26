document.addEventListener("mousemove", () => {
  localStorage.setItem("lastActvity", new Date());
});
document.addEventListener("click", () => {
  localStorage.setItem("lastActvity", new Date());
});

let timeInterval = setInterval(() => {
  let lastAcivity = localStorage.getItem("lastActvity");
  var diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
  var seconds = Math.floor(diffMs / 1000);
  var minute = Math.floor(seconds / 60);
  console.log(seconds + " sec and " + minute + " min since last activity");
  if (minute == 10) {
    console.log("No activity from last 10 minutes... Logging Out");
    clearInterval(timeInterval);
    //code for logout

    localStorage.setItem("user", null);
    sessionStorage.setItem("scribblesData", null);
    sessionStorage.setItem("drawersData", null);
    sessionStorage.setItem("selectedDrawer", null);
    sessionStorage.setItem("selectedScribble", null);
    sessionStorage.setItem("toBeMovedDrawer", null);
    sessionStorage.setItem("drawerToBeMoved", null);
    //loginURL()
  }
}, 1000);

function loginURL() {
  document.location.href = "http://localhost:5173/login";
}
