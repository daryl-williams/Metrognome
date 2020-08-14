
// -------- Piano

let piano = new Tone.PolySynth(Tone.Synth, {
  "volume" : -5,
  "oscillator" : {
    "partials" : [1, 2, 5],
  },
  "portamento" : 0.006
}).toDestination();

export { piano };

