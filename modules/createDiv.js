export function createDiv(text) {
    const div = document.createElement('div')
    div.className = text
    div.classList.add('conteinerDiv')
    return div
}