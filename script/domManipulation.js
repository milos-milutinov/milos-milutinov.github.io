/* funkcija koja kreira div sa potrebnim podacima */

var getCurrentWrapper = document.getElementById("wrapper");
var allCars = document.getElementById("allCars");

function createCarNameElement(brand) {
  var carNameElement = document.createElement("p");
  carNameElement.setAttribute("class", "car-name");
  carNameElement.textContent = "Car brand: " + brand;
  return carNameElement;
}

function createCarYearElement(year) {
  var carYearElement = document.createElement("p");
  carYearElement.setAttribute("class", "car-year");
  carYearElement.textContent = "First registered: " + year;
  return carYearElement;
}

function createCarImageElement(imageUrl) {
  var carImageElement = document.createElement("img");
  carImageElement.setAttribute("class", "car-image");
  carImageElement.setAttribute("src", imageUrl);
  return carImageElement;
}

function createCar(imageUrl, brand, year) {
  var carDiv = document.createElement("div");
  carDiv.setAttribute("class", "car");
  var image = createCarImageElement(imageUrl);
  carDiv.append(image);
  var carName = createCarNameElement(brand);
  carDiv.append(carName);
  var carYear = createCarYearElement(year);
  carDiv.append(carYear);

  return [image, carName, carYear, carDiv];
}

function createCarElement(car) {
  var car = createCar(car.url, car.brand, car.year);
  allCars.append(car[3]);
}

function callFetch() {
  fetch("./cars.json")
    .then((response) => response.json())
    .then((json) => {
      let cars = getCarsFromLocalStorage();
      if (cars !== null) {
        for (let i = 0; i < cars.length; i++) {
          json.cars.push(cars[i]);
        }
      }
      for (let i = 0; i < json.cars.length; i++) {
        createCarElement(json.cars[i]);
      }
    });
}

callFetch();

