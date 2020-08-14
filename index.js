/**
 * Metrognome application.
 * Metrognome is basically a playground for learning Tone.js
 * 
 * metrognome:/index.js 
 *
 * Copyright (C) 2020  Daryl P. Williams
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

// Required External Modules.
const express = require("express");
const path = require("path");

const cors = require('cors');
const helmet = require('helmet');
//const morgan = require('morgan');
//const bodyParser = require('body-parser');

// App Variables.
const app = express();
const env = process.env.NODE_ENV;
const iface = '0.0.0.0';
const port = process.env.PORT || 9090;

// Set our static path. Note: this has to come before
// we declare our routes if we want it to work. We also
// set our document_root to app.locals.document_root;
// it is available to the routing modules.
app.locals.document_root = path.dirname(__dirname) + '/metrognome/client';
console.log('metrognome:/index.js: DOCROOT =', app.locals.document_root);
app.use(express.static(app.locals.document_root));

// App Configuration.
app.use(cors());
app.use(helmet());

// Web Server configuration.
let webserver = undefined;
if (true) {
  webserver = require('http').createServer(app);
}
else {
  webserver = require('https').Server({
     key: fs.readFileSync('/home/ubuntu/.letsencrypt/privkey.pem'),
    cert: fs.readFileSync('/home/ubuntu/.letsencrypt/cert.pem'),
      ca: fs.readFileSync('/home/ubuntu/.letsencrypt/chain.pem')
  }, app);
}

// Make sure we have an error handler for the Web server.
webserver.on('error', function(err) {
  console.log('metrognome:/index.js: ERROR initializing web server, error =', err);
  return;
});

// Web Server Activation.
webserver.listen(port, iface, () => {
  console.log('metrognome:/index.js: listening on interface: ' + iface + ' at port: ' + port + "\n");
});

require('./server/app.js')(app, express);

