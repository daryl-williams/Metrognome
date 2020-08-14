/**
 * Metrognome
 *
 * metrognome:/client/js/metronome/sequence-parser.js
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

class SequenceParser {

  constructor (tempoBpm, timeSignatureArray) {
    if (tempoBpm && timeSignatureArray) {
      this.initialTempo = { value: tempoBpm, unit: 'bpm' };
      this.initialTimeSignature = { numerator: timeSignatureArray[0], denominator: timeSignatureArray[1] };
    }
  }

  parse (textMeasures) {
    const result = [];
    let firstEvent = true;

    for (const textMeasure of textMeasures) {
      const event = { };

      if (firstEvent) {
        event.newTempo = this.initialTempo;
        event.newTimeSignature = this.initialTimeSignature;
        firstEvent = false;
      }

      event.measure = this.parseTextMeasure(textMeasure);
      result.push(event);
    }
    return result;
  }

  parseTextMeasure (textMeasure) {
    const notes = textMeasure.split(' ')
      .filter(textNote => !!textNote)
      .map(textNote => this.parseTextNote(textNote));
      return { notes };
  }

  parseTextNote (textNote) {
    const chunks = textNote.split('/');
    const isNote = (chunks[0] !== 'rest');
    return {
      type: isNote ? 'note' : 'rest',
      name: isNote ? chunks[0] : null,
      duration: chunks[1] + 'n'
    };
  }
}

export { SequenceParser };

// eof
