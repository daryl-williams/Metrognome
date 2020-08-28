/**
 * Metronome
 *
 * metronome:/client/js/metronome/index.js
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

import { makeGrid } from './makegrid.js';

import { kick }     from './synths/kick.js';
import { conga }    from './synths/conga.js';
import { piano }    from './synths/piano.js';
import { cymbal }   from './synths/cymbal.js';
import { tomtom }   from './synths/tomtom.js';
import { steelpan } from './synths/steelpan.js';

import { player } from './player/simple-player.js';
import { play } from './play.js';
import { start } from './start.js';
import { stop } from './stop.js';
import { applyEventUpdates } from './apply-event-updates.js';

class Metronome {
  gain;
  synth;
  buffer;
  samples = {
    bell:      '/samples/bell.mp3',
    banjo:     '/samples/banjo.mp3',
    click:     '/samples/click.mp3',
    woodblock: '/samples/woodblock.mp3',
  };
  beat_colors = ['white', 'blue', 'red', 'green'];
  synths = {
    kick,
    piano,
    conga,
    cymbal,
    tomtom,
    steelpan,
  };
  sound_file = '';
  current_buffer = '';
  instrument = {
    type: 'synths',
    name: 'kick',
  };
  makeGrid = makeGrid;

  constructor() {
    //console.log('metronome:/client/js/metronome/index.js:Metrognome:constructor(): this =', this);
    this.buffer = {};
    this.play = play;
    this.player = player;
    this.start = start;
    this.stop = stop;
    this.applyEventUpdates = applyEventUpdates;
  }
}

let metronome = new Metronome();

export { metronome };

// eof
