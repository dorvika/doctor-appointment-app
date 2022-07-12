import Element from "./element.js";
import DoctorApiService from "./doctor-api-service.js"
import {displayCards} from "./index.js"

class LoginForm extends Element {
  constructor(onSuccess) {
    super();
    this.onSuccess = onSuccess;
  }

  showError(text) {
    this.error = this.createElement(
        "div",
        ["text-danger", "text-center", "mt-2"],
        `${text}`
    );
    this.formElem.password.after(this.error);
    return this.error;
  }

  attachListeners() {
    this.formElem.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.error) {
        this.error.remove();
      }
      if (!this.formElem.email.value || !this.formElem.password.value) {
        this.error = this.showError("Fields can't be empty!");
      } else {
        this.sendUserData()
      }
    });
  };

  sendUserData () {
    const userData = {
      email: this.formElem.email.value,
      password: this.formElem.password.value,
    };
    const login = new DoctorApiService();
    login.logIn(userData)
        .then(async response => {
          if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token)
        this.onSuccess();
        localStorage.userData = JSON.stringify(userData);
        const signInBtn = document.querySelector(".nav__logo-btn");
        signInBtn.remove();
        const createVisitBtn = document.querySelector(".js-visit-btn");
        const searchWrapper = document.querySelector(".search-wrapper");
        createVisitBtn.classList.add("visible");
        searchWrapper.classList.add("visible");
        displayCards()

      } else {
        this.error = this.showError("Incorrect username or password!");
      }
    })
  }

  render() {
    this.formElem = document.createElement("form");
    this.formElem.innerHTML = `
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" class="form-control" name="email" placeholder="Enter Email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" name="password" placeholder="Enter Password">
        </div>
        <button type="submit" class="btn btn-primary mt-2">Sign In</button>
        `;
    this.attachListeners();
    return this.formElem;
  }
}

export default LoginForm;
