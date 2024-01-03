import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    if (!key) {
        throw new Error("Key must be provided to useLocalStorage hook");
    }

    const readValueFromLocalStorage = () => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValueFromLocalStorage);

    useEffect(() => {
        try {
            const valueToStore = storedValue !== undefined ? JSON.stringify(storedValue) : null;
            if (valueToStore !== null) {
                localStorage.setItem(key, valueToStore);
            }
        } catch (error) {
            console.error("Error setting item in local storage:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;
