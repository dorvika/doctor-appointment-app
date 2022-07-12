import Visit from "./visit.js";

export default class VisitTherapist extends Visit {
  constructor() {
    super();
  }

  render() {
    this.therapistFormFields = this.createElement("div", ["form-group"]);
    this.therapistFormFields.innerHTML = `
        <label for="age">Age</label>
        <input id="age" required class="form-control" name="age" placeholder="Type your age...">`;

    return this.therapistFormFields;
  }
}
