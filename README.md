# Metrognome

Metrognome is meant to be a playground for me to learn how to work
with the Tone.js Web Audio framework, and is a work in progress.

The app uses the Tone.js library to build a simple metronome that
accepts user input to set the number of measures, the sime signature
and the number of beats per minute. The user input is then used to
display a grid consisting of the defined measures and beats which
get highlighted as the metronome plays the designated beats.

Additionally the user should be able to select the sound source from
from a menu that can include external sample files or a synth instrument. 

Now I confess that despite the many excellent examples and demos
I am still having a hard time figureing out how to do some of these
things with Tone.js

![Metrognome Scrrenshot](/images/metrognome-screenshot.png)

## Getting Started

These instructions will get a copy of the project up and running on your
local machine for development and testing purposes. See deployment for
notes on how to deploy the project on a live system.

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Application Structure

```
  Metrognome/
  ├── README.md
  ├── client
  │   ├── css
  │   ├── favicon.ico
  │   ├── index.html
  │   └── js
  │       ├── events
  │       ├── index.js
  │       ├── lib
  │       └── metronome
  │           ├── apply-event-updates.js
  │           ├── index.js
  │           ├── makegrid.js
  │           ├── play.js
  │           ├── samples
  │           ├── sequence-parser.js
  │           ├── start.js
  │           ├── stop.js
  │           └── synths
  ├── index.js
  ├── package-lock.json
  ├── package.json
  └── server
      └── app.js
```

- `index.js`      - The entry point to our application.
- `client/`       - This folder contains the app's front end code.
- `client/js`     - This folder contains the app's front end javascript code.
- `client/js/metronome` - This folder contains the Metronome object's class code.
- `client/js/metronome/synths` - This folder contains the synth descrition files.
- `client/js/metronome/samples` - This folder contains the sample files.
- `server/app.js` - This file requires the routes we'll be using in the application.

The Metrognome app is a Node.js/Express application and is expressed as a JavaScript
class based object with start, play and stop public methods. While most of the code
is currently client-side code, there is a small server app waiting for another time.
The Metrognome itself is mostly client side based.

The project's directory structure is a purely arbitrary self-describing directory
structure representing the client/server parts of the application with the Node/Express
http server for the front end. The skeltal directory structure:

## STILL TODO

- Figure out how to sync beat highliting and beat sound.
- Figure out how to get sound samples working.
- Figure out how to use volume to accent downbeat.
- Much more to come...

