// A common place holder for all the global variables and constants.

var SR = {};
SR.couchDB = {
    URL : 'http://socialfarm.org/couchdb/social_ride/',
    viewUrl : this.URL + '_design/info/_view/',
    nearbyOfferView : this.viewUrl + 'nearby_offer',
    nearbyReqView : this.viewUrl + 'nearby_request',
    myOfferView : this.viewUrl + 'my_offer',
    myReqView : this.viewUrl + 'my_request'
};
