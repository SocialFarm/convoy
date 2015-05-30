// This file contains utility function for social ride
//TODO :: Refactoring move the form related functions to a diff file

var map = null;

function read_html_form_data(form_id) {
    var form ;
    var member = Object();
    form = $("#"+form_id).serializeArray();
    
    $.each(form, function (item) {
                    member[form[item].name] = form[item].value;
                    });
    return member;
}

//Init google maps
function init_map() {
   
    //geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(12.9715987,77.59456269 );
    var mapOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}

function setHeader(xhr) {
    if (user != null){
        xhr.setRequestHeader('accesstoken', user.AccessToken);
        xhr.setRequestHeader('fbid', user.FBID);
    }
}

function put_json(url, data, successcb, failurecb){
        //if (url in revision_cache && data == revision_cache[url]){
            // trying to put the same object 
        //    LOG('trying to put the same object...');
        //} else {
        $.ajax({
            url: url,
            type: 'PUT',
            dataType: 'json',
            data : data,
            success: function (response){ 
                //should update cache rev
                //revision_cache[url] = response; 
                successcb(); 
            },
            error: failurecb,
            beforeSend: setHeader
        });
    //}
}

function get_json(url, successcb, failurecb){
    //caching not working >:(
    //if (! url in revision_cache) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (response){
                //revision_cache[url] = JSON.stringify(response);
                successcb(response);
            },
            error: failurecb
            //beforeSend: setHeader
        });
    /*
    } else {
        LOG('returning cached data...');
        successcb(revision_cache[url]);
    }   */
}

function do_nothing()
{}

//TODO :: pjain :: add code to accept ride
function acceptRide(id)
{
  alert("Accepted "+ id);
}

function appendNearByRideInfoTable(data,divId) {
  /* Array description
    0 -> ride id
    1 -> user name
    2 -> source
    3 -> destination
    4 -> date
    5 -> time 
    6 -> friend */
    
    var html = '<tr id="'+data[0]+'">' +
                '<td class="when">'+data[4]+'</td>'+
                '<td class="sd"><span>'+data[2] + '-' + data[3] + '</span></td>'+
                '<td class="lug">'+data[1]+'</td>' +
                '<td class="stopver">'+data[5]+'</td>'+
                '<td class="friends">2</td>'+
                '<td> <button id = "accept" onclick=acceptRide("'+data[0]+'")>Accept</button> </td>'+
                '</tr>';
        
    $('#'+divId).append(html);
}

function fillNearByRideInfo(type,curLocGeoCode) {
    CouchDB.getNearbyRideInfo(type, function(data) {
        $(data.rows).each(function (i, row){
            $(row).each(function (j, col) {
                appendNearByRideInfoTable(col.value,SR.divId[type]);
            });
        });
    },do_nothing);
 }

function appendMyRideInfoTable(data,divId) {
  /* Array description
    0 -> ride id
    1 -> source
    2 -> destination
    3 -> date
    4 -> time 
    5 -> friend 
    6 -> status */
    
    var html = '<tr id="'+data[0]+'">' +
                '<td class="when">'+data[3]+'</td>'+
                '<td class="sd"><span>'+data[1] + '-' + data[2] + '</span></td>'+
                '<td class="stopver">'+data[4]+'</td>'+
                '<td class="friends">2</td>'+
                '<td class="friends">'+data[5]+'</td>'+
                '<td> <button id = "rate">Rate</button> </td>'+
                '</tr>';
        
    $('#'+divId).append(html);
}

function fillMyRideInfo(type,userId) {
    CouchDB.getUserRideInfo(userId, type, function(data){
        $(data.rows).each(function (i, row){
            $(row).each(function (j, col) {
                appendMyRideInfoTable(col.value,SR.divId.user[type]);
            });
        });
    },do_nothing);
}