
var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

var key = '1OVQ1cJYJbHdzxvUW2sW_TdAcVpm6QfQYhB0KUyiyKf8';
var url = 'https://spreadsheets.google.com/feeds/list/'+key+'/od6/public/values?alt=json-in-script';

var areas = {};

function initmap() {
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 4, attribution: osmAttrib});		
	map.setView(new L.LatLng(0,0),2);
	map.addLayer(osm);
}

$(function(){
    initmap();
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        success: function( response ) {
            for(var x in response.feed.entry){
                var xx = response.feed.entry[x];
                areas[xx.title["$t"]] = xx.content["$t"].split(" ")[1];
            }
            console.log(areas);
        }
    });
})