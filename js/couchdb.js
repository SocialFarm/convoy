//couchdb.js

var CouchDB = (function() {
    //Local function and variables.
    var do_nothing = function(){};

    return {
        add_user_to_database: function() {
            var userInfo = get_user();
            if(!_.isEmpty(userInfo)) {
                var userUrl = SR.couchDB.URL + 'user.' + userInfo.id;
                get_json(userUrl, function (response){
                    LOG("User already in database");
                    Map.updateCurrentLocation(userUrl, response);
                }, function() {
                    var person = {
                        type    : 'person',
                        name    : userInfo.name,
                        id      : userInfo.id,
                        gender  : userInfo.gender
                    };

                    //add person to socialfarm db
                    /* code snippet for caching, which is currently disabled
                     var update_id = function (response){
                     LOG('add user response: ' + response);
                     revision_cache[url].rev = response.rev;
                     };*/
                    put_json(userUrl, JSON.stringify(person), do_nothing, do_nothing);
                });
            }
        },

        getNearbyRideInfo: function(rideType, successcb, failurecb) {
            var viewUrl = null;
            if(rideType === 'offer') {
                viewUrl = SR.couchDB.nearbyOfferView;
            } else {
                viewUrl = SR.couchDB.nearbyReqView;
            }
            get_json(viewUrl, successcb, failurecb);
        },

        getUserRideInfo: function(userid, rideType, successcb, failurecb) {
            var viewUrl = null;
            if(rideType === 'offer') {
                viewUrl = SR.couchDB.nearbyOfferView + '?key=%22user.' + userid +'%22';
            } else {
                viewUrl = SR.couchDB.nearbyReqView + '?key=%22user.' + userid +'%22';
            }
            get_json(viewUrl, successcb, failurecb);
        }
    };
})();
