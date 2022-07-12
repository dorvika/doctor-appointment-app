import Element from "./element.js";

class EditForm extends Element {
  constructor(doctor, name, object, id) {
    super();
    this.doctor = doctor;
    this.name = name;
    this.object = object;
    this.id = id;
  }

  renderChangableFields() {
    this.formChangableElements = document.createElement("div");
    Object.keys(this.object).forEach((key) => {
      this.formChangableElements.innerHTML += `
            <div class="form-group mt-2">
                <label for="${key}">${this.capitalizeFirstLetter(key)}</label>
                <input id="${key}" required class="form-control" name="${key}" value="${
        this.object[key]
      }">
            </div>
            `;
    });
    return this.formChangableElements;
  }

  capitalizeFirstLetter(str) {
    const capitalized = str.replace(/^./, str[0].toUpperCase());
    return capitalized;
  }

  getUpdatedVisitData() {
    Object.keys(this.object).forEach((field) => {
      const inputElem = this.formElem.querySelector(`#${field}`);
      this.object[field] = inputElem.value;
    });
    this.name = document.getElementById("name").value;
    return [this.object, this.name];
  }

  render() {
    this.formElem = document.createElement("form");
    this.formElem.classList.add("edit-form");
    this.formElem.innerHTML = `
            <div class="form-group mt-2">
                <label for="doctor">Doctor</label>
                <input id="doctor" class="form-control" name="doctor" placeholder="${this.doctor}"disabled>
            </div>
            <div class="form-group mt-2">
                <label for="name">Name and Surname</label>
                <input id="name" required class="form-control" name="name" value="${this.name}">
            </div>
            <button type="submit" class="btn btn-primary mt-2 btn__submit-changes">Submit Changes</button>
            `;
    this.changeDataBtn = this.formElem.querySelector(".btn");
    this.changeDataBtn.insertAdjacentElement(
      "beforebegin",
      this.renderChangableFields()
    );
    return this.formElem;
  }
}

export default EditForm;
