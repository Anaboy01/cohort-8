import { useState } from 'react'

/**
 * useLocalStorage
 * ---------------
 * A drop-in replacement for useState that automatically persists its value
 * in the browser's localStorage.
 *
 * @param {string} key          – localStorage key to read/write
 * @param {*}      initialValue – fallback value when nothing is stored yet
 *
 * Returns:
 *   [storedValue, setValue] – behaves identically to useState
 *
 * Example:
 *   const [theme, setTheme] = useLocalStorage('theme', 'dark')
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: could not read key "${key}"`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      // Allow functional updates (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
