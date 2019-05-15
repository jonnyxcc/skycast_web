# SkyCast Website
Source code for Skycast weather site, live version at https://lit-bayou-85112.herokuapp.com/

To run at locally, download the repository. Get an API key from https://darksky.net/dev and replace [YOUR_API_KEY] in routes/index.js with your API Key. Using node, run npm install on the main directory, and node app to run.

To run, this website requires a Mongo Database running locally.

Unfortunately, the Google geolocator API is no longer free to use which causes issues. This branch has been left untouched, to see a working version with the only available city being Chicago, check out the branch geolocator_fix.