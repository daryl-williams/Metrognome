
// -------- SteelPan ---------------------------------------

let steelpan = new Tone.Synth();

let synthJSON = {
  "oscillator": {
    "type": "fatcustom",
    "partials" : [0.2, 1, 0, 0.5, 0.1],
    "spread" : 40,
    "count" : 3
  },
  "envelope": {
    "attack": 0.001,
    "decay": 1.6,
    "sustain": 0,
    "release": 1.6
  }
};

steelpan.set(synthJSON);

// make connections
steelpan.connect(Tone.Master);

export { steelpan };

