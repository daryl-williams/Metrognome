/**
 * Metronome
 *
 * metronome:/client/js/metronome/start.js
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

import { SequenceParser } from './sequence-parser.js';

export function start(obj) {
  console.log('metronome:/client/js/metronome/start.js:start(): start obj =', obj);

  this.gain = new Tone.Gain(0.5);

  this.synth = new Tone.Synth().toDestination();
  this.synth.chain(this.gain);
  this.synth.volume.value = -10;

  this.buffer.bell =  new Tone.Buffer(this.samples.bell);
  this.buffer.banjo = new Tone.Buffer(this.samples.banjo);
  this.buffer.click = new Tone.Buffer(this.samples.click);
  this.buffer.woodblock = new Tone.Buffer(this.samples.woodblock);

  this.player = new Tone.Player(this.buffer.banjo).toDestination();
  this.player.debug = true;

  //let sound_file = './sounds/' + document.getElementById('metronome-sound-select').value.toLowerCase() + '.mp3';
  //let sound_file = './samples/' + obj.instrument.name.toLowerCase() + '.mp3';
  //console.log('metronome:/client/js/metronome/start.js:start(): SOUND_FILE =', sound_file);

//Tone.Transport.bpm.value = obj.bpm;;
  console.log('metronome:/client/js/metronome/start.js:start(): BPM =', obj.bpm);

  let time_signature = obj.time_signature;
  let time_signature_array = obj.time_signature.split('/');
  console.log('metronome:/client/js/metronome/start.js:start(): time_signature_array =', time_signature_array);

  let new_sequence = [];

  for (let m=0, len=obj.sequence.length; m<len; ++m) {
    //console.log('metronome:/client/js/metronome/start.js:start(): BEAT LEN =', song.body[m].length);
    let measure = "";
    for (let beat=0, blen=obj.time_signature_array[0]; beat<blen; ++beat) {
      measure += obj.sequence[m][beat] =  'C4/' + 4 + ' ';
      //console.log('metronome:/client/js/metronome/start.js:start(): BEAT =', beat);
    }
    measure = measure.trim();
    //console.log('metronome:/client/js/metronome/start.js:start(): MEASURE =', measure);
    new_sequence.push(measure);
  }
  console.log('metronome:/client/js/metronome/start.js:start(): new_sequence =', new_sequence);

  const sequenceParser = new SequenceParser(obj.bpm, time_signature_array);
  this.play(sequenceParser.parse(new_sequence));
}

// eof
