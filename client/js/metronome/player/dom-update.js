/**
 * Metrognome
 */

import { metronome } from "../../metronome/index.js";

'use strict';

/**
 * @param {boolean} ramp If true, tempo will ramp up/down to the given value over 1 second, otherwise it will change instantly.
 */
export function dom (time, event) {

  Tone.Draw.schedule(() => {
    // Do drawing or DOM manipulation here...

  // Remove previous highlighted measure.
  let last_measure_number = parseInt(event.measureNumber, 10) - 1;
  let last_measure_id = 'measure-' + last_measure_number;
  //console.log('metronome:/client/js/metronome/play.js:dom(): last_measure_id =', last_measure_id);

  if (event.measureNumber > 1 && document.getElementById(last_measure_id) !== null) {
    metronome.sequence.lastMeasure = document.getElementById(last_measure_id);
    metronome.sequence.lastMeasure.classList.remove('current-measure');
  }

  // Highlight the current measure.
  let current_measure_id = 'measure-' + event.measureNumber;
  console.log('metronome:/client/js/metronome/play.js:dom(): current_measure_id =', current_measure_id);

  if (document.getElementById(current_measure_id) !== null) {
    metronome.sequence.currentMeasure = document.getElementById(current_measure_id);
    metronome.sequence.currentMeasure.classList.add('current-measure');
  }

  if (event.measureNumber > metronome.sequence.numberOfMeasures) {
    if (document.getElementById('metronome-startstop-button') !== null) {
      document.getElementById('metronome-startstop-button').innerHTML = 'Start';
    }
  }

  const measure_number = event.measureNumber;
  const measure_ndx = measure_number - 1;

  const bpm = metronome.sequence.beatsPerMinute;

  // Update the beat divs.
  for (let i=0, ilen=bpm; i<ilen; i++) {
    let beat_ndx = i;
    let beat_number = beat_ndx + 1;
    let current_beat_id = 'measure-' + event.measureNumber + '-beat' + beat_number;

    if (beat_number > 1) {
      let last_beat_id = 'measure-' + event.measureNumber + '-beat' + (beat_number - 1);
      if (document.getElementById(last_beat_id) !== null) {
        document.getElementById(last_beat_id).classList.remove('current-beat');
      }
    }

    if (document.getElementById(current_beat_id) !== null) {

      const vf = new Vex.Flow.Factory({
        renderer: {elementId: current_beat_id, width: 500, height: 200}
      });
      const score = vf.EasyScore();
      const system = vf.System();
      system.addStave({
        voices: [
          score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
          score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
        ]
      }).addClef('treble').addTimeSignature('4/4');
      vf.draw();

      //const beat_ndx = beat_number - 1;
      let beat_values = metronome.sequence.jsn[measure_ndx];
      let current_beat = document.getElementById(current_beat_id);
      current_beat.innerHTML = beat_values[beat_ndx];
      current_beat.classList.add('current-beat');
      current_beat.style.border = 'thin solid green';
      console.log('metronome:/client/js/metronome/play.js:dom(): CURRENT_BEAT =', current_beat);
    }
  }

  }, time);
}

// eof
