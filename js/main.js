const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");
const insuranceInput = document.getElementById("insurance");
const commentInput = document.getElementById("comment");
const listUsers = document.getElementById("listUsers");

let userObject = [];

const renderUsers = () => {
  listUsers.innerHTML = "";

  userObject.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.dataset.userId = user.id;

    userDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Dirección:</strong> ${user.address}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Tipo de Seguro:</strong> ${user.insurance}</p>
        <p><strong>Comentario:</strong> ${user.comment}</p>
        <button class="deleteBtn" data-user-id="${user.id}">Eliminar</button>
      `;

    listUsers.appendChild(userDiv);
  });

  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = e.target.dataset.userId;
      deleteUser(userId);
    });
  });
};

const addUserObject = (newUser) => {
  const newUserId = Date.now().toString();
  newUser.id = newUserId;
  userObject.push(newUser);
  localStorage.setItem("Users", JSON.stringify(userObject));
  console.log("Todos los usuarios:", userObject);
  renderUsers();
};

const deleteUser = (userId) => {
  const index = userObject.findIndex((user) => user.id === userId);
  userObject.splice(index, 1);
  localStorage.setItem("Users", JSON.stringify(userObject));
  renderUsers();
};

document.addEventListener("DOMContentLoaded", () => {
  const storedUsers = localStorage.getItem("Users");
  userObject = JSON.parse(storedUsers);
  renderUsers();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = {
    name: nameInput.value,
    address: addressInput.value,
    email: emailInput.value,
    insurance: insuranceInput.value,
    comment: commentInput.value,
  };
  console.log(newUser);
  addUserObject(newUser);
  form.reset();
});
