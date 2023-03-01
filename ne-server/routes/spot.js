
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

// Instatiate wrapper
let spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: process.env.REDIRECTURI
});



const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'streaming'
];
module.exports.api = spotifyApi;


/** Login route used for authenticating user and granting read permissions */
module.exports.login = (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
}

module.exports.callback = (req, res) => {
    (req, res) => {
        const error = req.query.error;
        const code = req.query.code;
        const state = req.query.state;
    
        if (error) {
            console.error('Callback error', error);
            res.send(`Callback error: ${error}`);
            return;
        }
        
        spotifyApi.authorizationCodeGrant(code).then((data) => {
            // Get access token and its expiration/refresh time from data.body
            const { access_token, refresh_token, expires_in } = data.body;
            
            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.table({
                'access': access_token,
                'refresh': refresh_token,
                'expires': expires_in
            });

            // setInterval( async () => {
            //     const data = await spotifyApi.refreshAccessToken();
            //     const access_token = data.body.access_token;
            // }, expires_in / 2 * 1000);


        }).catch((error) => {
            console.error('Error getting tokens', error);
            res.send(`Error getting tokens: ${error}`);
        })
    }
}
