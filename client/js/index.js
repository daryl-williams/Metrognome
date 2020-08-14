/**
 * Metrognome.js
 *
 * metrognome:/js/index.js
 *
 * Copyright (C) 2020  Daryl P. Williams
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

import { events } from './events/index.js';
//import { metronome } from './metronome/index.js';

window.onload = function() {

  //console.log('metronome:/js/index.js:window.onload(): >>> this =', this);

  if (document.getElementById('number-of-measures') !== null) {
    document.getElementById('number-of-measures').addEventListener("click", (event) => {
      if (document.getElementById('number-of-measures.error-reason') !== null) {
        document.getElementById('number-of-measures.error-reason').innerHTML = '';
      }
    });
  }

  // Evant handler for Metronome Stop/Start button clicks.
  if (document.getElementById('metronome-startstop-button') !== null) {
    document.getElementById('metronome-startstop-button').addEventListener('click', events.formHandler);
  }
  
  // Display the Metronome Beats per Minute value in the bpm-output field.
  if (document.getElementById('beats-per-minute') !== null && document.getElementById('bpm-output') !== null) {
    const slider = document.getElementById('beats-per-minute');
    const output = document.getElementById('bpm-output');
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
    };
  }
}

