import { useState } from "react"

export function useLocalStorage (key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue 
        } catch (error) {
            return initialValue
        }
    })
    
    const setValue = value => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error.message)
        }
    }
    return [storedValue, setValue]
}

export function useSessionStorage (key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue 
        } catch (error) {
            return initialValue
        }
    })
    
    const setValue = value => {
        try {
            setStoredValue(value)
            window.sessionStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error.message)
        }
    }
    return [storedValue, setValue]
}

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