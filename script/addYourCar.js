function getCarsFromLocalStorage() {
  let cars = localStorage.getItem("cars");
  if (cars !== null) {
    return JSON.parse(cars);
  }
  return null;
}

function saveCarToLocalStorage(car) {
  let cars = getCarsFromLocalStorage();
  if (cars !== null) {
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));
  } else {
    localStorage.setItem("cars", JSON.stringify([car]));
  }
}
function insertCar() {
  let brand = document.getElementById("car-brand-input").value;
  let year = document.getElementById("car-year-input").value;
  let url = document.getElementById("car-url-input").value;
  if (brand === "" || year === "" || url === "") {
    return alert("You have to insert all values.");
  }
  let car = {
    brand,
    year,
    url,
  };
  saveCarToLocalStorage(car);
  alert("Your car is successfully added");
  location.reload();
}


