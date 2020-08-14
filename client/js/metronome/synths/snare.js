
// -------- Snare Drum

let snare = new Tone.NoiseSynth({
  "volume" : -7,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.5,
    "sustain" : 0.01,
    "release" : 0.02
  },
  "filterEnvelope" : {
    "attack" : 0.001,
    "decay" : 0.1,
    "sustain" : 0.01,
    "release" : 0.2
  }
}).toMaster();


export { snare };

