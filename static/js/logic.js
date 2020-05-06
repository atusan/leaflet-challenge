var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken:"pk.eyJ1IjoiYXR1c2FuIiwiYSI6ImNrOGY4ZzIyODAxbGgzbm9peXVsdXR2d2EifQ.vlIrKQeDJjXxAhJkIHG3ew",
}).addTo(myMap);

function markerSize(m) {

  return m*5

};

function chooseColor(mag) {
  if (mag >= 5) {
      return "#E34514";
    }
    else if (mag >= 4) {
      return "#E3AC14";
    }
    else if (mag >= 3) {
      return "#FEA128";
    }
    else if (mag >= 2) {
      return "#E3E014";
    }
    else if (mag >= 1) {
      return "#B2E314";
    }
    else {
      return "#4BE314";
    }
};

function getColorLegend(l){
  switch (l) {
    case 0:
      return "#4BE314";
      break;
    case 1:
      return "#B2E314";
      break;
    case 2:
      return "#E3E014";
      break;
    case 3:
      return "#FEA128";
      break;
    case 4:
      return "#E3AC14";
      break;
    case 5:
      return "#E34514";
      break;
  }
}
// https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
var legend = L.control({
  position: "bottomright"
});

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  var labels = [0, 1, 2, 3, 4, 5];
  // var colors = ["#B2E314",#E3E014","#FEA128","#E3AC14","#E34514","#4BE314"]

  for (var i = 0; i < labels.length; i++) {
    // div.innerHTML += "<i  style='background-color: "+ colors[i] + "'></i> " +
    // labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+");
    
    div.innerHTML += '<i style="background:' + getColorLegend(labels[i]) + '"></i> ' +
    labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
    
  }
  return div;
};
legend.addTo(myMap);


d3.json(queryUrl, function(response) {

    // console.log(response);
    var features = response.features;
  
    for (var i = 0; i < features.length; i++) {
      var data = features[i].properties;
      var geometry = features[i].geometry;
      var coordinates = geometry.coordinates;
      // console.log(coordinates)
      var location = [coordinates[1],coordinates[0]];
      // console.log(location)
     
      if (location) {
          
          var circle =L.circleMarker(location, {
            
            fillOpacity: 0.75,
            color: "black",
            opacity:1,
            weight:1,
            radius: markerSize(data.mag),
            fillColor: chooseColor(data.mag)
            
            })
             .bindPopup("<h3> Earthquake Magnitude: "+ data.mag +"</h3>"+
             "<h3>Location: " + data.place +"</h3>"+"<h3> Date: "+new Date(data.time) +"</h3>");
             circle.addTo(myMap);

        }
        
      }
      
  });
  