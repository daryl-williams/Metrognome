
// -------- Kick Drum

let kick = new Tone.Synth();

kick = new Tone.MembraneSynth({
  "volume" : -1,
  "envelope" : {
    "sustain" : 0.1,
    "attack" : 0.005,
    "decay" : 0.8
  },
  "octaves" : 5
}).toDestination();

export { kick };

