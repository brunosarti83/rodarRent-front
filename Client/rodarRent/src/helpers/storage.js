
export function getSessionStorage (key) {
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

export function setSessionStorage (key, value) {
    try {
        const stringValue = JSON.stringify(value)
        window.sessionStorage.setItem(key,stringValue)
        return value
    } catch (error) {
        console.error(error.message)
    }
}


export function getLocalStorage (key) {
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

export function setlocalStorage (key, value) {
    try {
        const stringValue = JSON.stringify(value)
        window.localStorage.setItem(key,stringValue)
        return value
    } catch (error) {
        console.error(error.message)
    }
}