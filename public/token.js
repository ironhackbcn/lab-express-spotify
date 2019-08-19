const SpotifyWebApi = require('spotify-web-api-node')
// change IDs
const clientId = '824498a937f84c16a775c9886da'
const clientSecret = 'f5a69719739847b38e911fad37'
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
})

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token'])
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error)
  })

module.exports = spotifyApi
