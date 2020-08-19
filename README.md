# Metrognome

Metrognome is a node.js app is a playground for me to learn how to work
with the Tone.js Web Audio framework.

To that end I building a simple (to begin) metronome using Tone.js.
The intended purpose being to display a grid of user defined measures
and beats that get highlighted as the metronome plays the designated
beats. The app features will include user input for the number of
measures, the sime signature and the beats per minute. Additionally
the user should be able to select the sound source to be either a
note sample from an external file or a synth instrument. 

Now I confess that despite the many excellent examples and demos
I am still having a hard time figureing out how to do some of these
things with Tone.js

## Getting Started

These instructions will get a copy of the project up and running on your
local machine for development and testing purposes. See deployment for
notes on how to deploy the project on a live system.

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Application Structure

- `index.js`      - The entry point to our application.
- `client/`       - This folder contains the app's front end code.
- `client/js`     - This folder contains the app's front end javascript code.
- `client/js/metronome` - This folder contains the Metronome object code.
- `server/app.js` - This file requires the routes we'll be using in the application.

# TODO

- Figure out how to sync beat highliting and beat sound.
- Figure out how to get sound samples working.
- Figure out how to use volume to accent downbeat.
- Much more to come...

# Describe Metrognome Object Class

The Metrognome app is a Node.js/Express application and is expressed as a JavaScript
class based object with start, play and stop public methods. While most of the code
is currently client-side code, there is a small server app waiting for another time.
The Metrognome itself is mostly client side based.

The project's directory structure is a purely arbitrary self-describing directory
structure representing the client/server parts of the application with the Node/Express
http server for the front end. The skeltal directory structure:

/index.js              # HTTP Server and application entry
/client/               # Start of client directories, i.e. the app's DocumentRoot
/client/js/index.js    # Initial setup and event registration.
/client/js/events/     # User events handlers.
/client/js/metronome/  # Metronome object project directory.
/client/js/lib/        # Open source utility libraries Tone.js, etc.
/server/               # Start of server side directories.
/server/app.js         # Server application entry point.
/server/routes         # Server application routes.

