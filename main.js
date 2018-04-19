
var map;
var ajaxRequest;
//var key = '1OVQ1cJYJbHdzxvUW2sW_TdAcVpm6QfQYhB0KUyiyKf8';
var key = '1gVRoXiWSgHZO4eBN56VAAgHDwPKsAZnHt7_rRYX4xzM';
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
function whenClicked(e) {
    var t = e.target.feature.properties["_ID"];
    window.location.assign(areas[t]);
}

function onEachFeature(feature, layer) {
    layer.on({
        click: whenClicked
    });
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
            $.getJSON("continents.geojson", function(your_data){      
                geojson = L.geoJson(your_data, {
                    onEachFeature: onEachFeature
                }).addTo(map);
            });
        }
    });
})
