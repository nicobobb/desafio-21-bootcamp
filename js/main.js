document.addEventListener("DOMContentLoaded", () => {
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
          <div class="info__container"><h3>Nombre:</h3><p>${user.name}</p> </div>
          <div class="info__container"><h3>Dirección:</h3><p> ${user.address}</p> </div>
          <div class="info__container"><h3>Email:</h3><p> ${user.email}</p> </div>
          <div class="info__container"><h3>Tipo de Seguro:</h3><p> ${user.insurance}</p> </div>
          <div class="info__container"><h3>Comentario:</h3><p> ${user.comment}</p> </div>
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

  const storedUsers = localStorage.getItem("Users");
  userObject = JSON.parse(storedUsers) || [];

  renderUsers();

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
});
