"use strict";
function getJsonSwaggerStructure(titre, host, protocol) {
    let jsonSwagger = {
        "swagger": "2.0",
        "info": {
            "title": titre,
            "description": "",
            "version": "1.0.0"
        },
        "host": host,
        "schemes": [
            protocol
        ],
        "produces": [
            "application/json"
        ]
    };
    return jsonSwagger;
}
exports.getJsonSwaggerStructure = getJsonSwaggerStructure;
let filter = {
    "in": "query",
    "name": "$filter",
    "description": " Filtre sur les enregistrements ",
    "required": false,
    "type": "string"
};
let select = {
    "in": "query",
    "name": "$select",
    "description": "Les propriétés à retourner ",
    "required": false,
    "type": "string"
};
let count = {
    "in": "query",
    "name": "$count",
    "description": "Le nombre d'enregistrements ",
    "required": false,
    "type": "boolean",
    "enum": [true, false]
};
let skip = {
    "in": "query",
    "name": "$skip",
    "description": "Le nombre d'enregistrements à passer ",
    "required": false,
    "type": "integer"
};
let top = {
    "in": "query",
    "name": "$top",
    "description": "Le nombre maximum d'enregistrements",
    "required": false,
    "type": "integer"
};
let expand = {
    "in": "query",
    "name": "$expand",
    "description": "Une sous-collection à retourner",
    "required": false,
    "type": "string"
};
let orderby = {
    "in": "query",
    "name": "$orderby",
    "description": "Le tri des enregistrements",
    "required": false,
    "type": "string"
};
function getDefaultParametersODATA() {
    return [filter, select, count, top, skip, expand, orderby];
}
exports.getDefaultParametersODATA = getDefaultParametersODATA;
function getSwaggerGet(collectionName, schemaCollection, params) {
    let _get = {
        "summary": "GET " + collectionName,
        "description": "GET " + collectionName,
        "tags": [collectionName],
        "parameters": params || [],
        "responses": {
            "200": {
                "description": "a définir",
                "schema": {
                    "type": "array",
                    "items": schemaCollection
                }
            },
            "default": {
                "description": "error",
            }
        }
    };
    return _get;
}
exports.getSwaggerGet = getSwaggerGet;
function getSwaggerPost(collectionName, schemaCollection) {
    let post = {
        "summary": "POST " + collectionName,
        "description": "POST " + collectionName,
        "tags": [collectionName],
        "parameters": [
            {
                "in": "body",
                "name": "body",
                "description": "objet ",
                "required": true,
                "schema": schemaCollection
            }
        ],
        "responses": {
            "200": {
                "description": "a définir",
            },
            "default": {
                "description": "error",
            }
        }
    };
    return post;
}
exports.getSwaggerPost = getSwaggerPost;
function getSwaggerDeleteById(collectionName) {
    let _delete = {
        "summary": "DELETE " + collectionName,
        "description": "DELETE " + collectionName,
        "tags": [collectionName],
        "parameters": [
            {
                "name": "key",
                "in": "path",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "a définir",
            },
            "default": {
                "description": "error",
            }
        }
    };
    return _delete;
}
exports.getSwaggerDeleteById = getSwaggerDeleteById;
function getSwaggerPatch(collectionName, schemaCollection) {
    let patch = {
        "summary": "PATCH " + collectionName,
        "description": "PATCH " + collectionName,
        "tags": [collectionName],
        "parameters": [
            {
                "name": "key",
                "in": "path",
                "required": true,
                "type": "string"
            },
            {
                "in": "body",
                "name": "body",
                "description": "objet ",
                "required": true,
                "schema": schemaCollection
            }
        ],
        "responses": {
            "200": {
                "description": "a définir",
            },
            "default": {
                "description": "error",
            }
        }
    };
    return patch;
}
exports.getSwaggerPatch = getSwaggerPatch;
function getSwaggerGetById(collectionName) {
    let _get = {
        "summary": "GET " + collectionName,
        "description": "GET " + collectionName,
        "tags": [collectionName],
        "parameters": [select,
            {
                "name": "key",
                "in": "path",
                "required": true,
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "a définir",
            },
            "default": {
                "description": "error",
            }
        }
    };
    return _get;
}
exports.getSwaggerGetById = getSwaggerGetById;
function getSwaggerPut(collectionName, schemaCollection) {
    let put = {
        "summary": "PUT " + collectionName,
        "description": "PUT " + collectionName,
        "tags": [collectionName],
        "parameters": [
            {
                "name": "key",
                "in": "path",
                "required": true,
                "type": "string"
            },
            {
                "in": "body",
                "name": "body",
                "description": "objet ",
                "required": true,
                "schema": schemaCollection
            }
        ],
        "responses": {
            "200": {
                "description": "a définir",
            },
            "default": {
                "description": "error",
            }
        }
    };
    return put;
}
exports.getSwaggerPut = getSwaggerPut;
