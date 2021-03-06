function deleteCar() {
  localStorage.removeItem("cars");
  alert("Cars successfully deleted");

  location.reload();
}
