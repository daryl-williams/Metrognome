
let chimes = new Tone.AMSynth();

let synthJSON = {
  "harmonicity": 3.999,
  "oscillator": {
    "type": "square"
  },
  "envelope": {
    "attack": 0.03,
    "decay": 0.3,
    "sustain": 0.7,
    "release": 0.8
  },
  "modulation" : {
    "volume" : 12,
    "type": "square6"
  },
  "modulationEnvelope" : {
    "attack": 2,
    "decay": 3,
    "sustain": 0.8,
    "release": 0.1
  }
};

chimes.set(synthJSON);

// Create effects.
let effect1 = new Tone.PitchShift();
let effect1JSON = {
  "pitch": 2,
  "windowSize": 0.04,
  "delayTime": 0.03,
  "feedback": 0.5,
  "wet": 0.5
};
effect1.set(effect1JSON);

// Make connections.
chimes.connect(effect1);
effect1.connect(Tone.Master);

export { chimes }; 

