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
      if (document.getElementById('number-of-measures') !== null) {
        if (document.getElementById('number-of-measures').value === '') {
          // Empty number-of-measures.
          if (document.getElementById('number-of-measures.error-reason') !== null) {
            document.getElementById('number-of-measures.error-reason').innerHTML = 'required field';
          }
          return;
        }
        else {
          const number_of_measures = parseInt(document.getElementById('number-of-measures').value, 10);
          //console.log('metronome:/client/js/events/form-handler.js: number of measures =', number_of_measures);

          const time_signature = document.getElementById('time-signature').value;
          //console.log('metronome:/client/js/events/form-handler.js: time_signature =', time_signature);

          const select = document.getElementById('metronome-sound-select');
          const instrument_name = select.value;
          //console.log('metronome:/client/js/events/form-handler.js: instrument_name =', instrument_name);
          const selected_option = select.options[select.selectedIndex];
          const instrument_soundtype = selected_option.parentElement.label;

          const bpm = document.getElementById('beats-per-minute').value;
          //console.log('metronome:/client/js/events/form-handler.js: bpm =', bpm);

          metronome.bpm = bpm;
          metronome.time_signature = time_signature;
          metronome.number_of_measures = number_of_measures;

          let time_signature_array = time_signature.split('/');
          //console.log('metronome:/client/js/events/form-handler.js: time_signature_array =', time_signature_array);

          let sequence = [];

          for (let i=0; i<number_of_measures; i++) {
            sequence[i] = [];
            for (let j=0; j<time_signature_array[0]; j++) {
              //sequence[i][j] = {
              //  beat: j
              //};
              sequence[i][j] = [{
                beat: j
              }];
              //for (let k=0; k<time_signature_array[0]; k++) {
              //  sequence[i][j][k] = {};
              //}
            }
          }
          console.log('metronome:/client/js/events/form-handler.js: sequence =', sequence);
          metronome.makeGrid(sequence);

          let obj = {
            bpm: bpm,
            instrument: {
              name: instrument_name, 
              type: instrument_soundtype, 
            },
            time_signature: time_signature,
            number_of_measures: number_of_measures,
            time_signature_array: time_signature_array,
            sequence: sequence,
          }
          metronome.start(obj);
        }
      }
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

