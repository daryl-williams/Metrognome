/**
 * Metronome
 *
 * metronome:/client/js/metronome/play.js
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

/**
 * Use Tone.js Transport to play a series of notes encoded by the event list passed in input,
 * using the default ugly synthetic membrane sound.
 * @param {SequenceEvent[]} track
 */
export function play(track) {
    console.log('metronome:/client/js/metronome/play.js:play(): track =', track);

    const total_measures = track.length - 1;

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

//    Tone.debug = true;
    Tone.Transport.debug = true;

    for (const event of track) {
      console.log('metronome:/client/js/metronome/play.js:play(): event of track =', event);

      //jsn.metronome.current_measure = measureCounter;
      this.current_measure = measureCounter;

      // The first event is always supposed to have new tempo and time signature info
      // so we should update the Transport appropriately
      if (firstEvent) {
        this.applyEventUpdates(event, false);
        firstEvent = false;
      }

      let measure_time = measureCounter + 'm';
      console.log('metronome:/client/js/metronome/play.js:play(): measure_time =', measure_time);

      // In the following callback, "time" represents the absolute time in seconds
      // that the measure we are scheduling is expected to begin at, given the current
      // tempo and time signature assigned to the Transport
      Tone.Transport.schedule((time) => {
        // This is a measure.
        let current_measure = parseInt(measure_time.substring(0, measure_time.length-1), 10) + 1;
        //console.log('metronome:/client/js/metronome/play.js:play(): current_measure =', current_measure);

        let current_measure_id = 'measure-' + current_measure;
        //console.log('metronome:/client/js/metronome/play.js:play(): current_measure_id =', current_measure_id);

        // Highlite the current measure by using the border property.
        //let dom_current_measure = document.getElementById('bar-container' + current_measure);
        let dom_current_measure = document.getElementById(current_measure_id);
        //console.log('metronome:/client/js/metronome/play.js:play(): dom_current_measure =', dom_current_measure);

        //let last_border = dom_current_measure.style.border;
        //  dom_current_measure.style.border = 'medium green solid';

        dom_current_measure.classList.add('current-measure');

        if (current_measure > 1) {
          // Un-Highlite the previous measure.
          let last_measure = current_measure - 1;
          let dom_last_measure = document.getElementById('measure-' + last_measure);
          dom_last_measure.classList.remove('current-measure');
        }

        // Change the tempo if this event has a new tempo. Also do the same if a new time signatue is issued
        this.applyEventUpdates(event, true);

        // This contains the relative time of notes with respect to the
        // start of the current measure, in seconds
        let relative_time = 0;

        let beat_ndx = 0;
        for (const note of event.measure.notes) {
          // This is a note within the measure.
          //console.log('metronome:/client/js/metronome/play.js:play(): NOTE =', note);

          const duration = note.duration;
          //console.log('metronome:/client/js/metronome/play.js:play(): DURATION =', duration);

          // If this is an actual note (as opposed to a rest), schedule the
          // corresponding sound to be played along the Transport timeline
          // after the previous notes in the measure have been played (hence the relative_time)
          if (note.type === 'note') {

            let last_beat;
            let current_beat = dom_current_measure.children[beat_ndx];

            if (beat_ndx === 0) {
//console.log('metronome:/client/js/metronome/play.js:play(): 0.CURRENT_BEAT =', current_beat.id);

Tone.Draw.schedule(() => {
  // Do drawing or DOM manipulation here...
  //console.log('metronome:/client/js/metronome/play.js:play(): TIME =', time);
  current_beat.classList.add('current-beat');
  console.log('metronome:/client/js/metronome/play.js:play(): 00.CURRENT_BEAT =', current_beat.id);
}, time);

              last_beat = current_beat;

              if (this.instrument.type === 'synths') {
                this.synth = this.synths[this.instrument.name];
                this.synth.volume.value = 0;
                //console.log('metronome:/client/js/metronome/play.js:play(): this.synth =', this.synth);
                //console.log('metronome:/client/js/metronome/play.js:play(): VOLUME =', this.synth.volume.value);
                this.synth.triggerAttackRelease(note.name, note.duration, time + relative_time);
              }
              else if (this.instrument.type === 'samples') {
                // WIP: setup sample file and player...
                console.log('metronome:/client/js/metronome/play.js:play(): INSTRUMENT TYPE =', this.instrument.type);
                console.log('metronome:/client/js/metronome/play.js:play(): THIS.PLAYER =', this.player);
                const buffer_name = this.current_buffer;
                console.log('metronome:/client/js/metronome/play.js:play(): buffer_name =', buffer_name);
                const current_buffer = this.buffer[buffer_name];
                console.log('metronome:/client/js/metronome/play.js:play(): CURRENT_BUFFER =', current_buffer);

                this.player.get(current_buffer);
                //this.player.restart();
                this.player.start();

                //const start_time = current_measure + ':0:0';
                //const stop_time = current_measure + ':4:0';
                //this.player.loopStart = start_time;
                //this.player.loopEnd   = stop_time;
                //this.player.loop = true;

                //if (this.player.state === 'stopped') {
                //  this.player.start();
                //  //this.player.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
                //  console.log('metronome:/client/js/util/metronome.js:play(): PLAYER =', this.player);
                //  console.log('metronome:/client/js/metronome/play.js:play(): PLAYER =', this.player);
                //}
              }
            }
            else {
//console.log('metronome:/client/js/metronome/play.js:play(): >0.CURRENT_BEAT =', current_beat.id);

//  //let last_beat_id = 'measure-' + current_measure + '-beat' + beat_ndx;
//  let last_beat_number = parseInt(current_beat.id.replace(/^measure-(.*)-beat(.*)$/, "$2"), 10) - 1;
//  let last_beat_id = 'measure-' + current_measure + '-beat' + last_beat_number;
//  last_beat = document.getElementById(last_beat_id);
//  console.log('metronome:/client/js/metronome/play.js:play(): >>>>> LAST_BEAT.ID =', last_beat.id + '\n');

  //last_beat.classList.remove('current-beat');

Tone.Draw.schedule(() => {
  // do drawing or DOM manipulation here
  //console.log('metronome:/client/js/metronome/play.js:play(): TIME =', time);
  console.log('metronome:/client/js/metronome/play.js:play(): >00.CURRENT_BEAT =', current_beat.id);
  setTimeout(() => {
    console.log('metronome:/client/js/metronome/play.js:play(): >>>>> TIMEOUT =', time + '\n');
    let beat_number = parseInt(current_beat.id.replace(/^measure-(.*)-beat(.*)$/, "$2"), 10);
    let classname = 'beat-' + beat_number;
    current_beat.classList.add(classname);
  }, 600);
}, time);

              if (this.instrument.type === 'synths') {
                this.synth = this.synths[this.instrument.name];
                this.synth.volume.value = -10;
                //console.log('metronome:/client/js/metronome/play.js:play(): this.synth =', this.synth);
                //console.log('metronome:/client/js/metronome/play.js:play(): VOLUME =', this.synth.volume.value);
                this.synth.triggerAttackRelease(note.name, note.duration, time + relative_time);
                this.synths.cymbal.triggerAttackRelease(note.name, note.duration, time + relative_time);
              }
              else if (this.instrument.type === 'samples') {
                // PENDING: setup sample file and player...
                console.log('metronome:/client/js/metronome/play.js:play(): PLAY SAMPLE =', this.instrument.type);
                const buffer_name = this.current_buffer;
                console.log('metronome:/client/js/metronome/play.js:play(): buffer_name =', buffer_name);
                const current_buffer = this.buffer[buffer_name];
                current_buffer.debug = true;
                console.log('metronome:/client/js/metronome/play.js:play(): CURRENT_BUFFER =', current_buffer);

                this.player.get(current_buffer);
                //this.player.restart();
                this.player.start();

                //this.player.loopStart = current_measure + ':0:0';
                //this.player.loopEnd   = current_measure + ':3:0';
                //const start_time = current_measure + ':0:0';
                //const stop_time = current_measure + ':4:0';
                //this.player.loop = true;
                //if (this.player.state === 'stopped') {
                //  this.player.start();
                //}
              }
            }
            beat_ndx++;
          }

          // This is used to delay notes that come next by the correct amount
          relative_time += Tone.Time(duration).toSeconds();
          //console.log('metronome:/client/js/metronome/play.js:play(): RELATIVE_TIME =', relative_time);
        }

        const [bar, beat, sixteenths] = Tone.Transport.position.split(':');

        if (current_measure > total_measures) {
          setTimeout((time) => {
//console.log('metronome:/client/js/metronome/play.js:play(): TRANSPORT POSITION =', Tone.Transport.position);
            let dom_last_measure = document.getElementById('measure-' + current_measure);
            if (dom_last_measure !== null) {
              dom_last_measure.classList.remove('current-measure');
            }

            if (document.getElementById('metronome-startstop-button') !== null) {
              document.getElementById('metronome-startstop-button').innerText = 'Start';
            }
          }, '2000');
        }
      }, measure_time);

      measureCounter++;
      //console.log('metronome:/client/js/metronome/play.js:play(): measureCounter =', measureCounter);
    }
    Tone.Transport.start();
    console.log('metronome:/client/js/metronome/play.js:play(): Tone.Transport Started =', Tone.Transport);
}

