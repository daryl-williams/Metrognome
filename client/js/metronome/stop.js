/**
 * Metronome
 *
 * metronome:/client/js/metronome/stop.js
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

export function stop() {
    const [bar, beat, sixteenths] = Tone.Transport.position.split(':');
    console.log('metronome:/client/js/metronome/stop.js:stop(): TRANSPORT POSITION BEAT=', beat);

    let measure = parseInt(bar, 10) + 1;

    if (document.getElementById('metronome-startstop-button') !== null) {
      document.getElementById('metronome-startstop-button').innerText = 'Start';
    }

    const current_measure = document.getElementById('measure-' + measure);
    console.log('metronome:/client/js/metronome/stop.js:stop(): CURRENT_MEASURE=', current_measure);
    if (current_measure !== null) { 
      current_measure.classList.toggle('current-measure');
    }

    if (this.instrument.type === 'samples') {
      this.player.stop();
      Tone.Transport.stop();
    }
    else {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      Tone.Transport.position = 0;
      //this.synth.dispose();
    }
}

// eof
