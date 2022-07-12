import Element from "./element.js";
export default class FilterCards extends Element {
  constructor(cards) {
    super();
    this.cards = cards;
  }
  render() {
    const searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", (event) => {
      const value = event.target.value.toLowerCase();
      this.toFilter.forEach((card) => {
        const isVisible = card.name.toLowerCase().includes(value);
        card.element.classList.toggle("hide", !isVisible);
      });
    });
    this.toFilter = [...this.cards].map((card) => {
      const name = card.querySelector(".card-body .card-title").textContent
      return {name: name, element: card}
    });
  }
}