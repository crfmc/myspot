import React, { useState, useEffect } from 'react';

const code = window.location.search.split('=')[1];

console.log(localStorage.getItem('access_token'));


const Loader = () => {
    return (
        <p>Loading...</p>
    )
}


export const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    
        async function getData() {
            return await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${code}`,
                    "Content-Type": "application/json",
                    Host: "api.spotify.com"
                }});
        }

        getData().then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data);
        }).catch((e) => {
            console.log('error: ', e);
        })

    }, []);


    return <h1>Hi there!</h1>
    return data === null ? <Loader /> : <div>{data}</div>
}