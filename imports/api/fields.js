import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';

export const Fields = new Mongo.Collection('fields');

Router.route('/getAllFields',{where: 'server'})
    .get(function(){
        var response = Fields.find().fetch();
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/getField/:id',{where: 'server'})
    .get(function(){
        var response;
        if(this.params.id !== undefined) {
            var _id = this.params.id;
            var data = Fields.find({_id}).fetch();
            if(data.length > 0) {
                response = data
            } else {
                response = {
                    "error" : true,
                    "message" : "Field not found."
                }
            }
        }
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/addField',{where: 'server'})
.post(function(){
    var response;
    if(this.request.body.fieldCode === undefined || this.request.body.locationId === undefined || this.request.body.farmerId === undefined) {
        response = {
            "error" : true,
            "message" : "Unsuccessful"
        };
    } else {
        Fields.insert({
            _id : shortid.generate(),
            fieldCode : this.request.body.fieldCode,
            locationId : this.request.body.locationId,
            farmerId : this.request.body.farmerId
        });
        response = {
            "error" : false,
            "message" : "Successful"
        }
    }
    this.response.setHeader('Content-Type','application/json');
    this.response.end(JSON.stringify(response));
});
