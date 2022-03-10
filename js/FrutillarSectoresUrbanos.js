var sheetsUrlFrutillarUrbanSections = "https://docs.google.com/spreadsheets/d/1-IzvBnyjVrnNsiQfF_mDd-0FCfGidFnXMQKt76goPts/pub?gid=0&single=true&output=csv";

function init() {
	Papa.parse(sheetsUrlFrutillarUrbanSections, {
		download: true,
		header: true,
		skipEmptyLines: true,
		complete: function (frutillarUrbanSectorsResults) {
			mapSheetData(frutillarUrbanSectorsResults.data)
		}
	})
}


function mapSheetData(sheetData) {
	sheetData.map((data, index) => {
		data.geometry ? addPolygonssectoresurbanos(data) : delete data
	})
}

function addPolygonssectoresurbanos(data) {

	var frutillarUrbanSectorsCoordinates = JSON.parse(data.geometry);

	var polygonssectoresurbanos = {
		"type": "FeatureCollection",
		"features": []
	}

	polygonssectoresurbanos.features.push({
		"type": "Feature",
		"geometry": {
			"type": "MultiPolygon",
			"coordinates": frutillarUrbanSectorsCoordinates
		},
		"properties": {
			"Nombre": data.nombre,
			"Foto": data.foto,
		}
	});

	polygonMarkerssectoresurbanos = L.geoJSON(polygonssectoresurbanos, {

		style: function (Feature) {
			switch (Feature.properties.Nombre) {
				case "Frutillar Alto": return { "color": "#ac86a4", "opacity": 0.3 };
				case "Frutillar Bajo": return { "color": "#006aff", "opacity": 0.3 };
				case "Pantanosa": return { "color": "#f1ab84", "opacity": 0.3 };
			}
		},

		onEachFeature: function (Feature, layer) {
			layer.bindPopup(
				"<h3>" + Feature.properties.Nombre + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>" + "<img src=" + Feature.properties.Foto + " width=100%>");
		}
	}).addTo(urb);
}

window.addEventListener('DOMContentLoaded', init)