import Element from "./element.js";
import VisitDentist from "./visit-dentist.js";
import VisitTherapist from "./visit-therapist.js";
import VisitCardiologist from "./visit-cardiologist.js";
import DoctorApiService from "./doctor-api-service.js";

const doctorsList = ['Dentist', 'Therapist', 'Cardiologist'];

export default class VisitForm extends Element {
  constructor(onSuccess) {
    super();
    this.onSuccess = onSuccess;
  }

  selectDoctor(selectValue) {
    const doctor = {
      dentist: new VisitDentist(),
      therapist: new VisitTherapist(),
      cardiologist: new VisitCardiologist(),
    };
    return doctor[selectValue];
  }

  attachListeners() {
    this.select.addEventListener("change", (e) => {
      this.checkFormFields();
      const formFields = this.selectDoctor(e.target.value.toLowerCase());
      this.createVisitBtn.before(formFields.render());
    });
    this.formElem.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendVisitData();
    });
  }

  checkFormFields() {
    const formGroupsNodes = this.formElem.querySelectorAll(".form-group");
    if (formGroupsNodes.length > 3) {
      formGroupsNodes[3].remove();
    }
  }

  sendVisitData = async () => {
    const visitData = { doctor: this.select.value };
    const inputs = [...this.formElem.querySelectorAll("input")];
    inputs.forEach((input) => {
      const key = input.id;
      const value = input.value;
      visitData[key] = value;
    });
    const visit = new DoctorApiService();
    const card = await visit.createCard(visitData);
    this.onSuccess(card);
  };

  render() {
    const selectDoctor = doctorsList
        .map(value => `<option value="${value}">${value}</option>`
            .replace(',',':'))
        .join("");

    this.formElem = document.createElement("form");
    this.formElem.innerHTML = `
        <select class="form-select" required>
            <option selected disabled value="">Open to choose the doctor</option>
        </select>
        <div class="form-group mt-2">
            <label for="name">Name and Surname</label>
            <input id="name" required class="form-control" name="name" placeholder="Type your name...">
        </div>
        <div class="form-group">
            <label for="purpose">Purpose</label>
            <input id="purpose" required class="form-control" name="purpose" placeholder="Type purpose...">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input id="description" required class="form-control" name="description" placeholder="Type description...">
        </div>
        <button type="submit" class="btn btn-primary mt-2">Create</button>
        `;
    const selectOptions = this.formElem.querySelector(".form-select");
    selectOptions.innerHTML +=(selectDoctor)
    this.select = selectOptions;

    this.createVisitBtn = this.formElem.querySelector(".btn");
    this.attachListeners();
    return this.formElem;
  }
}
