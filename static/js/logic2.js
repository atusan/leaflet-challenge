// Creating map object
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiYXR1c2FuIiwiYSI6ImNrOGY4ZzIyODAxbGgzbm9peXVsdXR2d2EifQ.vlIrKQeDJjXxAhJkIHG3ew",
}).addTo(myMap);

// function chooseColor(mag) {
//     if (mag >= 5) {
//         return "red";
//       }
//       else if (mag >= 4) {
//         return "orange";
//       }
//       else if (mag >= 3) {
//         return "yellow";
//       }
//       else if (mag >= 2) {
//         return "purple";
//       }
//       else if (mag >= 1) {
//         return "green";
//       }
//       else {
//         return "blue";
//       }
//   }
  
  // Grabbing our GeoJSON data..
  d3.json(queryUrl, function(data) {
    // Creating a geoJSON layer with the retrieved data
   
    function markerSize(m) {

        return m*5
      
      }
    function chooseColor(mag) {
    if (mag >= 5) {
        return "red";
        }
        else if (mag >= 4) {
        return "orange";
        }
        else if (mag >= 3) {
        return "yellow";
        }
        else if (mag >= 2) {
        return "purple";
        }
        else if (mag >= 1) {
        return "green";
        }
        else {
        return "blue";
        }
    }

   
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      pointToLayer: function(feature, loc) {
        return L.circleMarker(loc);
      },

      style: function(feature) {
        return {
          color: "white",
          stroke: true,
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: chooseColor(feature.properties.mag),
          fillOpacity: 0.5,
          weight: 1.5,
          radius:markerSize(feature.properties.mag)
        };
      },
      
      // Called on each feature
      onEachFeature: function(feature, layer) {
        

        layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h2>" + new Date(feature.properties.time) + "</h2>");
  
      }
    }).addTo(myMap)
  });
  