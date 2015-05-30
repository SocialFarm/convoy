// A common place holder for all the global variables and constants.

var SR = {};
SR.couchDB = {};
SR.couchDB.URL              = 'http://socialfarm.org/couchdb/social_ride/';
SR.couchDB.viewUrl          = SR.couchDB.URL + '_design/info/_view/';
SR.couchDB.nearbyOfferView  = SR.couchDB.viewUrl + 'nearby_offer';
SR.couchDB.nearbyReqView    = SR.couchDB.viewUrl + 'nearby_request';
SR.couchDB.myOfferView      = SR.couchDB.viewUrl + 'my_offer';
SR.couchDB.myReqView        = SR.couchDB.viewUrl + 'my_request';

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