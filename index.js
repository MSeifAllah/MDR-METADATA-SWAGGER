"use strict";
const metadata_1 = require('./lib/metadata');
const docSwagger_1 = require('./lib/docSwagger');
exports.OdataTools = {
    metadata: metadata_1.metadata,
    docSwagger: docSwagger_1.buildDocSwagger
};
