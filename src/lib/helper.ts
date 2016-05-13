"use strict";



export function getJsonSwaggerStructure(titre: string, host, protocol): any {
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
 let keyParam =  {
                "name": "key",
                "in": "path",
                "required": true,
                "type": "string"
            };
  let tenantId = {
    "in": "query",
    "name": "tenantId",
    "description": "tenant Id",
    "required": true,
    "type": "integer"
};          
function getBodyParametre(schemaCollection:any):any{
    
    let body = {
                "in": "body",
                "name": "body",
                "description": "objet ",
                "required": true,
                "schema": schemaCollection
            }
   return body;
}
export function getDefaultParametersODATA():any { 
    return [filter, select, count, top, skip, expand, orderby,tenantId]
}

export function getSwaggerGet (collectionName : string, schemaCollection : any, params : any):any{
    
    
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
    }
    
    return _get;

}

export function getSwaggerPost(collectionName : string , schemaCollection : any ) : any {
    let post = {
        "summary": "POST " + collectionName,
        "description": "POST " + collectionName,
        "tags": [collectionName],
        "parameters": [
           getBodyParametre(schemaCollection),tenantId
        ],
        "responses": {
            "200": {
                "description": "a définir",
        
            },
            "default": {
                "description": "error",
        
            }
        }
    }
    
    return post;
}

export function getSwaggerDeleteById(collectionName:string) :any {
    
    
    let _delete = {
        "summary": "DELETE " + collectionName,
        "description":"DELETE " + collectionName,
        "tags": [collectionName],
        "parameters": [
            keyParam,tenantId
        ],
        "responses": {
            "200": {
                "description": "a définir",
        
            },
            "default": {
                "description": "error",
        
            }
        }
    }
    
    return _delete;

}


export function getSwaggerPatch(collectionName:string,schemaCollection:any) :any{
        let patch = {
        "summary": "PATCH " + collectionName,
        "description": "PATCH " + collectionName,
        "tags": [collectionName],
        "parameters": [
            keyParam,
            getBodyParametre(schemaCollection),
            tenantId
        ],
        "responses": {
            "200": {
                "description": "a définir",
        
            },
            "default": {
                "description": "error",
        
            }
        }
    }
    
    return patch;
}
export function getSwaggerGetById(collectionName:string) :any{
        let _get = {
        "summary": "GET " + collectionName,
        "description": "GET " + collectionName,
        "tags": [collectionName],
        "parameters": [select,
                    keyParam,
                    tenantId
        ],
        "responses": {
            "200": {
                "description": "a définir",
        
            },
            "default": {
                "description": "error",
        
            }
        }
    }
    
    return _get;
}
export function getSwaggerPut(collectionName:string,schemaCollection:any) :any{
        let put = {
        "summary": "PUT " + collectionName,
        "description": "PUT " + collectionName,
        "tags": [collectionName],
        "parameters": [
            keyParam,
            getBodyParametre(schemaCollection),
            tenantId
        ],
        "responses": {
            "200": {
                "description": "a définir",
        
            },
            "default": {
                "description": "error",
        
            }
        }
    }
    
    return put;
}

