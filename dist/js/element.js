export default class Element {
    createElement(elemType, classNames, text) {
        const element = document.createElement(elemType);
        if (text) { element.textContent = text; }
        element.classList.add(...classNames);
        return element
    }
}