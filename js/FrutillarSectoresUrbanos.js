var sheetsUrlSectoresUrbanosFrutillar ="https://docs.google.com/spreadsheets/d/1-IzvBnyjVrnNsiQfF_mDd-0FCfGidFnXMQKt76goPts/edit#gid=0";

function init() {
    Tabletop.init({
        key: sheetsUrlSectoresUrbanosFrutillar,
		debug: true,
        callback: addPolygonssectoresurbanos,
		simpleSheet: true
		//proxy:	
	})
}

function addPolygonssectoresurbanos (data, tabletop) {
	
	var polygonssectoresurbanos = {
	"type": "FeatureCollection",
	"features": []
	}
	
	for (var row in data){
		var coords = JSON.parse(data[row].geometry);
			
		polygonssectoresurbanos.features.push({
			"type": "Feature",
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": coords
			},
			"properties": {
				"Nombre": data[row].nombre,
				"Foto": data[row].foto,
			}
			});
						
		polygonMarkerssectoresurbanos = L.geoJSON(polygonssectoresurbanos, {
			style: function (Feature) {
				switch (Feature.properties.Nombre){
					case "Frutillar Alto": return {"color": "#ac86a4", "opacity": 0.3};
					case "Frutillar Bajo": return {"color": "#006aff", "opacity": 0.3};
					case "Pantanosa": return {"color": "#f1ab84", "opacity": 0.3};
				}
			},	
			onEachFeature: function (Feature, layer) {
				layer.bindPopup(
					"<h3>"+Feature.properties.Nombre+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>"+"<img src="+Feature.properties.Foto+" width=100%>");
			}
		}).addTo(urb);		
	}
	console.log(data);  
}

window.addEventListener('DOMContentLoaded', init)