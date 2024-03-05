const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");
const insuranceInput = document.getElementById("insurance");

let userObject = [];

const AddUserObject = (newUser) => {
    userObject.push(newUser);
    console.log("Todos los usuarios:", userObject);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
        name: nameInput.value,
        address: addressInput.value,
        email: emailInput.value,
        insurance: insuranceInput.value,
    };
    console.log(newUser);
    AddUserObject(newUser);
});
