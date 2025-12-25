export function saveToLocalStorage(arr, name) {
    localStorage.setItem(name, JSON.stringify(arr))
}