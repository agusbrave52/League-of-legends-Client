let Usuario = {
    nombre: 'Invocador1',
    estado: 'En Línea',
    nivel: 200,
    experiencia: 40,
    lema: '#URU',
    titulo: 'Ladron',
    rango: 'Oro I',
    desafios: 'Platino',
    skinFavorita: './assets/pj/LucianForajido.jpg',
    icono: './assets/icon-user1.png'
}

// Elementos del DOM para controles
const slider = document.getElementById('expRange');
const cartelSlider = document.getElementById('cantidad-experiencia');

const btnNumero = document.getElementById('generarNumero');
const cartelBtn = document.getElementById('numero-aleatorio');

const iTextNuevoUsuario = document.getElementById('nuevoUsuario');
const btnNuevoUsuario = document.getElementById('nuevoUsuarioBTN');
const cartelNuevoUsuario = document.getElementById('cambiar-usuario');

const btnNotificaciones = document.querySelector('.notificaciones');
const cartelNotificaciones = document.querySelector('.cambiar-active');

const inputEstado = document.getElementById('estado');
const cartelEstado = document.querySelector('.cambiar-estado');

const btnPerfil = document.querySelector('.boton-perfil');
const cartelPerfil = document.querySelector('#boton-perfil-info');

const txtUsuario = document.querySelector('.usuario');
const iconoUsuario = document.querySelector('.experiencia');
const txtVerPerfil = document.querySelector('.ver-perfil');



document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".barra-nav-select");
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(i => {
                i.classList.remove("selected");
                i.querySelector(".flechita")?.remove();
            });
            this.classList.add("selected");
            this.appendChild(document.createElement("div")).classList.add("flechita");
        });
    });

    document.querySelectorAll('.barra-nav-select').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            btn.style.setProperty('--mouse-x', `${x}px`);
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.setProperty('--mouse-x', `50%`);
        });
    });

    document.querySelector('.experiencia').style.setProperty('--percent', Usuario.experiencia); // Cambia el valor a tu porcentaje deseado
    document.querySelector('.lvl').setAttribute('data-lvl', Usuario.nivel); // Cambia el valor a tu nivel deseado
    document.querySelector('.icon-user').style.backgroundImage = `url(${Usuario.icono})`; // Cambia el valor a tu nombre deseado
    document.querySelector('.icon-user-cuadro').style.backgroundImage = `url(${Usuario.icono})`; // Cambia el valor a tu nombre deseado

    document.querySelector('.cuadro-info-Perfil').setAttribute('style', `background-image: url(${Usuario.skinFavorita});`);

});

/* control del cartelSlider del slider para que siga al mouse */
slider.addEventListener('mousemove', (e) => {
  cartelSlider.style.display = 'block';
  cartelSlider.style.left = (e.clientX - 80) + 'px';
  cartelSlider.style.top = (e.clientY + 5) + 'px';
});

slider.addEventListener('mouseleave', () => {
  cartelSlider.style.display = 'none';
});

/* control del cartelBtn del btn para que siga al mouse */
btnNumero.addEventListener('mousemove', (e) => {
  cartelBtn.style.display = 'block';
  cartelBtn.style.left = (e.clientX - 80) + 'px';
  cartelBtn.style.top = (e.clientY + 5) + 'px';
});

btnNumero.addEventListener('mouseleave', () => {
  cartelBtn.style.display = 'none';
});


/* control del cartelInput del Input para que siga al mouse */
iTextNuevoUsuario.addEventListener('mousemove', (e) => {
  cartelNuevoUsuario.style.display = 'block';
  cartelNuevoUsuario.style.left = (e.clientX - 80) + 'px';
  cartelNuevoUsuario.style.top = (e.clientY + 5) + 'px';
});

iTextNuevoUsuario.addEventListener('mouseleave', () => {
  cartelNuevoUsuario.style.display = 'none';
});

btnNuevoUsuario.addEventListener('mousemove', (e) => {
  cartelNuevoUsuario.style.display = 'block';
  cartelNuevoUsuario.style.left = (e.clientX - 80) + 'px';
  cartelNuevoUsuario.style.top = (e.clientY + 5) + 'px';
});

btnNuevoUsuario.addEventListener('mouseleave', () => {
  cartelNuevoUsuario.style.display = 'none';
});

/* control del cartelNotificaciones del btn para que siga al mouse */
btnNotificaciones.addEventListener('mousemove', (e) => {
  cartelNotificaciones.style.display = 'block';
  cartelNotificaciones.style.left = (e.clientX - 145) + 'px';
  cartelNotificaciones.style.top = (e.clientY - 10) + 'px';
});

btnNotificaciones.addEventListener('mouseleave', () => {
  cartelNotificaciones.style.display = 'none';
});

/* control del cartelEstado del btn para que siga al mouse */
inputEstado.addEventListener('mousemove', (e) => {
  cartelEstado.style.display = 'block';
  cartelEstado.style.left = (e.clientX -65) + 'px';
  cartelEstado.style.top = (e.clientY + 10) + 'px';
});

inputEstado.addEventListener('mouseleave', () => {
  cartelEstado.style.display = 'none';
});

/* control del cartelPerfil del btn para que siga al mouse */
btnPerfil.addEventListener('mousemove', (e) => {
  cartelPerfil.style.display = 'block';
  cartelPerfil.style.left = (e.clientX - 140) + 'px';
  cartelPerfil.style.top = (e.clientY - 10) + 'px';
});

btnPerfil.addEventListener('mouseleave', () => {
  cartelPerfil.style.display = 'none';
});

iconoUsuario.addEventListener('mousemove', (e) => {
    txtUsuario.style.display = 'none';
    inputEstado.style.display = 'none';
    btnNotificaciones.style.display = 'none';
    txtVerPerfil.style.display = 'block';
});
iconoUsuario.addEventListener('mouseleave', () => {
    txtUsuario.style.display = 'block';
    inputEstado.style.display = 'block';
    btnNotificaciones.style.display = 'block';
    txtVerPerfil.style.display = 'none';
});



//funciones de los controles

function cambiarEstado() {
    let estado = parseInt(document.querySelector('#estado').getAttribute('data-status'));
    estado++;
    if (estado > 4) estado = 1;
    document.querySelector('#estado').setAttribute('data-status', estado);
    document.querySelector('#estado').classList.remove('en-linea', 'ausente', 'en-cola', 'partida-casual');
    switch (estado) {
        case 1:
            document.querySelector('#estado').classList.add('en-linea');
            document.querySelector('#estado').innerHTML = '<i></i>En Línea';
            Usuario.estado = 'En Línea';
            break;
        case 2:
            document.querySelector('#estado').classList.add('ausente');
            document.querySelector('#estado').innerHTML = '<i></i>Ausente';
            Usuario.estado = 'Ausente';
            break;
        case 3:
            document.querySelector('#estado').classList.add('en-cola');
            document.querySelector('#estado').innerHTML = '<i></i>Mirandose la Cola';
            Usuario.estado = 'Mirandose la Cola';
            break;
        case 4:
            document.querySelector('#estado').classList.add('partida-casual');
            document.querySelector('#estado').innerHTML = '<i></i>1/5 Partida Clasificatoria';
            Usuario.estado = '1/5 Partida Clasificatoria';
            break;
    }
};

function cambiarActive() {
    document.querySelector('.notificaciones').classList.toggle('active');
};

function abrirDeslizador() {
    const deslizador = document.querySelector('.slider-exp');
    if (deslizador.style.display === 'block') {
        deslizador.setAttribute('style', 'display: none;');
    } else {
        deslizador.setAttribute('style', 'display: block;');
    }
};

function actualizarExp(value) {
    document.querySelector('.experiencia').style.setProperty('--percent', value);
    Usuario.experiencia = value;
};

function generarNumeroAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 700) + 1; // Genera un número aleatorio entre 1 y 700
    Usuario.nivel = numeroAleatorio;
    document.querySelector('.lvl').setAttribute('data-lvl', Usuario.nivel);
};

function cambiarUsuario() {
    const nuevoUsuario = document.getElementById('nuevoUsuario').value;
    if (nuevoUsuario.trim() !== '') {
        document.querySelector('.usuario').textContent = nuevoUsuario;
        document.getElementById('nuevoUsuario').value = ''; // Limpiar el campo de entrada
        Usuario.nombre = nuevoUsuario;
    }
};

