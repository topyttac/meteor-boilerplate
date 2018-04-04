import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Router.route('/getAllEvents',{where: 'server'})
    .get(function(){
        var response = Events.find().fetch();
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });
