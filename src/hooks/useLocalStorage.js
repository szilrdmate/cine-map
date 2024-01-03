import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Retrieve the stored item or use the initial value if none is stored
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to store the value
    const [value, setValue] = useState(initial);

    // Update local storage when the value changes
    useEffect(() => {
        if (value && value.length > 0) {
            console.log("setItem in localStorage")
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
