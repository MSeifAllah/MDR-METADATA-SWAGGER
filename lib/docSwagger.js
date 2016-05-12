"use strict";
const toolsSwagger = require('./helper');
function getSwagger(nameSpace, modelName, schema, definitions, paths) {
    definitions[modelName] = schema;
    var ref = { "$ref": "#/definitions/" + modelName };
    paths["/data/mdr/" + nameSpace + "/odata/" + modelName] = {
        "get": toolsSwagger.getSwaggerGet(modelName, ref, toolsSwagger.getDefaultParametersODATA()),
        "post": toolsSwagger.getSwaggerPost(modelName, ref)
    };
    paths["/data/mdr/" + nameSpace + "/odata/" + modelName + "({key})"] = {
        "get": toolsSwagger.getSwaggerGetById(modelName),
        "put": toolsSwagger.getSwaggerPut(modelName, ref),
        "delete": toolsSwagger.getSwaggerDeleteById(modelName),
        "patch": toolsSwagger.getSwaggerPatch(modelName, ref)
    };
}
function buildDocSwagger(models, nameSpace, req) {
    let jsonSwagger = toolsSwagger.getJsonSwaggerStructure("ODATA FOR " + nameSpace, req.headers["host"] || "localhost", req.protocol || "http");
    let paths = {};
    let definitions = {};
    for (let model in models)
        getSwagger(nameSpace, model, models[model], definitions, paths);
    jsonSwagger["paths"] = paths;
    jsonSwagger["definitions"] = definitions;
    return JSON.stringify(jsonSwagger);
}
exports.buildDocSwagger = buildDocSwagger;
