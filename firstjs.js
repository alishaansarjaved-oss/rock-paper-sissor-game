let modeBtn = document.querySelector("#mode");
let mode ="light";
modeBtn.addEventListener('click',() => {
   if (mode === "light") {
       mode = "dark";
       document.querySelector("body").style.backgroundColor = "black";
   } else {
       mode = "light";
       document.querySelector("body").style.backgroundColor = "white";
   }
   console.log("mode is changed to " + mode);
});