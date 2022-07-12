import Modal from "./modal.js";
import LoginForm from "./login-form.js";
import VisitForm from "./visit-form.js";
import Visit from "./visit.js";
import FilterCards from "./cardFilter.js";
import DoctorApiService from "./doctor-api-service.js";

const btnLogin = document.querySelector(".nav__logo-btn");
const isLogged = JSON.parse(localStorage.getItem("userData"));
const createVisitBtn = document.querySelector(".js-visit-btn");
const searchWrapper = document.querySelector(".search-wrapper");

if (isLogged) {
  btnLogin.remove();
  displayCards()
  createVisitBtn.classList.add("visible");
  searchWrapper.classList.add("visible");
} else {
  btnLogin.addEventListener("click", () => {
    let loginModal;
    const newForm = new LoginForm(() => loginModal.close());
    loginModal = new Modal({
      headerTitle: "Sign in",
      body: newForm.render(),
    });
    document.body.append(loginModal.render());
  });
}

createVisitBtn.addEventListener("click", () => {
  let visitModal;
  const newVisitForm = new VisitForm((visitData) =>{
    const cardsContainer = document.querySelector(".main__cards");
    const { name, id, doctor, ...details } = visitData;
    const createCard = new Visit(name, id, doctor, details);
    cardsContainer.append(createCard.render());
    const allCards = document.querySelectorAll(".card")
    const filter = new FilterCards(allCards);
    filter.render()
    visitModal.close();
  })
  visitModal = new Modal({
    headerTitle: "Create Visit",
    body: newVisitForm.render(),
  });
  document.body.append(visitModal.render());
});

async function displayCards () {
  const apiService = new DoctorApiService();
  const cards = await apiService.getCards()
  const Filter = cards.map((card) => {
    const cardsContainer = document.querySelector(".main__cards");
    const { name, id, doctor, ...details } = card;
    const createCard = new Visit(name, id, doctor, details);
    cardsContainer.append(createCard.render());
    return createCard.visitCard;
  });
  const filter = new FilterCards(Filter);
  filter.render();
}
export {displayCards}