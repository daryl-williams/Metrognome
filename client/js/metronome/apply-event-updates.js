/**
 * Metronome
 *
 * metronome:/client/js/metronome/apply-event-updates.js
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

const SequenceEvent = {
  measure: {
    notes: [{
      type: 'rest' | 'note',
      name: '',
      duration: ''
    }]
  },
  newTempo: {
    value: 0,
    unit: 'bpm'
  },
  newTimeSignature: {
    numerator: 0,
    denominator: 0
  }
};

/**
 * If the given event has new tempo and/or time signatures, apply them to the Transport immediately.
 * @param {SequenceEvent} event
 * @param {boolean} ramp If true, tempo will ramp up/down to the given value over 1 second, otherwise it will change instantly.
 */
export function applyEventUpdates (event, ramp) {
  if (event.newTempo && event.newTempo.unit === 'bpm') {
    if (ramp) {
      Tone.Transport.bpm.rampTo(event.newTempo.value, 1);
    }
    else {
      Tone.Transport.bpm.value = event.newTempo.value;
    }
  }

  if (event.newTimeSignature) {
    Tone.Transport.timeSignature = [
      event.newTimeSignature.numerator,
      event.newTimeSignature.denominator
    ];
  }
}

// eof
