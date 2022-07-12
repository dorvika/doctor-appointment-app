import Visit from "./visit.js";

export default class VisitCardiologist extends Visit {
  constructor() {
    super();
  }

  render() {
    this.cardiologistFormFields = this.createElement("div", ["form-group"]);
    this.cardiologistFormFields.innerHTML = `
      <div class="form-group">
        <label for="pressure">Pulse pressure</label>
        <input id="pressure" required class="form-control" name="pressure" placeholder="Type pulse pressure...">
      </div>
      <div class="form-group">
        <label for="diseases">Past diseases of the cardiovascular system</label>
        <input id="diseases" required class="form-control" name="diseases" placeholder="Type diseases...">
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input id="age" required class="form-control" name="age" placeholder="Type your age...">
      </div>
      `;
    return this.cardiologistFormFields;
  }
}
