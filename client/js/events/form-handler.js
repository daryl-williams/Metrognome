/**
 * Metrognome.js
 *
 * metrognome:/client/js/events/form-handler.js
 *
 * Copyright (C) 2020 Daryl P. Williams
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

import { metronome } from "../metronome/index.js";

export function formHandler(event) {
  event.preventDefault();
  event.stopPropagation();
  //console.log('metronome:/client/js/events/form-handler.js: event =', event);

  // Evant handler for Metronome Stop/Start button clicks.
  if (document.getElementById('metronome-startstop-button') !== null) {
    if (event.target.innerText === 'Start') {
      event.target.innerText ='Stop';
/*
      const number_of_measures;
      if (document.getElementById('number-of-measures') !== null) {
        if (document.getElementById('number-of-measures').value === '') {
          // Empty number-of-measures.
          if (document.getElementById('number-of-measures.error-reason') !== null) {
            document.getElementById('number-of-measures.error-reason').innerHTML = 'required field';
          }
          return;
        }
        else {
          number_of_measures = parseInt(document.getElementById('number-of-measures').value, 10);
          //console.log('metronome:/client/js/events/form-handler.js: number of measures =', number_of_measures);
        }
      }
*/

      const time_signature = document.getElementById('time-signature').value;
      //console.log('metronome:/client/js/events/form-handler.js: time_signature =', time_signature);
      metronome.sequence.timeSignature = time_signature;
      metronome.sequence.timeSignatureArray = time_signature.split('/');
      //console.log('metronome:/client/js/events/form-handler.js: time_signature_array =', time_signature_array);

      const select = document.getElementById('metronome-sound-select');
      const instrument_name = select.value;
      //console.log('metronome:/client/js/events/form-handler.js: instrument_name =', instrument_name);
      metronome.sequence.instrument = instrument_name;

      const selected_option = select.options[select.selectedIndex];
      const instrument_soundtype = selected_option.parentElement.label;
      metronome.sequence.instrumentType = instrument_soundtype;

      const bpm = document.getElementById('beats-per-minute').value;
      //console.log('metronome:/client/js/events/form-handler.js: bpm =', bpm);
      metronome.sequence.beatsPerMinute = bpm;

      let sequence_value = [];
      let measures_beats = [];

      if (document.getElementById('sequence-array') !== null) {
        // We'll build a series of measure and beats based on the value of the sequence-array textarea.
        let beat_values = [];
        sequence_value = document.getElementById('sequence-array').value.split('\n');

        for (let m=0; m<sequence_value.length-1; m++) {
         // console.log('\nmetronome:/client/js/events/form-handler.js: MEASURE #', m+1);
          const notes = sequence_value[m].split(' ');
          let beat_cntr = 0;
          for (let b=0; b<notes.length; b++) {
            const chunks = notes[b].split('/');
            let beat = chunks[1];
            if (beat === '4') {
              beat_values.push(1);
            }
            else if (beat === '8') {
              beat_values.push(.50);
            }
            else if (beat === '16') {
              beat_values.push(.25);
            }
            let duration = beat_values[beat_values.length-1];
            //console.log('metronome:/client/js/events/form-handler.js: duration =', duration);
            beat_cntr += duration;
            //console.log('metronome:/client/js/events/form-handler.js: 0.beat_cntr =', beat_cntr);

          }
          // Assign measure beats.
          measures_beats[m] = beat_cntr;
        }
        //console.log('metronome:/client/js/events/form-handler.js: measures_beats =', measures_beats);
        metronome.sequence.measureBeats = measures_beats;
        //let ts = measures_beats[0]; // Yes, it's very arbitrary.
        //metronome.sequence.timeSignature = ts + '/4';
        //console.log('metronome:/client/js/events/form-handler.js: metronome =', metronome);
        metronome.sequence.timeSignatureArray = metronome.sequence.timeSignature.split('/');
      }
      else {
        // We'll build a series of measure and beats based on the user input.
        number_of_measures = document.getElementById('number-of-measures');
        for (let i=0; i<number_of_measures; i++) {
          sequence_value[i] = [];
            for (let j=0; j<time_signature_array[0]; j++) {
              sequence_value[i][j] = [{
                beat: j
              }];
            }
        }
      }
      //console.log('metronome:/client/js/events/form-handler.js: sequence_value =', sequence_value);

      metronome.sequence.value = sequence_value;
      metronome.sequence.numberOfMeasures = sequence_value.length - 1;

      metronome.makeGrid(sequence_value);

      metronome.start();
    }
    else if (event.target.innerText === 'Stop') {
      //event.target.innerText ='Start';
      metronome.stop();
    }
    else {
      console.log('metronome:/client/js/events/form-handler.js: ERROR unknown stopstart button innerText=', event.target.innerText);
    }
  }
}

