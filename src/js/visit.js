import Element from "./element.js";
import DoctorApiService from "./doctor-api-service.js";
import Modal from "./modal.js";
import EditForm from "./edit-form.js";

export default class Visit extends Element {
  constructor(name, id, doctor, visitDetails) {
    super();
    this.name = name;
    this.id = id;
    this.doctor = doctor;
    this.object = visitDetails;
  }

  showVisitDetails() {
    const detailToShow = Object.entries(this.object)
      .map((visitObjKeys) =>
        `<p class="card-text">${visitObjKeys}</p>`.replace(",", ": ")
      )
      .join("");

    let detailToShowContainer = this.createElement("div", [
      "details-container",
      "mb-2",
    ]);
    detailToShowContainer.innerHTML = detailToShow;
    this.editBtn.insertAdjacentElement("beforebegin", detailToShowContainer);
    return detailToShowContainer;
  }

  attachListeners() {
    const showMore = this.visitCard.querySelector(".js-showMore-btn");
    const closeBtn = this.visitCard.querySelector(".btn-close");
    this.editBtn = this.visitCard.querySelector(".js-edit-btn");
    closeBtn.addEventListener("click", () => {
      const toDelCard = confirm("Are you sure you want to delete this card?");
      if (toDelCard) {
        const del = new DoctorApiService();
        del.deleteCard(this.id).then((res) => {
          const card = document.querySelector(".card");
          const nextCard = card.nextElementSibling;
          if (!nextCard) {
            this.noItems.classList.remove("hide");
          }
          this.visitCard.remove();
        });
      }
    });

    this.editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const newEditForm = new EditForm(
        this.doctor,
        this.name,
        this.object,
        this.id
      );
      let editVisitModal = new Modal({
        headerTitle: "Edit Visit Details",
        body: newEditForm.render(),
      });
      document.body.append(editVisitModal.render());

      const form = document.querySelector(".edit-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        [this.object, this.name] = newEditForm.getUpdatedVisitData();
        let updatedObjectToPut = {
          ...this.object,
          ...{ name: this.name, doctor: this.doctor },
        };
        this.visitCard.querySelector(".card-title").innerText = this.name;
        const visit = new DoctorApiService();
        await visit.amendCard(updatedObjectToPut, this.id);
        editVisitModal.close();

        const details = this.visitCard.querySelector(".details-container");
        if (details) {
          details.remove();
          this.showVisitDetails();
        }
      });
    });

    showMore.addEventListener("click", () => {
      let detailToShowContainer =
        this.visitCard.querySelector(".details-container");
      if (!detailToShowContainer) {
        detailToShowContainer = this.showVisitDetails();
        showMore.innerText = "Show Less";
      } else {
        showMore.innerText = "Show More";
        detailToShowContainer.remove();
      }
    });
  }

  render() {
    this.visitCard = this.createElement("div", ["card", "shadow"]);
    this.visitCard.innerHTML = `
        <div class="card-body">
            <button type="button" class="btn-close"></button>
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">doctor: ${this.doctor}</p>
            <a href="#" class="btn btn-outline-success js-edit-btn">Edit</a>
            <a href="#" class="btn btn-outline-primary js-showMore-btn">Show More</a>
        </div>
  `;
    this.noItems = document.querySelector(".js-noItems");
    if (this.noItems) {
      this.noItems.classList.add("hide");
    }
    this.attachListeners();
    return this.visitCard;
  }
}
