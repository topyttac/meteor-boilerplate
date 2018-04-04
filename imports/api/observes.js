import {Mongo} from 'meteor/mongo'
import shortid from 'shortid';

export const Observes = new Mongo.Collection('observes');

Router.route('/getAllObserves', {where: 'server'}).get(function() {
  var response = Observes.find().fetch();
  var obj = {
    results: []
  };
  obj.results = response;
  this.response.setHeader('Content-Type', 'application/json');
  this.response.end(JSON.stringify(obj));
});

Router.route('/getObserve/:reportId',{where: 'server'})
    .get(function(){
        var response;
        if(this.params.reportId !== undefined) {
            var reportId = this.params.reportId;
            var data = Observes.find({_id: reportId}).fetch();
            if(data.length > 0) {
                response = data
            } else {
                response = {
                    "error" : true,
                    "message" : "Observe not found."
                }
            }
        }
        var obj = {results: []};
        obj.results = response;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/addObserve', {where: 'server'}).post(function(){
        var response;
        if(this.request.body.reportId === undefined || this.request.body.event === undefined || this.request.body.position === undefined) {
            response = {
                "error" : true,
                "message" : "Unsuccessful"
            };
        } else {
          Observes.update({
            _id: this.request.body.reportId
          }, {
            $push: {
              results: {
                event: this.request.body.event,
                createDate: new Date(),
                position: this.request.body.position
              }
            }
          }, {upsert: true});
            response = {
                "error" : false,
                "message" : "Successful"
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/updateObserve', {where: 'server'}).post(function() {
  var response;
  if (this.request.body.reportId === undefined || this.request.body.event === undefined || this.request.body.position === undefined || this.request.body.option === undefined || this.request.body.amount === undefined || this.request.body.diseaseFound === undefined || this.request.body.insectFound === undefined || this.request.body.diseaseControl === undefined || this.request.body.pestControl === undefined) {
    response = {
      "error": true,
      "message": "Unsuccessful"
    };
  } else {
    if (this.request.body.remark === undefined) {
      var exist = Observes.findOne({_id: this.request.body.reportId, "results.position": this.request.body.position});
      if (exist) {
        Observes.update({
          _id: this.request.body.reportId,
          "results.position": this.request.body.position,
          "results.event": this.request.body.event
        }, {
          $set: {
            "results.$.option": this.request.body.option,
            "results.$.amount": this.request.body.amount,
            "results.$.diseaseFound": this.request.body.diseaseFound,
            "results.$.insectFound": this.request.body.insectFound,
            "results.$.diseaseControl": this.request.body.diseaseControl,
            "results.$.pestControl": this.request.body.pestControl
          }
        });
      } else {
        Observes.update({
          _id: this.request.body.reportId
        }, {
          $push: {
            results: {
              event: this.request.body.event,
              position: this.request.body.position,
              option: this.request.body.option,
              amount: this.request.body.amount,
              diseaseFound: this.request.body.diseaseFound,
              insectFound: this.request.body.insectFound,
              diseaseControl: this.request.body.diseaseControl,
              pestControl: this.request.body.pestControl
            }
          }
        }, {upsert: true});
      }
    } else {
      var exist = Observes.findOne({_id: this.request.body.reportId, "results.position": this.request.body.position});
      if (exist) {
        Observes.update({
          _id: this.request.body.reportId,
          "results.position": this.request.body.position
        }, {
          $set: {
            "results.$.option": this.request.body.option,
            "results.$.amount": this.request.body.amount,
            "results.$.diseaseFound": this.request.body.diseaseFound,
            "results.$.insectFound": this.request.body.insectFound,
            "results.$.diseaseControl": this.request.body.diseaseControl,
            "results.$.pestControl": this.request.body.pestControl,
            "results.$.remark": this.request.body.remark
          }
        });
      } else {
        Observes.update({
          _id: this.request.body.reportId
        }, {
          $push: {
            results: {
              position: this.request.body.position,
              option: this.request.body.option,
              amount: this.request.body.amount,
              diseaseFound: this.request.body.diseaseFound,
              insectFound: this.request.body.insectFound,
              diseaseControl: this.request.body.diseaseControl,
              pestControl: this.request.body.pestControl,
              remark: this.request.body.remark
            }
          }
        }, {upsert: true});
      }
    }
    response = {
      "error": false,
      "message": "Successful"
    }
  }
  this.response.setHeader('Content-Type', 'application/json');
  this.response.end(JSON.stringify(response));
});
