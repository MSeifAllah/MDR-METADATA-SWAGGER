"use strict";

import * as builder from 'xmlbuilder'
export function metadata(model: any,nameSpace: string): any {
    return buildMetadata(model,nameSpace);
}
function buildMetadata(models: any,nameSpace: string): any {

    let entitesType = [];
    let EntitiesContainer = [];
    let container = {
        "EntityContainer": {
            "@Name": "Context",
            "EntitySet": []
        }
    }; 
    for (let model in models) {
        entitesType.push(getEntitiesType(models[model],nameSpace));
        getEntitiesContainer(model,nameSpace,container);
    }
    EntitiesContainer.push( container.EntityContainer);
    let xmlRoot = builder.create('edmx:Edmx');
    
    let objMetadata = {
        "@xmlns:edmx": "http://docs.oasis-open.org/odata/ns/edmx",
        "@Version": "4.0",
        "edmx:DataServices": {
            "Schema": {
                "@xmlns": "http://docs.oasis-open.org/odata/ns/edm",
                "@Namespace": nameSpace,
                "EntityType": entitesType,
                //  "ComplexType" : comType,
                "EntityContainer": EntitiesContainer

            }
        }

    };

    var ele = xmlRoot.ele(objMetadata);
    return ele.end({ pretty: true });

}
function getEntitiesType(model: any,nameSpace: string): any{
    
        let compositionType = [];
        let propertyNavigation = [];
        let entityType = {
            "EntityType": {
                "@Name": model.name+ "Type",
                "Property": []
               // "Key":{ "PropertyRef":[{"@name" : "id"}] }
            }
        };
         let props = model.properties;
         
        for (let prop in props) {
             if(prop == model._autoIncrementId) continue; // traitemant des clé à la fin
            //build Navigation Property Metadata
            if(props[prop].type == 'object' || props[prop].type == 'array'){
                //build Composition Entity Type
                //compositionType.push(getEntitiesType(props[prop],nameSpace));
                let entity = props[prop];
                if(!entity) entity = props[prop].items ;
                propertyNavigation.push({ "@Name": prop, "@Type": getOdataType(entity, nameSpace) });
                continue
            }
            // Property Metadata
            entityType.EntityType.Property.push({ "@Name": prop, "@Type": getOdataType(props[prop], nameSpace) })
        }
        
        
        // Add Navigation Property Metadata
        if(propertyNavigation.length > 0)
        {
           entityType.EntityType["NavigationProperty"] = {};
           entityType.EntityType["NavigationProperty"] = propertyNavigation;
        }
        
        
         // Key Metadata
         if(model._autoIncrementId){
                 entityType.EntityType["Key"] = {};
                 entityType.EntityType["Key"].PropertyRef = {"@name" : model._autoIncrementId};
                 entityType.EntityType.Property.push({ "@Name": model._autoIncrementId, "@Type": getOdataType(props[model._autoIncrementId], nameSpace), "@Nullable" : false })
         }
        
        
       /* if(compositionType.length > 0){
            compositionType.push(entityType.EntityType);
           return compositionType;   
        }*/
        return entityType.EntityType;
    
}

function  getEntitiesContainer(model:string,nameSpace :string ,container:any):any {

     container.EntityContainer["EntitySet"].push(
            {
                "@EntityType": nameSpace +"."+ model + "Type",
                "@Name": model
            }
        );
        
     return  container;
}
function getOdataType(prop: any, nameSpace: string): string {

    if (!prop.type && prop.$ref) { prop.type = "object" }
    switch (prop.type) {
        case "string":
            if (prop.format === "date" || prop.format === "date-time") return "Edm.DateTime";
            if (prop.format === "stream") return "Edm.Binary";
            return "Edm.String";
        case "integer":
           if (prop.format === "int16") return "Edm.Int16";
           if (prop.format === "int64") return "Edm.Int64";
           return "Edm.Int32"
        case "number":
            return "Edm.Decimal";
        case "object":
            return nameSpace + "." + prop.name;
        case "array":
            if (prop.items) return "Collection(" + getOdataType(prop.items, nameSpace) + ")";
            return "Collection(Edm.object)"
        default:
            throw "Type " + prop.type + " inconnu ";

    }

}
