/**
 * Metronome.js
 *
 * metronome:/client/js/metronome/makegrid.js
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

import { metronome } from "../metronome/index.js";

export function makeGrid(sequence) {

  //console.log('metronome:/client/js/metronome/makegrid.js: sequence =', sequence);

  if (document.getElementById('metronome-measures-grid') !== null) {

    document.getElementById('metronome-measures-grid').innerHTML = '';

    let song_grid = document.getElementById('metronome-measures-grid');

    let number_of_measures = sequence.length;
    //console.log('metronome:/client/js/metronome/makegrid.js: number_of_measures =', number_of_measures);

    let time_signature = metronome.time_signature;
    console.log('metronome:/client/js/metronome/makegrid.js: time_signature =', time_signature);

    for (let measure=0; measure<sequence.length; measure++) {
      //console.log('metronome:/client/js/metronome/makegrid.js: sequence['+measure+'] =', sequence[measure]);

      let measure_number = parseInt(measure, 10) + 1;
      let measure_container = document.createElement('div');
      measure_container.id = 'measure-' + measure_number;
      measure_container.className = 'measure';
      measure_container.setAttribute('data-type', 'measure');

      let number_of_beats = parseInt(sequence[measure].length, 10);
      //console.log('metronome:/client/js/metronome/makegrid.js: number_of_beats =', number_of_beats);

      if (number_of_beats === 4) {
        measure_container.className += " measure-common-time";
      }
      else if (number_of_beats === 3) {
        measure_container.className += " measure-three_quarter-time";
      }
      else {
        console.log('metronome:/client/js/metronome/makegrid.js: ERROR unsupported time signature =', metronome.time_signature);
      }

      song_grid.appendChild(measure_container);

      for (let beat=0; beat<number_of_beats; beat++) {
        let beat_value = sequence[measure][beat][0].beat;
        //console.log('metronome:/client/js/metronome/makegrid.js: beat['+beat+'] =', beat_value);
        let beat_number = parseInt(beat, 10) + 1;
        //console.log('metronome:/client/js/metronome/makegrid.js: beat_number =', beat_number);

        let beat_div = document.createElement('div');
        let id = 'measure-' + measure_number + '-beat' + beat_number;
        beat_div.id = id;
        beat_div.className = 'beat measure' + measure_number + '-beat' + beat_number;
        beat_div.innerHTML = beat_number;

        if (time_signature == '4/4') {
          beat_div.classList.add('beat-common-time');
        }
        else if (time_signature == '3/4') {
          beat_div.classList.add('beat-3qt-time');
        }
//if (beat === 1) {
//  beat_div.classList.remove('beat-3qt-time');
//  beat_div.classList.add('beat-3qt1-time');
//}

        measure_container.appendChild(beat_div);
      }
    }
    song_grid = null;
  }
}

