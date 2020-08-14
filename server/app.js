/**
 * Metrognome application.
 * Metrognome is basically a playground for learning Tone.js
 * 
 * metrognome:/server/app.js 
 *
 * Copyright (C) 2019-2020  Daryl P. Williams
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

/**
 * Routes Definitions
 */
module.exports = function(app, express) {
  app.get("/", (req, res) => {
		console.log('app.locals.document_root =', app.locals.document_root);
    //res.status(200).send('Hello World!');
		const index_file = app.locals.document_root + '/index.html';
    res.status(200).sendFile(index_file);
  });

	return module;
}

