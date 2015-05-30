// A common place holder for all the global variables and constants.

var SR = {};
SR.couchDB.URL = 'http://socialfarm.org/couchdb/social_ride/';
SR.couchDB.viewUrl = SR.couchDB.URL + '_design/info/_view/';
SR.couchDB.nearbyOfferView = SR.couchDB.URL + 'nearby_offer';
SR.couchDB.nearbyReqView = SR.couchDB.URL + 'nearby_request';
SR.couchDB.myOfferView = SR.couchDB.URL + 'my_offer';
SR.couchDB.myReqView = SR.couchDB.URL + 'my_request';

SR.divId = {
    ride: {
        request: 'tab_request',
        offer: 'tab_offer'
    },
    user: {
        request: 'tab_my_req',
        offer: 'tab_my_offer'
    }
};