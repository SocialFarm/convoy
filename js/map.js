//map.js
//Util functions to interact with google map apis


var Map = (function() {

    var attachMessage = function(address,geoLocation,marker,type)
    {
        var infowindow = new google.maps.InfoWindow({
            content: address,
            size: new google.maps.Size(50,50)
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            change_location(address, geoLocation, type);
        });
    };

    var encodeGeoPosition = function(lat,lng) {

        // each deg is 111km ~= 10^2 km
        // 1km = 0.01 deg
        // 10m = 0.0001 deg
        // var RESOLUTION = 0.0001; // used to lead to 46 bytes key
        var DEPTH = 24 ;
        var MIGRATING = 1;  // temp while we have v2 clients

        function getkeys(depth, max, min, value) {
            var result = new Array();
            for( var i = 0; i < depth; i++ ) {   // while( (max - min) > delta ) {
                var mid = ( min + max ) / 2.0 ;
                // log( "max, min, value = " + max + " " + min + " " + value ) ;
                if( value <= mid ) {
                    result.push( -1 ) ;
                    max = mid ;
                }
                else if( value > mid ) {
                    result.push( +1 ) ;
                    min = mid ;
                }
            }
            // log( " computed " + result ) ;
            return result ;
        }

        function getchoice(value, posvalue, negvalue, zerovalue) {
            if( value < 0 )
                return negvalue;
            if( value > 0 )
                return posvalue;
            else
                return zerovalue;
        }

        if( MIGRATING > 0 ) {
            var latkeys = getkeys( DEPTH, 90.0, -90.0, lat ) ;
            var lonkeys = getkeys( DEPTH, 180, -180, lng ) ;
            // log( "length of keys = " + latkeys.length + " , " + lonkeys.length ) ;

            var maxlen = latkeys.length <  lonkeys.length ?
                lonkeys.length : latkeys.length ;
            var kdkeys = new Array() ;
            for( var i = 0; i < maxlen; i++ ) {
                var value = 0;
                if( latkeys.length )
                    value = latkeys.shift() ;
                kdkeys.push( getchoice( value, 'n' , 's' , '_' ) ) ;
                value = 0;
                if( lonkeys.length )
                    value = lonkeys.shift() ;
                kdkeys.push( getchoice( value, 'e' , 'w' , '_' ) ) ;
            }

            var str = "" ;
            while( ch = kdkeys.shift() )
                str += ch ;

            return str;
        }
    };

    return {
        init : function(){
            //geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(12.9715987,77.59456269 );
            var mapOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        },
        map_address_on_map : function(address, type, successcb, failurecb) {
            var geocoder = new google.maps.Geocoder();
            var geolocation = {};
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    for(var i=0 ; i < results.length ; i++ ) {
                        var marker = new google.maps.Marker({
                            map: map,
                            //TODO :: get images for source and destination.
                            //icon: image
                            position: results[i].geometry.location,
                            draggable: true,
                            title: type
                        });
                        marker.setTitle(results[i].formatted_address);
                        attachMessage(results[i].formatted_address ,results[i].geometry.location, marker,type );
                    }
                    //set initial position in DB
                    geolocation.address = results[0].formatted_address ;
                    geolocation.latlong = results[0].geometry.location ;
                    successcb(results[0].formatted_address ,results[0].geometry.location,type);
                }else {
                    alert('Geocode was not successful ' + status);
                    failurecb(address);
                }
            });
        },
        encodeAddress : encodeGeoPosition ,
        updateCurrentLocation : function (userUrl, userInfo) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function savePosition(position) {
                    var loc = this.encodeAddress(position.coords.latitude ,position.coords.longitude);
                    user['curLocation']=loc;
                    var data = JSON.stringify(userInfo);
                    if(tmp == 0){
                        // to prevent calling put_json twice with the same rev_id
                        put_json(userUrl,data,do_nothing,do_nothing);tmp++;}
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    };
})();
