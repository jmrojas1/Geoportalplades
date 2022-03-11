var sheetsUrlPolygons = "https://docs.google.com/spreadsheets/d/1c9hQIF4pDICQnuHlJ_u56ZEsdHsN351NFUu26gmgjRU/pub?gid=0&single=true&output=csv";

function addPolygons(data) {
	
	var polygonCoordinates = JSON.parse(data.geometry);

	var polygons = {
		"type": "FeatureCollection",
		"features": []
	}

	var polygonsplanmaestroplades = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#d76780",
		"fillOpacity": 0.1,
		"pane": "PolygonsPane"
	}

	var polygonsgestlocalbarrios = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#50a6b7",
		"fillOpacity": 0.1,
		"pane": "PolygonsPane"
	}

	var polygonsconveniomunicip = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#dbc85e",
		"fillOpacity": 0.1,
		"pane": "PolygonsPane"
	}

	var polygonscentroplades = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#9bbe6b",
		"fillOpacity": 0.1,
		"pane": "PolygonsPane"
	}

	var polygonsmunicipalidad = {
		"color": "#1f140f",
		"weight": 2,
		"opacity": 0.4,
		"fillColor": "#ff9f71",
		"fillOpacity": 0.1,
		"pane": "PolygonsPane"
	}


	polygons.features.push({
		"type": "Feature",
		"geometry": {
			"type": "MultiPolygon",
			"coordinates": polygonCoordinates
		},
		"properties": {
			"Nombre": data.nombre,
			"Categoria": data.categoria,
			"Subcategoria": data.subcategoria,
			"Descripcion": data.descripcion,
			"Institucionejecutora": data.institucionejecutora,
			"ProgramaoFondo": data.programaofondo,
			"Estado": data.estado,
			"Fechainicio": data.fechainicio,
			"Fechatermino": data.fechatermino,
			"Beneficiarios": data.beneficiarios,
			"Direccion": data.direccion,
			"Foto": data.foto,
			"Hipervinculo": data.hipervinculo
		}
	});

	PolygonMarkers = L.geoJSON(polygons, {

		style: function (Feature) {
			switch (Feature.properties.Categoria) {
				case "Plan Maestro Plades": return polygonsplanmaestroplades;
				case "Gestión local y barrios": return polygonsgestlocalbarrios;
				case "Proyectos convenio municipal 2019-2020": return polygonsconveniomunicip;
				case "Centro Plades": return polygonscentroplades;
				case "Municipalidad": return polygonsmunicipalidad;
			}
		},

		onEachFeature: function (Feature, layer) {

			layer.bindPopup("<b>" + Feature.properties.Nombre + "</b>");
			layer.on({ click: openSidebar });

			function openSidebar(e) {
				sidebar.show();
				{
					sidebar.setContent("<h3>" + "<a href=" + Feature.properties.Hipervinculo + " target=_blank>" + Feature.properties.Nombre + "</a></h3>" + "<img src = " + Feature.properties.Foto + " width=100%>" + "<p>" + Feature.properties.Descripcion + "</p>" + "<ul>" + "<li><b>Instituci&oacute;n ejecutora:&nbsp;</b>" + Feature.properties.Institucionejecutora + "</li>" + "<li><b>Programa o Fondo:&nbsp;</b>" + Feature.properties.ProgramaoFondo + "</li>" + "<li><b>Estado:&nbsp;</b>" + Feature.properties.Estado + "</li>" + "<li><b>Fecha inicio:&nbsp;</b>" + Feature.properties.Fechainicio + "</li>" + "<li><b>Fecha t&eacute;rmino:&nbsp;</b>" + Feature.properties.Fechatermino + "</li>" + "<li><b>Beneficiarios:&nbsp;</b>" + Feature.properties.Beneficiarios + "</li>" + "<li><b>Direcci&oacute;n:&nbsp;</b>" + Feature.properties.Direccion + "</li>" + "</ul>")
				}
			};

			switch (Feature.properties.Subcategoria) {
				case "Vialidad y transporte": return vyt.addLayer(layer);
				case "Áreas verdes": return av.addLayer(layer);
				case "Equipamiento social y centro cívico": return eqycc.addLayer(layer);
				case "Recuperación de barrios": return recbar.addLayer(layer);
				case "Gestión local y barrios": return glybar.addLayer(layer);
				case "Proyectos convenio municipal 2019-2020": return prymun.addLayer(layer);
				case "Centro Plades": return ctrpld.addLayer(layer);
				case "Seguridad pública": return segpub.addLayer(layer);
				case "Red eléctrica": return redelec.addLayer(layer);
				case "Soluciones sanitarias": return solsan.addLayer(layer);
				case "Agua Potable Rural (APR)": return apr.addLayer(layer);
				case "Fondo de Apoyo a la Educación Pública (FAEP)": return faep.addLayer(layer);
				case "Fondo Nacional de Desarrollo Regional (FNDR)": return fndr.addLayer(layer);
				case "Fondo Regional de Iniciativa Local (FRIL)": return fril.addLayer(layer);
				case "Plan Mejoramiento urbano (PMU)": return pmu.addLayer(layer);
				case "Terrenos vivienda/municipales": return vivmun.addLayer(layer);
				case "Posibles proyectos": return posib.addLayer(layer);
				case "Otros proyectos": return otros.addLayer(layer);
			};
		}
	});
}


function init() {
	Papa.parse(sheetsUrlPolygons, {
		download: true,
		header: true,
		skipEmptyLines: true,
		complete: function (polygonsResults) {
			var polygonsData = polygonsResults.data
			
			polygonsData.map((data, index) => {
				data.geometry ? addPolygons(data) : linesData.splice(index, 1)
			})
		}
	})
}

window.addEventListener('DOMContentLoaded', init)