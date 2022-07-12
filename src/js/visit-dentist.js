import Visit from "./visit.js";

export default class VisitDentist extends Visit {
  constructor() {
    super();
  }

  render() {
    this.dentistFormFields = this.createElement("div", ["form-group"]);
    this.dentistFormFields.innerHTML = `
        <label for="date">Date of last visit</label>
        <input id="date" required class="form-control" name="date" placeholder="Type date...">`;
    return this.dentistFormFields;
  }
}
