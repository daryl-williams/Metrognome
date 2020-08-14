/**
 * Metrognome.js
 *
 * metrognome:/client/js/events/index.js
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
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

import { formHandler } from "./form-handler.js";

class Events {
  constructor() {
    //console.log('metronome:/client/js/events/index.js:constructor() this =', this);
    if (!Events.instance) {
      this.formHandler = formHandler;
    }
  }
}

var events = new Events();
//console.log('metronome:/client/js/events/index.js: events =', events);

export { events };

