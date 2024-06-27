"use client"
import React from 'react';
import handleClick from './HandleClick';
import parseJsonString from './Parser';

const SerialPortComponent: React.FC = () => {
    const handleDataReceived = (data: string) => {
        console.log("Data received in callback:", data);
        const parsedData = parseJsonString(data);
        console.log("Parsed data:", parsedData);
        // Tukaj lahko nadalje obdelate parsedData
    };

    const handleButtonClick = () => {
        handleClick(handleDataReceived);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>
                Open Serial Port
            </button>
        </div>
    );
};

export default SerialPortComponent;
