var imageVisParam = {"opacity":1,"bands":["PM25_RH35_GCC"],"min":0,"max":130,"palette":["000000","78f9ff","4dff5a","ff8150","ff0202"]};

//--------------Média Março 2024--------------//

// Carrega o dataset de limites administrativos do Brasil
var brasil = ee.FeatureCollection('FAO/GAUL/2015/level1')
  .filter(ee.Filter.eq('ADM1_NAME', 'Roraima')); // Filtra para o estado de Roraima

var geosCf = ee.ImageCollection('NASA/GEOS-CF/v1/fcst/tavg1hr');

Map.setCenter(-61.211, 1.784, 6);

var mensalPM25 =
    geosCf.select('PM25_RH35_GCC').filterDate('2024-03-01', '2024-03-31') //Data
    .mean().clip(brasil); // Clip com o limite de Roraima

Map.addLayer(mensalPM25, imageVisParam, 'Marco Pm2.5', true, 1); //Nome

Export.image.toDrive({
  image: mensalPM25,
  description: 'PM25_NasaGeos_Mar24',
  crs: 'EPSG:4326',
  scale: 27750, // Especifica a resolução espacial em metros
  region: brasil.geometry().bounds() // Define a região de interesse para exportação
});
