const myButton = document.querySelector("#my-button");

myButton.addEventListener("click", moveInput);

const myDuck = document.querySelector("#my-duck");

let clicked = false;

function moveInput() {
  if (!clicked) {
    myInput.style.translate = "10px 20px";
    clicked = true;
  } else {
    myDuck.style.translate = "0px 0px";
    clicked = false;
  }
}

// const drawerButton = document.querySelector("#drawer-button");
// const sideDrawer = document.querySelector("#side-drawer");
// console.log(sideDrawer);
// let isOpen = false;
// drawerButton.addEventListener("click", openDrawer);

// function openDrawer() {
//   console.log("i am clicked");
//   if (!isOpen) {
//     // sideDrawer.style.transform = `translateX(200px)`;
//     sideDrawer.style.translate = "200px";
//     isOpen = true;
//   } else {
//     sideDrawer.style.translate = "-200px";
//     // sideDrawer.style.transform = `translateX(-200px)`;
//     isOpen = false;
//   }
// }
