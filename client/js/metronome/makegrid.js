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

    for (let measure_ndx=0; measure_ndx<metronome.sequence.numberOfMeasures; measure_ndx++) {
      //console.log('metronome:/client/js/metronome/makegrid.js: sequence['+measure_ndx+'] =', sequence[measure_ndx]);

      let measure_number = parseInt(measure_ndx, 10) + 1;
      let measure_container = document.createElement('div');
      measure_container.id = 'measure-' + measure_number;
      measure_container.className = 'measure';
      measure_container.setAttribute('data-type', 'measure');

      //let number_of_beats = parseInt(metronome.sequence.measureBeats[measure_ndx]);
      let number_of_beats = parseInt(metronome.sequence.measureBeats[0]);
      //console.log('metronome:/client/js/metronome/makegrid.js: number_of_beats =', number_of_beats);

      if (number_of_beats === 1) {
        measure_container.className += " measure-common-time";
      }
      else if (number_of_beats === 2) {
        measure_container.className += " measure-double-time";
      }
      else if (number_of_beats === 3) {
        measure_container.className += " measure-3qt-time";
      }
      else if (number_of_beats === 4) {
        measure_container.className += " measure-common-time";
      }
      else {
        console.log('metronome:/client/js/metronome/makegrid.js: ERROR unsupported time signature =', metronome.timeSignature);
      }

      song_grid.appendChild(measure_container);

      for (let beat=0; beat<number_of_beats; beat++) {
        let beat_value = sequence[measure_ndx][beat][0].beat;
        //console.log('metronome:/client/js/metronome/makegrid.js: beat['+beat+'] =', beat_value);
        let beat_number = parseInt(beat, 10) + 1;
        //console.log('metronome:/client/js/metronome/makegrid.js: beat_number =', beat_number);

        let beat_div = document.createElement('div');
        let id = 'measure-' + measure_number + '-beat' + beat_number;
        beat_div.id = id;
        beat_div.className = 'beat measure' + measure_number + '-beat' + beat_number;
        beat_div.innerHTML = beat_number;

        if (metronome.sequence.timeSignature == '2/4') {
          beat_div.classList.add('beat-double-time');
        }
        else if (metronome.sequence.timeSignature == '3/4') {
          beat_div.classList.add('beat-3qt-time');
        }
        else if (metronome.sequence.timeSignature == '4/4') {
          beat_div.classList.add('beat-common-time');
        }
        measure_container.appendChild(beat_div);
      }

      let voice_div = document.createElement('div');
      //let id = 'measure-' + measure_number + '--note-' + note;
      //voice_div.id = id;
      voice_div.className = 'voice-div';
      measure_container.appendChild(voice_div);

      const notes = sequence[measure_ndx].split(' ');;

      for (let ndx=0; ndx<notes.length; ndx++) {
        //console.log('metronome:/client/js/metronome/makegrid.js: notes['+ndx+'] =', notes[ndx]);
        const chunk = notes[ndx].split('/');
        let note = chunk[0];
        let duration = chunk[1];
        //console.log('metronome:/client/js/metronome/makegrid.js: note =', note);
        //console.log('metronome:/client/js/metronome/makegrid.js: duration =', duration);

        let note_div = document.createElement('span');
        let id = 'measure-' + measure_number + '-note-' + note;
        note_div.id = id;
        note_div.className = 'voice measure' + measure_number + '-note-' + note;
        if (note === 'rest') {
          note_div.innerHTML = '_';;
        }
        else {
          note_div.innerHTML = note;
        }
        voice_div.appendChild(note_div);
      }
    }
    song_grid = null;
  }
}

