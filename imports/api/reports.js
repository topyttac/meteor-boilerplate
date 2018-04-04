import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';

export const Reports = new Mongo.Collection('reports');

Router.route('/getAllReports',{where: 'server'})
    .get(function(){
        var response = Reports.find().fetch();
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/getReport/:fieldId',{where: 'server'})
    .get(function(){
        var response;
        if(this.params.fieldId !== undefined) {
            var fieldId = this.params.fieldId;
            var data = Reports.find({fieldId}).fetch();
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

Router.route('/addReport',{where: 'server'})
.post(function(){
    var response;
    if(this.request.body.fieldId === undefined) {
        response = {
            "error" : true,
            "message" : "Unsuccessful"
        };
    } else {
        Reports.insert({
            _id : shortid.generate(),
            startDate : new Date(),
            fieldId : this.request.body.fieldId
        });
        response = {
            "error" : false,
            "message" : "Successful"
        }
    }
    this.response.setHeader('Content-Type','application/json');
    this.response.end(JSON.stringify(response));
});
