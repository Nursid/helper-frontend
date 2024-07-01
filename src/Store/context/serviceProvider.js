import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
    const [items, setItems] = useState(null);

    return (
        <ServiceContext.Provider value={{ items, setItems }}>
            {children}
        </ServiceContext.Provider>
    );
};
