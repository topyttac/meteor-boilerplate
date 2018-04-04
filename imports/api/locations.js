import {
    Mongo
} from 'meteor/mongo';
import shortid from 'shortid';

export const Locations = new Mongo.Collection('locations');

Router.route('/getAllLocations', {
        where: 'server'
    })
    .get(function () {
        var response = Locations.find().fetch();
        var obj = {
            results: []
        };
        obj.results = response;
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/getLocation/:id', {
        where: 'server'
    })
    .get(function () {
        var response;
        if (this.params.id !== undefined) {
            var _id = this.params.id;
            var data = Locations.find({
                _id
            }).fetch();
            if (data.length > 0) {
                response = data
            } else {
                response = {
                    "error": true,
                    "message": "Location not found."
                }
            }
        }
        var obj = {
            results: []
        };
        obj.results = response;
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(obj));
    });

Router.route('/addLocation', {
        where: 'server'
    })
    .post(function () {
        var response;
        if (this.request.body.subDistrict === undefined || this.request.body.district === undefined || this.request.body.province === undefined) {
            response = {
                "error": true,
                "message": "Unsuccessful"
            };
        } else {
            let _id = shortid.generate();
            if (this.request.body.latitude !== undefined && this.request.body.longitude !== undefined) {
                if(this.request.body.address === undefined) {
                    Locations.insert({
                        _id,
                        subDistrict: this.request.body.subDistrict,
                        district: this.request.body.district,
                        province: this.request.body.province,
                        zipCode: this.request.body.zipCode,
                        geography: {
                            latitude: this.request.body.latitude,
                            longitude: this.request.body.longitude
                        }
                    });
                } else {
                    Locations.insert({
                        _id,
                        address: this.request.body.address,
                        subDistrict: this.request.body.subDistrict,
                        district: this.request.body.district,
                        province: this.request.body.province,
                        zipCode: this.request.body.zipCode,
                        geography: {
                            latitude: this.request.body.latitude,
                            longitude: this.request.body.longitude
                        }
                    });
                }
            } else if (this.request.body.address === undefined) {
                Locations.insert({
                    _id,
                    subDistrict: this.request.body.subDistrict,
                    district: this.request.body.district,
                    province: this.request.body.province,
                    zipCode: this.request.body.zipCode
                });
            } else {
                Locations.insert({
                    _id,
                    address: this.request.body.address,
                    subDistrict: this.request.body.subDistrict,
                    district: this.request.body.district,
                    province: this.request.body.province,
                    zipCode: this.request.body.zipCode
                });
            }
            response = {
                "error": false,
                "message": "Successful",
                "_id": _id 
            }
        }
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(response));
    });