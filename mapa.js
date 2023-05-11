//COLOCAR MAPA EN PANTALLA
const mapContainer = document.getElementById('contenedor-mapa');

const map = L.map(mapContainer).setView([-35.65662, -63.75682], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//COLOCAR MAPA EN PANTALLA

//marcador lindo
var marker = L.marker([-35.6479966,-63.7537031]).addTo(map);
marker.bindPopup("<b>We Are Here</b><br>PD: Mate.B <3").openPopup();
//marcador lindo

//Elementos para la busqueda
const buscadorTexto = document.getElementById('buscador-text');
const resultados = document.getElementById('ubicaciones');
const marcador = [];
//Elementos para la busqueda

//Detectar la info del Buscador de texto
document.getElementById('btn-buscar').addEventListener('click', () => {
    const query = buscadorTexto.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
            setresultados(parsedResult);
        });
});
//Detectar la info del Buscador de texto


function setresultados(parsedResult) {
    resultados.innerHTML = "";
    for (const marker of marcador) {
        map.removeLayer(marker);
    }
    map.flyTo(new L.LatLng(20.13847, 1.40625), 2);
    for (const result of parsedResult) {
        const li = document.createElement('li');    //crear cada opcion para la lista de ubicaciones
        li.classList.add('list-group-item', 'list-group-item-action');
        li.innerHTML = JSON.stringify({
            displayName: result.display_name,   //valores que se muestran de las ubicaciones
            lat: result.lat,                    //valores que se muestran de las ubicaciones
            lon: result.lon                     //valores que se muestran de las ubicaciones
        }, undefined, 2);
        li.addEventListener('click', (event) => {       //acercarse a la ubicacion seleccionada
            for(const child of resultados.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            map.flyTo(position, 10);
        })
        const position = new L.LatLng(result.lat, result.lon);  //poner los marcadores en las ubicaciones
        marcador.push(new L.marker(position).addTo(map));
        resultados.appendChild(li);
    }
}