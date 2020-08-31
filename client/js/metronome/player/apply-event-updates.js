/**
 * The code below comes from an online article by Nicolò Andronio
 * titled "Easily play a song track in JavaScript using Tone.js Transport"
 * and avaiable at:
 *
 * https://www.andronio.me/2019/04/24/easily-play-a-song-track-in-javascript-using-tone-js-transport/
 *
 * The code snippets from that article are published under the MIT License.
 */

'use strict';

const SequenceEvent = {
  measureNumber: 0,
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
