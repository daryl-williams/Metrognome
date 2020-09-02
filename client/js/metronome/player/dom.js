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

//if (event.beatNumber) {
//console.log('metronome:/client/js/metronome/makegrid.js: EVENT.BEATNUMBER =', event.beatNumber);
//}

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

  let current_beat_id = 'measure-' + event.measureNumber + '-beat' + event.beatNumber;
  if (document.getElementById(current_beat_id) !== null) {
    let current_beat = document.getElementById(current_beat_id);
    console.log('metronome:/client/js/metronome/play.js:dom(): CURRENT_BEAT =', current_beat);
    current_beat.style.backgroundColor = 'pink';
  }

  }, time);
}

// eof
