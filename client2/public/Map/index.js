var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var streetMap = L.tileLayer.provider('Esri.WorldStreetMap');



// function goToLocation() {
//   var latitude;
//   var longitude;
//   const searchcan = document.getElementById("search-can")

//   searchcan.addEventListener("click",()=>{
//     var canid=document.getElementById("can-container").value
//     alert(canid)

//   })
//   // var latitude = parseFloat(document.getElementById('latitude').value);
 
//   // var longitude = parseFloat(document.getElementById('longitude').value);
  

//   if (!isNaN(latitude) && !isNaN(longitude)) {
//       map.setView([latitude, longitude], 20);
//   } else {
//       alert('Please enter valid latitude and longitude values.');
//   }
// }
// alert("hb")
const canSearch = document.getElementById("can-btn")
canSearch.addEventListener("click", ()=> {
  const dat = document.getElementById("can-container").value
  const fetchdata = async()=>{try {
    const response1 = await fetch(`http://localhost:5001/api/getdetailsbycanid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "canid":dat
      })
    })
    const pointinfo = await response1.json();
    if(!response1.ok){
      console.log(`HTTP error! Status: ${response1.status}`);
    }
    // alert(JSON.stringify(pointinfo))
    var latitude = pointinfo.pointData[0].coordinates[1];
    // alert(latitude);
    var longitude = pointinfo.pointData[0].coordinates[0];
    

    if (!isNaN(latitude) && !isNaN(longitude)) {
        map.setView([latitude, longitude], 20);
    } else {
        alert('Please enter valid latitude and longitude values.');
    }
  
  } catch (error) {
    console.log(`Error fetching GeoJSON data: ${error}`);
  } 
  }
  fetchdata();
  
})
// function goToLocation(){
  
// }

// Adding the base Maps which we want from the Leaflet-Provider Plugin
var baseMaps ={
  OSM: osmMap,
  'Street Map': streetMap
}

// *************************************************




// Declaring useful variables
var geoServerIPPort = 'localhost:8080';
var geoServerWorkspace = 'siddharth';
var stateLayerName = 'siddharth:main_water_lines_pg';

// Adding a layer from geoserver (Works only if geoserver's application is running in bg)
var mainWaterLineLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: 'siddharth:Main_Water_Lines_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

var houseConnectsLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: '	siddharth:House_Connects_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

var waterTanksLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/siddharth/wms",
  {
    layers: '	siddharth:House_Connects_nonpg',
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    tiled: true,
  }
)

// declaring all the layers with names in a object
var overlayMaps = {
  "Main Water Line": mainWaterLineLayer,
  "House Connects" : houseConnectsLayer,

};

// Defining the look of the map and declaring the layers
var map = L.map('map', {
  center: [17.3981383, 78.4890028],
  zoom: 16,
  layers:[osmMap, mainWaterLineLayer, houseConnectsLayer],
})




// **************************(SET VIEW)****************************

// goToLocation();

// Adding the layers to the map
var mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);


function displayPointsOnMap(geojsonDataForPoints) {
  const data = [];
  const junctiondata = {};
  const complaintsCanIds = {};
  var formattedFeature;
  // console.log(geojsonDataForPoints);
  // alert(JSON.stringify(geojsonDataForPoints.pointsData[0].properties));
  const fetchdata = async()=>{try {
    const response1 = await fetch(`http://localhost:5001/api/getjunctiondata`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const response2 = await fetch(`http://localhost:5001/complaints/getcomplaints`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const junctioninfo = await response1.json();
    const complaintInfo = await response2.json();
    await junctioninfo.junctionData.forEach(element => {
      junctiondata[element.properties.unique_id]=element.properties.supplied;
    })
    // alert(JSON.stringify(complaintInfo));
    await complaintInfo.forEach(element => {
      complaintsCanIds[element.canId]=true;
    })
    processjunctiondata();
    if(!response1.ok){
      console.log(`HTTP error! Status: ${response1.status}`);
    }
  
  } catch (error) {
    console.log(`Error fetching GeoJSON data: ${error}`);
  } 
  }
  fetchdata();
  function processjunctiondata(){
  // alert(JSON.stringify(junctiondata));
  // alert(JSON.stringify(complaintsCanIds));
  geojsonDataForPoints["pointsData"].forEach(element => {
    const canID = element && element.properties && element.properties.can_id;
    // alert(element);
    var jid = element.properties.major_Junction;
    var supplied = junctiondata[jid];

    if (element.properties.supplied=="yes" && supplied === "yes" && complaintsCanIds[canID]==null) {
      formattedFeature = {
        "type": "Feature",
        "geometry": {
          "type": element.type,
          "coordinates": element && element.coordinates
        },
        "properties": {
          "CAN_id": canID || "No ID",
          "icon": L.icon({
            iconUrl: "./blue.png",
            iconSize: [28, 28],
            iconAnchor: [16, 16],
          }),
          "ConnectedJunction_ID": jid,
        }
      };
    } else {
      formattedFeature = {
        "type": "Feature",
        "geometry": {
          "type": element.type,
          "coordinates": element && element.coordinates
        },
        "properties": {
          "CAN_id": canID || "No ID",
          "icon": L.icon({
            iconUrl: "./red.png",
            iconSize: [28, 28],
            iconAnchor: [16, 16],
          }),
          "ConnectedJunction_ID": jid,
        }
      };
    }

    data.push(formattedFeature);
  });

  console.log(data);

  // Add GeoJSON layer to the map
  const pointsLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      const icon = feature.properties.icon || L.icon.default();
      const marker = L.marker(latlng, { icon: icon }).bindPopup(`<strong>CAN ID: </strong> ${feature.properties.CAN_id}<br>` +
        `<strong>Connected JID: </strong> ${feature.properties.ConnectedJunction_ID}`);

      // Add double-click event listener to each marker
      marker.on('dblclick', function () {
        // Remove the clicked marker from the pointsLayer
        pointsLayer.removeLayer(marker);
      });

      // marker.bindTooltip('Additional Info', { permanent: true, direction: 'right' });
      

      return marker;
    }
  });

  // Add the pointsLayer to the overlayMaps control
  overlayMaps["Points from Database"] = pointsLayer;

  // Add the pointsLayer to the map
  pointsLayer.addTo(map);

  // Update the mapLayer control to include the new overlayMaps
  mapLayer.remove();
  mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);
}
}






// ********************************(Junction)**********************************
function displayJunctionsOnMap(geojsonData) {
  const data = [];
  var formattedFeature;
  // console.log(geojsonData);
  // alert(JSON.stringify(geojsonData))

  geojsonData["junctionData"].forEach(element => {
    const uniqueJunction_id = element && element.properties && element.properties.
    unique_id;
    var supplied = element.properties.supplied;

    formattedFeature = {
      "type": "Feature",
      "geometry": {
        "type": element.type,
        "coordinates": element && element.coordinates
      },
      "properties": {
        "unique_id": uniqueJunction_id || "No Junction Name",
        "icon": L.icon({
          iconUrl: "./tanker.jpg",
          iconSize: [40, 40],
          iconAnchor: [16, 16],
        }),
        "supplied": element.properties.supplied,
      }
    };
    data.push(formattedFeature);
  });

  console.log(data);

  // Add GeoJSON layer to the map
  const pointsLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      const icon = feature.properties.icon || L.icon.default();
      const marker = L.marker(latlng, { icon: icon }).bindPopup(`<strong>Junction ID:</strong> ${feature.properties.
        unique_id}<br>` +
        `<strong>Supplied:</strong> ${feature.properties.supplied}`);

      // Add double-click event listener to each marker
      marker.on('dblclick', function () {
        // Remove the clicked marker from the pointsLayer
        pointsLayer.removeLayer(marker);
        alert(marker);
      });

      return marker;
    }
  });

  // Add the pointsLayer to the overlayMaps control
  overlayMaps["Points from Database"] = pointsLayer;

  // Add the pointsLayer to the map
  pointsLayer.addTo(map);

  // Update the mapLayer control to include the new overlayMaps
  mapLayer.remove();
  mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);
}

// *****************************************************************************



function displaylinesOnMap(geojsonData) {
  const data = [];
  console.log(geojsonData);

  geojsonData["linedata"].forEach(element => {
    var formattedFeature;
    // Check if 'element' and 'element.properties' exist before accessing 'name'
    const lineid = element && element.properties && element.properties.lineid;
    formattedFeature = {
      "type": "Feature",
      "geometry": {
        "type": element.type,
        "coordinates": element && element.coordinates
      },
      "properties": {
        "lineid": lineid || "default",
        "major_Junction":element.properties.major_Junction,
        // "color": "red",
        "supplied": element.properties.supplied,
      }
    };
    data.push(formattedFeature);
  });

  console.log(data);
  

  const junctiondata = {};
  // console.log(geojsonDataForPoints);
  // alert(JSON.stringify(geojsonDataForPoints.pointsData[0].properties));
  const fetchdata = async()=>{try {
    const response1 = await fetch(`http://localhost:5001/api/getjunctiondata`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const junctioninfo = await response1.json();
    await junctioninfo.junctionData.forEach(element => {
      junctiondata[element.properties.unique_id]=element.properties.supplied;
    })
    processjunctiondata();
    if(!response1.ok){
      console.log(`HTTP error! Status: ${response1.status}`);
    }
  
  } catch (error) {
    console.log(`Error fetching GeoJSON data: ${error}`);
  } 
  }
  fetchdata();

  // Assuming 'data' contains your GeoJSON LineString or MultiLineString geometry
  function processjunctiondata(){
  const linesLayer = L.geoJSON(data, {
    style: function (feature) {
      var jid = feature.properties.major_Junction;
      var supplied = junctiondata[jid];
      if(feature.properties.supplied=="yes" && supplied=="yes"){
        return {
          color: 'blue',  // Set the color of the line
          weight: 2.5,      // Set the weight or thickness of the line
          opacity: 1      // Set the opacity of the line
        };
      }
      else{
        return {
          color: 'red',  // Set the color of the line
          weight: 4,      // Set the weight or thickness of the line
          opacity: 1      // Set the opacity of the line
        };
      }
    },
    onEachFeature: function (feature, layer) {
      // You can add popup or other interactions here if needed
      // layer.bindPopup(feature.properties.name);
      layer.bindPopup(`<strong>Line ID:</strong> ${feature.properties.lineid}<br>` +
      `<strong>Supplied:</strong> ${feature.properties.supplied}`);
    }
  });

  // Add the pointsLayer to the overlayMaps control
  overlayMaps["Lines from Database"] = linesLayer;

  // Add the pointsLayer to the map
  linesLayer.addTo(map);


  mapLayer.remove();
  mapLayer = L.control.layers(baseMaps, overlayMaps).addTo(map);
}
}



try{
  const line_data=await fetch(`http://localhost:5001/api/getlinedata`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    }
  })
  if(!line_data.ok){
    console.log(`HTTP error! Status: ${response.satus}`);
  }
  const data=await line_data.json();
  console.log(data);
  displaylinesOnMap(data);
  
}catch(error){
console.log(`Error in fetching in Geojsondata ${error}`)}



try {
  const response1 = await fetch(`http://localhost:5001/api/getdata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response1.json();
  if(!response1.ok){
    console.log(`HTTP error! Status: ${response1.status}`);
  }
  // console.log(data);
  displayPointsOnMap(data);

} catch (error) {
  console.log(`Error fetching GeoJSON data: ${error}`);
}


try {
  const response = await fetch(`http://localhost:5001/api/getjunctiondata`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(!response.ok){
    console.log(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  // console.log(data);
  displayJunctionsOnMap(data);

} catch (error) {
  console.log(`Error fetching GeoJSON data: ${error}`);
}

// ***********************************************************************


// var cltMeasure = L.control.polyline


// Drawing a layer on map
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    position: 'bottomright',
    edit: {
        featureGroup: drawnItems,
    },
    draw: {
        marker: true,
        polyline: true,
        polygon: true,
        circle: true,
        circlemarker: true,
    },
});

// map.addControl(drawControl);

const getrole=window.localStorage.getItem("role")
  console.log(getrole, "yoooooooo");

  {getrole === "admin" || getrole === "engineer" ? (
            map.addControl(drawControl)
) : null}


// Retrieving the above drawn data

function openpopup(latitude, longitude, type){
  // alert("hi")
  // var numberValue = document.getElementById("number").value;
  var number = document.getElementById("number");
  var canidnumber = document.getElementById("canidnumber");
  var underjunction = document.getElementById("underjunction");
  var heading = document.getElementById("heading");
  if(type=="junction"){
    heading.innerText = "Input Junction Details";
    canidnumber.innerText="Enter Junction ID: ";
    underjunction.disabled=true;
  }
  else{
    heading.innerText = "Input CAN Details";
    canidnumber.innerText="Enter CAN Number: ";
  }
  popup.classList.add("open-popup");
  // closepopup = document.getElementById("closepopup");
  closepopup.addEventListener("click", ()=> {
    var canNumber = number.value;
    var junctionID = underjunction.value;
    // var supplied = document.getElementById("supplied").value;
    var yesRadioButton = document.getElementById("yes");
    var noRadioButton = document.getElementById("no");

    var isWaterSupplied;
      if (yesRadioButton.checked) {
          isWaterSupplied = yesRadioButton.value;
      } else if (noRadioButton.checked) {
          isWaterSupplied = noRadioButton.value;
      } else {
          isWaterSupplied = "Not specified";
    }
    // alert(isWaterSupplied);
    handlepopupvalues(canNumber, junctionID, isWaterSupplied, latitude, longitude, type);
    popup.classList.remove("open-popup");
  })
  // alert("Infunction")
}

function handlepopupvalues(number, junctionID, supplied, latitude, longitude, type){
  const sendPointDataToServer = async () => {
    const dataToSend = {
      "type": "Point",
      "coordinates": [longitude, latitude],
      "properties":{
        "can_id":number,
        "major_Junction":junctionID,
        "supplied":supplied,
      }
    }

    try {
      const response = await fetch(`http://localhost:5001/api/addpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const responseData = await response.json();
      console.log(`Point data sucessfully sent to server: ${responseData}`);
    } catch (error) {
      console.log(`Error in sending data: ${error}`);
    }
  }


  const sendJunctionDataToServer = async () => {
    const dataToSend = {
      "type": "Point",
      "coordinates": [longitude, latitude],
      "properties":{
        "unique_id":number,
        "supplied":supplied,
      }
    }

    try {
      const response = await fetch(`http://localhost:5001/api/addjunction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const responseData = await response.json();
      console.log(`Point data sucessfully sent to server: ${responseData}`);
    } catch (error) {
      console.log(`Error in sending data: ${error}`);
    }
  }


  if(type=="home"){
    sendPointDataToServer(); 
    location.reload();
  }
  else if(type=="junction"){
    sendJunctionDataToServer();
    location.reload();
  }
  else{
    alert("Shapefile Not valid")
  }
}




// ******************************************************
function openpopupforlines(coordinates){
  // popup.classList.add("open-popup");
  // closepopup.addEventListener("click", ()=> {
  //   var linename = document.getElementById("name").value;
  //   var supplied = document.getElementById("supplied").value;
  //   handlepopupvaluesforlines(linename, supplied, coordinates);
  //   popup.classList.remove("open-popup");
  // })

  var number = document.getElementById("number");
  var lineidnumber = document.getElementById("canidnumber");
  var underjunction = document.getElementById("underjunction");
  var heading = document.getElementById("heading");

  heading.innerText = "Input Water Pipeline Details:";
  lineidnumber.innerText="Enter Line ID: ";

  popup.classList.add("open-popup");
  // closepopup = document.getElementById("closepopup");
  closepopup.addEventListener("click", ()=> {
    var lineid = number.value;
    var junctionID = underjunction.value;
    // var supplied = document.getElementById("supplied").value;
    var yesRadioButton = document.getElementById("yes");
    var noRadioButton = document.getElementById("no");

    var isWaterSupplied;
      if (yesRadioButton.checked) {
          isWaterSupplied = yesRadioButton.value;
      } else if (noRadioButton.checked) {
          isWaterSupplied = noRadioButton.value;
      } else {
          isWaterSupplied = "Not specified";
    }
    alert(isWaterSupplied);
    handlepopupvaluesforlines(lineid, junctionID, isWaterSupplied, coordinates);
    popup.classList.remove("open-popup");
  })
}

function handlepopupvaluesforlines(lineid, junctionid, isWaterSupplied, coordinates){
  const sendLineDataToServer = async () => {
    const dataToSend = {
      "type" : "LineString",
      "coordinates":coordinates,
      "properties":{
        "lineid": lineid || "Id not given",
        "major_Junction":junctionid,
        "supplied":isWaterSupplied,
      }
    }
    alert(JSON.stringify(dataToSend));

    try {
      const response = await fetch(`http://localhost:5001/api/addline` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })

      const responseData = await response.json();
      console.log(`Line data added sucessfully to database: ${responseData}`);
      location.reload();
    } catch (error) {
      console.log(`Error in sending data: ${error}`);
    }
  }
  sendLineDataToServer();
}
// ******************************************************



map.on('draw:created', function (e) {
var layer = e.layer;
drawnItems.addLayer(layer);
// Access the shape data and do something with it
var shapeData = layer.toGeoJSON();
// alert(JSON.stringify(shapeData));
// Store or process the shapeData as needed
var coordinates;
// Check if it's a Point geometry (Marker)
if (shapeData.geometry.type === 'Point') {
  coordinates = shapeData.geometry.coordinates;
  var latitude = coordinates[1];
  var longitude = coordinates[0];

  if(layer instanceof L.CircleMarker){
    alert("It is a circle marker!");
    openpopup(latitude, longitude, "junction");
  }
  else{
    openpopup(latitude, longitude, "home");
  }
  }

  else if (shapeData.geometry.type === 'LineString') {
    coordinates = shapeData.geometry.coordinates;
    // alert(coordinates);
    // latlan(coordinates);
    let arr = [];
    // Loop through the coordinates array for each point in the line
    for (var i = 0; i < coordinates.length; i++) {
      var latitude = coordinates[i][1];
      var longitude = coordinates[i][0];
      arr.push([longitude, latitude]);
    }
    console.log(arr);
    openpopupforlines(arr);
}
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {
    // Access and update the edited shape data
    var shapeData = layer.toGeoJSON();
    // Store or process the shapeData as needed
  });
});

map.on('draw:created', function (e) {
  var layer = e.layer;
  // Add your code to handle the drawn shape here
  // For example, set a custom property:

  layer.options.name = "My Line";
  layer.addTo(map);
});