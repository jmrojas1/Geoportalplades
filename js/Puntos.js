var sheetsUrlPuntos ="https://docs.google.com/spreadsheets/d/1ivSOvLzHI8z7hG0KqPcmTdHr2kJ7iZ2S3md-ruGHDMQ/edit#gid=0"

function init() {
    Tabletop.init({
        key: sheetsUrlPuntos,
		debug: true,
        callback: addPoints,
		simpleSheet: true
	})
}

function addPoints (data, tabletop) {
	
	var points = {
	"type": "FeatureCollection",
	"features": []
	}
	
	for (var row in data){
		
		var coords = JSON.parse(data[row].geometry);
		points.features.push({
			"type": "Feature",
			"geometry": {
				"type": "MultiPoint",
				"coordinates": coords
			},
			"properties": {
				"Nombre": data[row].nombre,
				"Categoria": data[row].categoria,
				"Subcategoria": data[row].subcategoria,
				"Descripcion": data[row].descripcion,
				"Institucionejecutora": data[row].institucionejecutora,
				"ProgramaoFondo": data[row].programaofondo,
				"Estado": data[row].estado,
				"Fechainicio": data[row].fechainicio,
				"Fechatermino": data[row].fechatermino,
				"Beneficiarios": data[row].beneficiarios,
				"Direccion": data[row].direccion,
				"Foto": data[row].foto,
				"Hipervinculo": data[row].hipervinculo
			}
		});
				
		PointMarkers = L.geoJSON(points, {
			pointToLayer: function (Feature, coords){
				switch (Feature.properties.Categoria){
					case "Plan Maestro Plades": return L.circleMarker (coords, {
						color: "#1f140f",
						weight: 1,
						radius: 8, 						
						fillColor: "#d76780",
						pane: "PointsPane"});
					case "Gestión local y barrios": return L.circleMarker (coords, {
						color: "#1f140f",
						weight: 1,
						radius: 8, 
						fillColor: "#50a6b7",
						pane: "PointsPane"});
					case "Proyectos convenio municipal 2019-2020": return L.circleMarker (coords, {
						color: "#1f140f",
						weight: 1,
						radius: 8, 
						fillColor: "#dbc85e",
						pane: "PointsPane"});
					case "Centro Plades": return L.circleMarker (coords, {
						color: "#1f140f",
						weight: 1,
						radius: 8, 
						fillColor: "#9bbe6b",
						pane: "PointsPane"});
					case "Municipalidad": return L.circleMarker (coords, {
						color: "#1f140f", 
						weight: 1,
						radius: 8, 
						fillColor: "#ff9f71",
						pane: "PointsPane"});
					case "Los Lagos": return L.circleMarker (coords, {
						color: "#da597a",
						weight: 1,
						radius: 8,
						fillColor: "#da597a",
						pane: "PointsPane"});
				}
			},	
			onEachFeature: function (Feature, layer) {
				layer.bindPopup("<b>"+Feature.properties.Nombre+"</b>");
				layer.on({click: openSidebar});
				function openSidebar(e){
					sidebar.show();
					{sidebar.setContent("<h3>"+"<a href="+Feature.properties.Hipervinculo+" target=_blank>"+Feature.properties.Nombre+"</a></h3>"+"<img src = "+Feature.properties.Foto+" width=100%>"+"<p>"+Feature.properties.Descripcion+"</p>"+"<ul>"+"<li><b>Instituci&oacute;n ejecutora:&nbsp;</b>"+Feature.properties.Institucionejecutora+"</li>"+"<li><b>Programa o Fondo:&nbsp;</b>"+Feature.properties.ProgramaoFondo+"</li>"+"<li><b>Estado:&nbsp;</b>"+Feature.properties.Estado+"</li>"+"<li><b>Fecha inicio:&nbsp;</b>"+Feature.properties.Fechainicio+"</li>"+"<li><b>Fecha t&eacute;rmino:&nbsp;</b>"+Feature.properties.Fechatermino+"</li>"+"<li><b>Beneficiarios:&nbsp;</b>"+Feature.properties.Beneficiarios+"</li>"+"<li><b>Direcci&oacute;n:&nbsp;</b>"+Feature.properties.Direccion+"</li>"+"</ul>")
					}
				};		
				switch (Feature.properties.Subcategoria){
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
	console.log(data);  
}

window.addEventListener('DOMContentLoaded', init)
