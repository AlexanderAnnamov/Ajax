window.addEventListener("DOMContentLoaded", () => {
  function req() {
    getResource("http://localhost:3000/people")
      .then((data) => createCards(data))
      .catch((err) => console.error(err));

    this.remove();
  }

  document
    .querySelector("button")
    .addEventListener("click", req, { once: true });

  async function getResource(url) {
    const res = await fetch(`${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function createCards(response) {
    response.forEach((item) => {
      let card = document.createElement("div");

      card.classList.add("card");

      let icon;
      if (item.sex === "male") {
        icon = "img/icons/mars.png";
      } else {
        icon = "img/icons/female.png";
      }

      card.innerHTML = `<img src="${item.photo}" alt="photo">
          <div class="name">${item.name} ${item.surname}</div>
          <div class="sex">
              <img src=${icon} alt="male">
          </div>
          <div class="age">${item.age}</div>`;
      document.querySelector(".app").appendChild(card);
    });
  }
});
