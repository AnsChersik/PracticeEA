export function createButton(text) {
    const btn = document.createElement('button')
    btn.textContent = text
    btn.classList.add('btn')
    return btn
}