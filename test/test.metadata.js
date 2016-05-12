"use strict"
const assert = require("assert");

const xmlBuilder = require('../lib/metadata');
const fs = require('fs');
describe('Build Metadata for Entities', function () {
    it('BuildMetadata', function () {
        var obj = {
            e2: {
                name: 'e2',
                properties: {
                    id: { type: 'integer' },
                    i1: { type: 'string' },
                    i2: { type: 'integer', format :"int64" },
                    i7: { type: 'integer', format :"int16" },
                    i3: { type: 'string', format :"date" },
                    i4: { type: 'string', format : "date-time" },
                    i5: { type: 'string', format : "stream" },
                    i6: { type: 'number' },
                    NavigationSimple : {
                                    name: 'e3',
                                    type : 'object',
                                    properties: {
                                        i12: { type: 'string' },
                                        i3: { type: 'string' }
                                    }
                                 },
                    NavigationArray : {
                        type :'array',
                        items : {
                                    name: 'e4',
                                    type : 'object',
                                    properties: {
                                        prop1: { type: 'string' },
                                        prop2: { type: 'integer' }
                                    }
                            } 
                    },
                                                            
                },
             "_autoIncrementId": "id"   
            },
            e3: {
                name: 'e3',
                type : 'object',
                properties: {
                    i12: { type: 'string' },
                    i3: { type: 'integer' }
                }
            },
            e4: {
                name: 'e4',
                type : 'object',
                properties: {
                    prop1: { type: 'string' },
                    prop2: { type: 'integer' }
                }
            }            
        }

        let xml = xmlBuilder.metadata(obj,"test");
        let a = fs.readFileSync(__dirname + '\\metadata.xml');
        var res = a.toString().trim();
        res = res.replace(/\r/g,"");
        console.log(xml);
        console.log('-----------------------------------------------------------')
        console.log(res);
        assert.deepEqual(xml.toString().trim(),res);
    
    });
});