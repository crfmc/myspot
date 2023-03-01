import React, { useState, useEffect } from 'react';


const Loader = () => {
    return (
        <p>Loading...</p>
    )
}


export const App = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
    
        async function getData() {
            return await fetch('https://api.spotify.com/v1/me');
        }

        getData().then((res) => {
            return res
        }).then((data) => {
            console.log(data);
            // setData(data);
        }).catch((e) => {
            console.log('error: ', e);
        })

    }, []);



    return data === null ? <Loader /> : <div>{data}</div>
}