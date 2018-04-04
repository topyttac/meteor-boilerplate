import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';

export const Farmers = new Mongo.Collection('farmers');

Router.route('/getAllFarmers',{where: 'server'})
    .get(function(){
        var response = Farmers.find().fetch();
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/getFarmer/:id',{where: 'server'})
    .get(function(){
        var response;
        if(this.params.id !== undefined) {
            var _id = this.params.id;
            var data = Farmers.find({_id}).fetch();
            if(data.length > 0) {
                response = data
            } else {
                response = {
                    "error" : true,
                    "message" : "Farmer not found."
                }
            }
        }
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

  Router.route('/addFarmer',{where: 'server'})
  .post(function(){
      var response;
      if(this.request.body.name === undefined) {
          response = {
              "error" : true,
              "message" : "Unsuccessful"
          };
      } else {
          let _id = shortid.generate();
          if(this.request.body.phone === undefined) {
            Farmers.insert({
                _id,
                name : this.request.body.name
            });
          } else {
            Farmers.insert({
                _id,
                name : this.request.body.name,
                phone : this.request.body.phone
            });
          }
          response = {
            "error": false,
            "message": "Successful",
            "_id": _id 
          }
      }
      this.response.setHeader('Content-Type','application/json');
      this.response.end(JSON.stringify(response));
  });
