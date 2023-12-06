// sessionStorage //////////////////////
export function getSessionStorage(key) { //gets deleted when browser tab is closed
    try {
        const item = window.sessionStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
        return undefined
    } catch (error) {
        return undefined
    }
}

export function setSessionStorage(key, value) {
    try {
        const stringValue = JSON.stringify(value)
        window.sessionStorage.setItem(key, stringValue)
        return value
    } catch (error) {
        console.error(error.message)
    }
}

// localStorage //////////////////
export function getLocalStorage(key) { //gets deleted when browser history/cache is cleared
    try {
        const item = window.localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
        return undefined
    } catch (error) {
        return undefined
    }
}

export function setLocalStorage(key, value) {
    try {
        const stringValue = JSON.stringify(value)
        window.localStorage.setItem(key, stringValue)
        return value
    } catch (error) {
        console.error(error.message)
    }
}

export function removeLocalStorage(key) {
    try {
        window.localStorage.setItem(key, null)
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(error.message);
    }
}