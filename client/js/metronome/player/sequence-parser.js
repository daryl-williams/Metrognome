/**
 * ./client/js/metronome/player/sequence-player.js
 *
 * The code below comes from an online article by Nicolò Andronio
 * titled "Easily play a song track in JavaScript using Tone.js Transport"
 * and is avaiable at:
 *
 * https://www.andronio.me/2019/04/24/easily-play-a-song-track-in-javascript-using-tone-js-transport/
 *
 * The code snippets from that article are published under the MIT License.
 */

'use strict';

class SequenceParser {
    constructor (tempoBpm, timeSignatureArray) {
        this.initialTempo = { value: tempoBpm, unit: 'bpm' };
        this.initialTimeSignature = { numerator: timeSignatureArray[0], denominator: timeSignatureArray[1] };
        this.measureCounter = 0;
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

            event.measureNumber = this.measureCounter + 1;
            this.measureCounter++;

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

export { SequenceParser }

