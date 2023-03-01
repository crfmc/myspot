const { api : spotifyApi } = require('./spot');

module.exports = (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    spotifyApi.authorizationCodeGrant(code).then((data) => {
        // Get access token and its expiration/refresh time from data.body
        const { access_token, refresh_token, expires_in } = data.body;
        
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        async function getData() {
            const me = await spotifyApi.getMe();
            const userId = me.body.id;
            const { body } = await spotifyApi.getMyTopTracks()
            return body.items.map(d => d.name)
        };

        getData()
        .then(data => {
            res.redirect('http://localhost:3000');
        });



    }).catch((error) => {
        console.error('Error getting tokens', error);
        res.send(`Error getting tokens: ${error}`);
    })

    // if (error) {
    //     console.error('Callback error', error);
    //     res.send(`Callback error: ${error}`);
    //     return;
    // }
    // else {
    //     console.log('it worked!')
    // }
}