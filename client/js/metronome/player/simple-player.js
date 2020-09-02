/**
 * The code below comes from an online article by Nicolò Andronio
 * titled "Easily play a song track in JavaScript using Tone.js Transport"
 * and is avaiable at:
 *
 * https://www.andronio.me/2019/04/24/easily-play-a-song-track-in-javascript-using-tone-js-transport/
 *
 * The code snippets from that article are published under the MIT License.
 */

'use strict';

import { dom } from './dom.js';
import { applyEventUpdates } from './apply-event-updates.js';

class SimplePlayer {
  constructor () {
    this.synth = new Tone.Synth().toMaster();
    this.applyEventUpdates = applyEventUpdates;
  }

  /**
   * Use Tone.js Transport to play a series of notes encoded by the event list passed in input,
   * using the default ugly synthetic membrane sound.
   * @param {SequenceEvent[]} track
   */
  play (track) {
    const synth = this.synth;

    // We will use the Transport to schedule each measure independently. Given that we
    // inform Tone.js of the current tempo and time signature, the Transport will be
    // able to automatically interpret all measures and note durations as absolute
    // time events in seconds without us actually bothering
    let measureCounter = 0;
    let firstEvent = true;

    // Stop, rewind and clear all events from the transport (from previous plays)
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();

    for (const event of track) {
//console.log('metronome:/client/js/metronome/player/simple-player.js: event =', event);
      // The first event is always supposed to have new tempo and time signature info
      // so we should update the Transport appropriately
      if (firstEvent) {
        this.applyEventUpdates(event, false);
        firstEvent = false;
        event.beatNumber = 0;
      }

      // In the following callback, "time" represents the absolute time in seconds
      // that the measure we are scheduling is expected to begin at, given the current
      // tempo and time signature assigned to the Transport
      Tone.Transport.schedule((time) => {
        // Change the tempo if this event has a new tempo. Also do the same if a new time signatue is issued
        this.applyEventUpdates(event, true);

        // This contains the relative time of notes with respect to the
        // start of the current measure, in seconds
        let relativeTime = 0;

/*
console.log('metronome:/client/js/metronome/player/simple-player.js: BEAT_NUMBER =', event.beatNumber);
if (event.beatNumber === 0) {
  console.log('metronome:/client/js/metronome/player/simple-player.js: BEAT_NUMBER =', event.beatNumber);
  let duration = event.measure.notes[0].duration;
  let note_type = parseInt(duration.substring(0, duration.length-1), 10);
}

let beat_type = 0;

  if (note_type === 4) {
    beat_type = 1;
  }
  else if (note_type === 8) {
    beat_type = .5;
  }
  else if (note_type === 16) {
    beat_type = .25;
  }
*/

        for (const note of event.measure.notes) {
          const duration = note.duration;

          // If this is an actual note (as opposed to a rest), schedule the
          // corresponding sound to be played along the Transport timeline
          // after the previous notes in the measure have been played (hence the relativeTime)
          if (note.type === 'note') {
            synth.triggerAttackRelease(note.name, note.duration, time + relativeTime);

            // Update the DOM with the current measure and beat.
            dom(time, event);
          }

          // This is used to delay notes that come next by the correct amount
          relativeTime += Tone.Time(duration).toSeconds();

// Determine the current beat.
//if (event.beatNumber>=3) {
//  event.beatNumber = 1;
//}
//else {
//  event.beatNumber++;
//}
//console.log('metronome:/client/js/metronome/player/simple-player.js: event.beatNumber =', event.beatNumber);
//event.beatNumber++;


          // Update the DOM with the current measure and beat.
          dom(time, event);
        }

        // Update the DOM with the current measure and beat.
        dom(time, event);

      }, `${measureCounter}m`);

      measureCounter++;
    }
    Tone.Transport.start();
    Tone.Transport.context.resume();
  }
}

const player = new SimplePlayer();
export { player };

