import React, { useState, useEffect } from 'react';

import './kit-search.css';

const KitSearch = () => {
    const [kitInput, setKitInput] = useState('');
    const [shippingCode, setShippingCode] = useState('Enter a kit ID to see your shipping code');
    const [matchingKits, setMatchingKits] = useState([]);

    const fetchKit = async () => {
        if (kitInput.length > 1) {
            try {
                const queryParams = `?kitInput=${kitInput}`;
                const response = await fetch(`http://localhost:9000/kitSearch/filter${queryParams}`);
                console.log(response);
                if (response.status === 404) {
                    console.log(response);
                    setShippingCode('Invalid Kit Label');
                } else {
                    const responseObject = await response.json();
                    setMatchingKits(responseObject);
                    setShippingCode('Shipping Tracking Code: ' + responseObject[0].shipping_tracking_code);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <>
            <input
                placeholder="Enter kit label"
                value={kitInput}
                onChange={(e) => setKitInput(e.target.value)}
            />
            <button onClick={fetchKit}> Search/Autocomplete </button>
            {matchingKits.length > 1 && matchingKits.map((kit, index) => (
                <div
                    className="dropdown"
                    onClick={() => {
                        setKitInput(kit.label_id)
                    }}>
                    <br />
                    <l1 key={index}>{kit.label_id}</l1>
                </div>
            ))}
            <p>{shippingCode}</p>
        </>
    )
}

export { KitSearch } 