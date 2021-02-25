
function main() {
    setTimeout(() => {
        let user = JSON.parse(localStorage.getItem("currentUSER"));
        document.getElementById("yourCars").textContent = user.user_name;

    }, 500);
}


main();
