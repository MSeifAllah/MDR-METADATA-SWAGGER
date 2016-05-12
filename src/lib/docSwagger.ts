"use strict";
 
 import * as toolsSwagger from './helper'
 
 
 
 function getSwagger(nameSpace:string,modelName:string , schema : any , definitions : any , paths : any){
     
     definitions[modelName] = schema;
    
    var ref = { "$ref": "#/definitions/" + modelName };
    paths["/data/mdr/"+nameSpace+"/odata/" + modelName  ] = {
        "get": toolsSwagger.getSwaggerGet(modelName,ref, toolsSwagger.getDefaultParametersODATA()),
        "post": toolsSwagger.getSwaggerPost(modelName, ref)
    };   
   paths["/data/mdr/"+nameSpace+"/odata/" + modelName + "({key})"] = {
        "get": toolsSwagger.getSwaggerGetById(modelName),
        "put": toolsSwagger.getSwaggerPut(modelName,ref) ,
        "delete": toolsSwagger.getSwaggerDeleteById(modelName),
        "patch":toolsSwagger.getSwaggerPatch(modelName,ref)
    }
    
    
    
 }
 export function buildDocSwagger(models:any, nameSpace : string ,req:any): any{
  
  let   jsonSwagger = toolsSwagger.getJsonSwaggerStructure("ODATA FOR "+nameSpace, req.headers["host"] || "localhost", req.protocol || "http") 
  let paths = {};
  let definitions = {};
     
  for(let model in models)
      getSwagger(nameSpace,model,models[model],definitions,paths)
      
      
    jsonSwagger["paths"] = paths;
    jsonSwagger["definitions"] = definitions;
    
  return JSON.stringify(jsonSwagger);
     
 }