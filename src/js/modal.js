import Element from "./element.js";

const BODY_SCROLL = "modal-open";

class Modal extends Element {
  constructor({ headerTitle, body }) {
    super();
    this.headerTitle = headerTitle;
    this.body = body;
  }

  attachListeners() {
    document.body.addEventListener("click", (e) => {
      const closeBtn = this.modalDiv.querySelector(".btn-close");
      if (e.target === closeBtn || e.target === this.modalDiv) {
        this.close();
      }
    });
  }

  close() {
    this.backdrop.remove();
    document.body.classList.remove(BODY_SCROLL);
    this.modalDiv.remove();
  }

  renderBackdrop() {
    this.backdrop = this.createElement("div", ["modal-backdrop", "fade"]);
    document.body.append(this.backdrop);
  }

  animateShow() {
    requestAnimationFrame(() => {
      this.backdrop.classList.add("show");
      this.modalDiv.classList.add("show");
    });
  }

  render() {
    this.modalDiv = this.createElement("div", ["modal", "fade"]);
    this.modalDiv.style.display = "block";
    document.body.classList.add(BODY_SCROLL);
    this.modalDiv.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.headerTitle}</h5>
                        <button type="button" class="btn-close">
                        </button>
                    </div>
                    <div class="modal-body">    
                    </div>
                </div>
            </div>
        `;

    if (this.body) {
      this.modalDiv.querySelector(".modal-body").append(this.body);
    }
    this.renderBackdrop();
    this.attachListeners();
    this.animateShow();
    return this.modalDiv;
  }
}

export default Modal;
