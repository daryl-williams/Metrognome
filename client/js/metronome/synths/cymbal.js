
let cymbal = new Tone.MetalSynth();

let synthJSON = {
  frequency  : 800 ,
  envelope  : {
   attack  : 0.001 ,
   decay  : 1.4 ,
   release  : 0.2
  }  ,
  harmonicity  : 5.1 ,
  modulationIndex  : 32 ,
  resonance  : 4000 ,
  octaves  : 1.5
};

cymbal.set(synthJSON);
cymbal.connect(Tone.Master);

export { cymbal };

