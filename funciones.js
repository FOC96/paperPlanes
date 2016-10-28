/* Del inicio de sesión al registro */
function irARegistro(){
    document.getElementById('inicio').style.transition="1s all";
    document.getElementById('inicio').classList.remove('medio');
    document.getElementById('inicio').classList.add('arriba');
    
    document.getElementById('registro').style.transition="1s all";
    document.getElementById('registro').classList.remove('abajo');
    document.getElementById('registro').classList.add('medio');
}

/* Del registro al inicio de sesión */
function volverIniciarSesion(){
    document.getElementById('inicio').style.transition="1s all";
    document.getElementById('inicio').classList.remove('arriba');
    document.getElementById('inicio').classList.add('medio');
    
    document.getElementById('registro').style.transition="1s all";
    document.getElementById('registro').classList.remove('medio');
    document.getElementById('registro').classList.add('abajo');
}

/* Registro de usuario */
function registrarUsuario(){
    n = document.getElementById('nombreReg').value;
    e = document.getElementById('correoReg').value;
    p = document.getElementById('contraReg').value;
    
    
    localStorage.setItem('name', n);
        localStorage.setItem('email', e);
        localStorage.setItem('password', p);
        console.log('Nombre guardado correctamente ' + localStorage.getItem('usuario'));
    
        document.getElementById('nombreReg').value = "";
        document.getElementById('correoReg').value = "";
        document.getElementById('contraReg').value = "";
    
        volverIniciarSesion();
    
        document.getElementById('email').value = localStorage.getItem('email');
        document.getElementById('password').value = localStorage.getItem('password');
    
        setTimeout(verificarCredenciales, 1500);
}

/* Se verifica el correo y contraseña en el inicio de sesión */
function verificarCredenciales(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    
    
    if(email==(localStorage.getItem('email')) && password==(localStorage.getItem('password'))){
        logIn();
    } else{
        mistakesIn('email');
        mistakesIn('password');
        setTimeout(getNormalAgain, 500, 'email');
        setTimeout(getNormalAgain, 500, 'password');
    }
    

    
}

/* El usuario ha ingresado correctamente su correo y contraseña */
function logIn(){
    alert('¡Hola ' + localStorage.getItem('name') + '!');
    window.location.assign('inicioMapa.html')
}
    
/* Hay errores en los campos (recibe parámetros[id]) */
function mistakesIn(x){
    document.getElementById(x).style.color="var(--specialColor)";
    document.getElementById(x).style.transition=".1s all";
    document.getElementById(x).classList.add('animated');
    document.getElementById(x).classList.add('shake');
    document.getElementById(x).style.borderBottomColor="var(--specialColor)";
}

/* Vuelve a la normalidad (recibe parámetros[id]) */
function getNormalAgain(x){
    document.getElementById(x).style.color="white";
    document.getElementById(x).style.transition=".1s all";
    document.getElementById(x).classList.remove('animated');
    document.getElementById(x).classList.remove('shake'); 
    document.getElementById(x).style.borderBottomColor="white";
}


function ubicacion(){
    navigator.geolocation.getCurrentPosition(verPosicion);
}


var map;


window.addEventListener('load', localizar, true);


function localizar(){
    navigator.geolocation.getCurrentPosition(ubicacion);
}


function ubicacion(datos){
    longitud = datos.coords.longitude;
    latitud = datos.coords.latitude;
    initMap();
}

var pinLati;
var pinLongi;
var posPin;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitud, lng: longitud},
    zoom: 18,
    disableDefaultUI: true
  });
    
    
  var marker = new google.maps.Marker({
    position: {lat: latitud, lng: longitud},
    map: map,
    draggable: true,
    icon: 'geoPin1.svg',
    animation: google.maps.Animation.DROP,
  });
    
    google.maps.event.addListener(marker, "position_changed", function() {
      var position = marker.getPosition();
        pinLati = position.lat();
        pinLongi = position.lng();
    });
}





function initMapGuardar() {
  map2 = new google.maps.Map(document.getElementById('geoPinDiv'), {
    center: {lat: pinLati, lng: pinLongi},
    zoom: 18,
    disableDefaultUI: true
  });
    
    
    var markerShow = new google.maps.Marker({
    position: {lat: pinLati, lng: pinLongi},
    map: map2,
    icon: 'hereIAm3.svg',
    title: 'Hello World!'
  });
    
    
    
}

//Función para salir
function exit(){
    window.location.assign('index.html');
}

//Función general para botón Guardar (marcador)
function saveMarker(){
    popUpMarcador();
    initMapGuardar();
    
    
}

//Función para mostrar popUp de Marcador
function popUpMarcador(){
    document.getElementById('fondoBloqueo').style.zIndex="5";
    document.getElementById('divMarcador').style.zIndex="5";
   
    agregarAnimación('divMarcador', 'slideInUp');
    agregarAnimación('fondoBloqueo', 'FadeIn');
    
    
    setTimeout(quitarAnimación, 1000, 'divMarcador', 'slideInUp');
    setTimeout(quitarAnimación, 1000, 'fondoBloqueo', 'FadeIn');
}

//Función para agregar animación (id, nombreDeAnimacion)
function agregarAnimación(etiqueta, animacion){
    document.getElementById(etiqueta).classList.add('animated');
    document.getElementById(etiqueta).classList.add(animacion);
}

//Función para quitar animación (id, nombreDeAnimacion)
function quitarAnimación(etiqueta, animacion){
    document.getElementById(etiqueta).classList.remove('animated');
    document.getElementById(etiqueta).classList.remove(animacion);
}

//Función para quitar el popUp de Marcador
function hidePopUp(){
    
    agregarAnimación('fondoBloqueo', 'FadeOut');
    agregarAnimación('divMarcador', 'slideOutDown');
    
    setTimeout(desaparecerNotif, 1000);
    
    setTimeout(quitarAnimación, 1000, 'divMarcador', 'slideOutDown');
    setTimeout(quitarAnimación, 1000, 'fondoBloqueo', 'FadeOut');
}

//Desaparece el popUp de Marcador
function desaparecerNotif(){
    document.getElementById('fondoBloqueo').style.zIndex="-2";
    document.getElementById('divMarcador').style.zIndex="-2";
}
