function checkWeather() {
  let myTemp = document.querySelector("#myTemp");
  console.log(myTemp);
  let temp = myTemp.value;

  console.log(temp);
  if (temp < 10) {
    console.log("it is freezing");
    body.style.backgroundColor = "gray";
    outer.style.backgroundColor = "black";
  } else if (temp >= 10 && temp < 20) {
    console.log("nice and pleasant weather");
    body.style.backgroundColor = "blue";
    outer.style.backgroundColor = "violet";
  } else if (temp >= 20 && temp < 30) {
    console.log("sunny and warm");
    body.style.backgroundColor = "green";
    outer.style.backgroundColor = "coral";
  } else if (temp > 35) {
    console.log("It is burning hot");
    body.style.backgroundColor = "crimson";
    outer.style.backgroundColor = "limegreen";
  }
}
