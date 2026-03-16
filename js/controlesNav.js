function Usuario(nombre, estado, nivel, experiencia, lema, titulo, rango, desafios, skinFavorita, icono, rp, escencia) {
  this.nombre = nombre;
  this.estado = estado;
  this.nivel = nivel;
  this.experiencia = experiencia;
  this.lema = lema;
  this.titulo = titulo;
  this.rango = rango;
  this.desafios = desafios;
  this.skinFavorita = skinFavorita;
  this.icono = icono;
  this.rp = rp;
  this.escencia = escencia;
}

let usuario = new Usuario('Usuario', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user1.png', 2600, 83635);

let grupoUsuarios = [
  new Usuario('Tilinoso', 'En linea', 150, 30, '#URU1', 'Guerrero', 'Plata II', 'Oro', './assets/pj/LucianForajido.jpg', './assets/icon-user1.png', 2600, 83635),
  new Usuario('Urito', 'Ausente', 100, 20, '#URU2', 'Mago', 'Bronce III', 'Plata', './assets/pj/LucianForajido.jpg', './assets/icon-user2.png', 2600, 83635),
  new Usuario('Valmanway', 'En Cola', 120, 25, '#URU3', 'Asesino', 'Oro III', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user3.png', 2600, 83635),
  new Usuario('Uranaibaba11', 'Partida Casual', 110, 15, '#URU4', 'Soporte', 'Plata I', 'Oro', './assets/pj/LucianForajido.jpg', './assets/icon-user4.png', 2600, 83635),
  new Usuario('MorganFreeman', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user5.png', 2600, 83635),
  new Usuario('MaximoCocceti', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user6.png', 2600, 83635),
  new Usuario('ElGatoBlack', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user7.png', 2600, 83635),
  new Usuario('Paquito', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user8.png', 2600, 83635),
  new Usuario('Benitez', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user9.png', 2600, 83635),
  new Usuario('Tramadol', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user10.png', 2600, 83635),
  new Usuario('Regeder', 'En linea', 200, 40, '#URU', 'Ladron', 'Oro I', 'Platino', './assets/pj/LucianForajido.jpg', './assets/icon-user11.png', 2600, 83635)
];





document.addEventListener("DOMContentLoaded", function () {
  actualizarPerfil(usuario);
  inicializarNavSelect();
  iniciarInfos();
  IniciarInfoConMouse();
  togglePerfil();
  toggleEstado();
  actualizarUsuariosAside();

  const friends = document.getElementsByClassName('friend');
  Array.from(friends).forEach(friend => {
    friend.addEventListener('mouseenter', function () {
      actualizarTarjetaPerfil(grupoUsuarios.find(usuario => usuario.nombre === friend.querySelector('.nombre').textContent));
    });
      friend.addEventListener('mouseleave', function () {
        document.querySelector('.cuadro-info-Perfil').style.display = 'none';
      });
  });
});

document.getElementsByClassName('experiencia')[0].addEventListener('mouseenter', function () {
  document.querySelector('.icon-user-cuadro').style.backgroundImage = `url('${usuario.icono}')`;
  document.querySelector('.usuario-cuadro').textContent = usuario.nombre;
  document.querySelector('.lema-cuadro').textContent = usuario.lema;
  document.querySelector('.titulo-cuadro').textContent = usuario.titulo;
  document.querySelector('.rango-cuadro').textContent = usuario.rango;
  document.querySelector('.desafios-cuadro').textContent = usuario.desafios;
  let estado = document.querySelector('.estado-cuadro');
  estado.classList.remove('en-linea', 'ausente', 'en-cola', 'partida-casual');
  estado.classList.add(usuario.estado.toLowerCase().replace(/ /g, '-'));
  estado.innerHTML = `<i class="estadoIcon"></i><span class="estadoTexto">${usuario.estado}</span>`;
  let cuadro = document.querySelector('.cuadro-info-Perfil');
  cuadro.style.backgroundImage = `url(${usuario.skinFavorita})`;
  cuadro.style.display = 'flex';
  cuadro.style.top = (document.querySelector('.experiencia').getBoundingClientRect().top + 30) + 'px';
});

document.getElementsByClassName('experiencia')[0].addEventListener('mouseleave', function () {
  document.querySelector('.cuadro-info-Perfil').style.display = 'none';
});


//funciones de los controles

function cambiarEstado(direccion = 1) {
  const estadoElem = document.getElementById('estado');
  const estadoCuadro = document.querySelector('.estado-cuadro');
  let estado = parseInt(estadoElem.getAttribute('data-status'));
  estado += direccion;
  if (estado > 4) estado = 1;
  if (estado < 1) estado = 4;
  estadoElem.setAttribute('data-status', estado);

  // Limpia clases previas
  estadoElem.classList.remove('en-linea', 'ausente', 'en-cola', 'partida-casual');
  estadoCuadro.classList.remove('en-linea', 'ausente', 'en-cola', 'partida-casual');

  let texto = '';
  let clase = '';

  switch (estado) {
    case 1:
      texto = 'En línea';
      clase = 'en-linea';
      break;
    case 2:
      texto = 'Ausente';
      clase = 'ausente';
      break;
    case 3:
      texto = 'Mirandose la cola';
      clase = 'en-cola';
      break;
    case 4:
      texto = '1/5 Partida Casual';
      clase = 'partida-casual';
      break;
  }

  // Actualiza ambos estados
  estadoElem.classList.add(clase);
  estadoElem.innerHTML = `<i onclick="cambiarEstado()" class="estadoIcon"></i><span class="estadoTexto" onclick="toggleEstado()">${texto}</span>`;
  estadoCuadro.classList.add(clase);
  estadoCuadro.innerHTML = `<i onclick="cambiarEstado()" class="estadoIcon"></i><span class="estadoTexto" onclick="toggleEstado()">${texto}</span>`;
  usuario.estado = texto;

  IniciarInfoConMouse();
  toggleEstado();
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

  document.getElementById('cerrarSlider').addEventListener('click', function () {
    deslizador.setAttribute('style', 'display: none;');
  });
};

function actualizarExp(value) {
  document.querySelector('.experiencia').style.setProperty('--percent', value);
  usuario.experiencia = value;
};


function generarNumeroAleatorio() {
  const numeroAleatorio = Math.floor(Math.random() * 700) + 1; // Genera un número aleatorio entre 1 y 700
  usuario.nivel = numeroAleatorio;
  document.querySelector('.lvl').setAttribute('data-lvl', usuario.nivel);
};

function cambiarUsuario() {
  const nuevoUsuario = document.getElementById('nuevoUsuario').value;
  if (nuevoUsuario.trim() !== '') {
    usuario.nombre = nuevoUsuario;
    document.querySelector('.usuario').textContent = usuario.nombre;
    document.querySelector('.usuario-cuadro').textContent = usuario.nombre;
    document.getElementById('nuevoUsuario').value = ''; // Limpiar el campo de entrada
  }
};

function actualizarPerfil(usuario) {
  document.querySelector('.experiencia').style.setProperty('--percent', usuario.experiencia);
  document.querySelector('.lvl').setAttribute('data-lvl', usuario.nivel);
  document.querySelector('.icon-user').style.backgroundImage = `url(${usuario.icono})`;
  document.querySelector('.usuario').textContent = usuario.nombre;
  document.querySelector('#riot-pts-cant').textContent = usuario.rp;
  const esenciaAzul = document.querySelector('#esencia-azul-cant');
  if (usuario.escencia > 9999) {
    esenciaAzul.textContent = (usuario.escencia / 1000).toFixed(1) + ' K';
  } else {
    esenciaAzul.textContent = usuario.escencia;
  }
};

function actualizarTarjetaPerfil(usuario) {
  let usuarioParseado = typeof usuario === 'string' ? JSON.parse(usuario) : usuario;
  document.querySelector('.icon-user-cuadro').style.backgroundImage = `url('${usuarioParseado.icono}')`;
  document.querySelector('.usuario-cuadro').textContent = usuarioParseado.nombre;
  document.querySelector('.lema-cuadro').textContent = usuarioParseado.lema;
  document.querySelector('.titulo-cuadro').textContent = usuarioParseado.titulo;
  document.querySelector('.rango-cuadro').textContent = usuarioParseado.rango;
  document.querySelector('.desafios-cuadro').textContent = usuarioParseado.desafios;
  let cuadro = document.querySelector('.cuadro-info-Perfil');
  cuadro.style.display = 'flex';
  let grupoAmigos = document.querySelectorAll('.friend');
  let amigoSeleccionado = Array.from(grupoAmigos).find(amigo => amigo.querySelector('.nombre').textContent === usuarioParseado.nombre);
  cuadro.style.backgroundImage = `url(${usuarioParseado.skinFavorita})`;
  if (amigoSeleccionado) {
    const margen = 12;
    const topAmigo = amigoSeleccionado.getBoundingClientRect().top;
    const altoTarjeta = cuadro.getBoundingClientRect().height;

    let nuevoTop = topAmigo;
    const bottomTarjeta = nuevoTop + altoTarjeta;
    const limiteInferior = window.innerHeight - margen;

    // Si se pasa del borde inferior, la subimos lo necesario
    if (bottomTarjeta > limiteInferior) {
      const desborde = bottomTarjeta - limiteInferior;
      nuevoTop = Math.max(margen, nuevoTop - desborde);
    }
    cuadro.style.top = `${nuevoTop}px`;
  }
  let estado = document.querySelector('.estado-cuadro');
  estado.classList.remove('en-linea', 'ausente', 'en-cola', 'partida-casual');
  estado.classList.add(usuarioParseado.estado.toLowerCase().replace(/ /g, '-'));
  estado.innerHTML = `<i class="estadoIcon"></i><span class="estadoTexto">${usuarioParseado.estado}</span>`;
  
}

function inicializarNavSelect() {
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

  navItems.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      btn.style.setProperty('--mouse-x', `${x}px`);
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.setProperty('--mouse-x', `50%`);
    });
  });

  document.querySelector('.tft').addEventListener('click', function () {
    document.getElementById('video-fondo').src = './assets/fondoTFT.mp4';
  });

  document.querySelector('.lol').addEventListener('click', function () {
    document.getElementById('video-fondo').src = './assets/fondoLucian.mp4';
  });
};

function iniciarInfos() {
  const esenciaAzul = document.querySelector('.esencia-azul');
  const rp = document.querySelector('.riot-pts');
  const barraAccess = document.querySelector('#barra-access');
  const tienda = document.querySelector('.tienda');
  const botin = document.querySelector('.botin');
  const coleccion = document.querySelector('.coleccion');
  const clash = document.querySelector('.clash');
  const desafios = document.querySelector('.desafios');
  const lor = document.querySelector('#lor');
  const add_friend = document.querySelector('.addFriend');
  const folder_icon = document.querySelector('.fa-folder-plus');
  const options_icon = document.querySelector('.fa-list');
  const filtro_icon = document.querySelector('.fa-search');

  const infoTooltip = document.getElementById('infoTooltip');

  esenciaAzul.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `${usuario.escencia} Esencia Azul`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (esenciaAzul.getBoundingClientRect().left - 50) + 'px';
    infoTooltip.style.top = (esenciaAzul.getBoundingClientRect().top + 30) + 'px';
  });

  esenciaAzul.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  rp.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `${usuario.rp} RP`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (rp.getBoundingClientRect().left - 10) + 'px';
    infoTooltip.style.top = (rp.getBoundingClientRect().top + 35) + 'px';
  });

  rp.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  barraAccess.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Programa de Recompensas`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (barraAccess.getBoundingClientRect().left - 70) + 'px';
    infoTooltip.style.top = (barraAccess.getBoundingClientRect().top + 72) + 'px';
  });

  barraAccess.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  tienda.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Tienda`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (tienda.getBoundingClientRect().left - 0) + 'px';
    infoTooltip.style.top = (tienda.getBoundingClientRect().top + 102) + 'px';
  });

  tienda.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  botin.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Botín`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (botin.getBoundingClientRect().left + 2) + 'px';
    infoTooltip.style.top = (botin.getBoundingClientRect().top + 102) + 'px';
  });

  botin.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  coleccion.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Colección`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (coleccion.getBoundingClientRect().left - 10) + 'px';
    infoTooltip.style.top = (coleccion.getBoundingClientRect().top + 102) + 'px';
  });

  coleccion.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  clash.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Clash`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (clash.getBoundingClientRect().left + 2) + 'px';
    infoTooltip.style.top = (clash.getBoundingClientRect().top + 102) + 'px';
  });

  clash.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  desafios.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Desafíos del Crepúsculo: Acto I`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (desafios.getBoundingClientRect().left - 80) + 'px';
    infoTooltip.style.top = (desafios.getBoundingClientRect().top + 102) + 'px';
  });

  desafios.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  lor.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Juega Legends of Runeterra`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (lor.getBoundingClientRect().left - 50) + 'px';
    infoTooltip.style.top = (lor.getBoundingClientRect().top + 50) + 'px';
  });

  lor.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  add_friend.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Agregar amigo`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (add_friend.getBoundingClientRect().left - 45) + 'px';
    infoTooltip.style.top = (add_friend.getBoundingClientRect().top + 30) + 'px';
  });

  add_friend.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  folder_icon.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Crear carpeta`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (folder_icon.getBoundingClientRect().left - 40) + 'px';
    infoTooltip.style.top = (folder_icon.getBoundingClientRect().top + 30) + 'px';
  });

  folder_icon.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  options_icon.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Opciones`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (options_icon.getBoundingClientRect().left - 40) + 'px';
    infoTooltip.style.top = (options_icon.getBoundingClientRect().top + 30) + 'px';
  });

  options_icon.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  filtro_icon.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `Filtrar`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (filtro_icon.getBoundingClientRect().left - 75) + 'px';
    infoTooltip.style.top = (filtro_icon.getBoundingClientRect().top) + 'px';
  });

  filtro_icon.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });
};

function IniciarInfoConMouse() {
  // Elementos del DOM para controles
  const slider = document.getElementById('expRange');
  const btnNumero = document.getElementById('generarNumero');
  const iTextNuevoUsuario = document.getElementById('nuevoUsuario');
  const btnNuevoUsuario = document.getElementById('nuevoUsuarioBTN');
  const btnNotificaciones = document.querySelector('.notificaciones');
  const inputEstado = document.querySelector('.estadoIcon');
  const btnPerfil = document.querySelector('.boton-perfil');
  const estado = document.querySelector('.estadoTexto');

  const infoTooltip = document.getElementById('info-mouse');

  /* control del slider para que siga al mouse */
  slider.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Cambiar experiencia: ${slider.value}%`;
    infoTooltip.style.left = (e.clientX - 80) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  slider.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del btn para que siga al mouse */
  btnNumero.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Generar Nivel Aleatorio: ${document.querySelector('.lvl').getAttribute('data-lvl')}`;
    infoTooltip.style.left = (e.clientX - 80) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  btnNumero.addEventListener('click', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Generar Nivel Aleatorio: ${document.querySelector('.lvl').getAttribute('data-lvl')}`;
    infoTooltip.style.left = (e.clientX - 80) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  btnNumero.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del Input para que siga al mouse */
  iTextNuevoUsuario.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Cambiar Usuario`;
    infoTooltip.style.left = (e.clientX - 80) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  iTextNuevoUsuario.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  btnNuevoUsuario.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Cambiar Usuario`;
    infoTooltip.style.left = (e.clientX - 80) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  btnNuevoUsuario.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del cartelNotificaciones del btn para que siga al mouse */
  btnNotificaciones.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Notificaciones`;
    infoTooltip.style.left = (e.clientX - 145) + 'px';
    infoTooltip.style.top = (e.clientY - 10) + 'px';
  });

  btnNotificaciones.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del cartelEstado del btn para que siga al mouse */
  inputEstado.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Cambiar Estado`;
    infoTooltip.style.left = (e.clientX - 65) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  inputEstado.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del cartelPerfil del btn para que siga al mouse */
  btnPerfil.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.innerHTML = `Activar Modo <br>Desarrollador`;
    infoTooltip.style.left = (e.clientX - 140) + 'px';
    infoTooltip.style.top = (e.clientY - 10) + 'px';
  });

  btnPerfil.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  /* control del cartelEstado del btn para que siga al mouse */
  estado.addEventListener('mousemove', (e) => {
    infoTooltip.style.display = 'block';
    infoTooltip.textContent = `Estado Personalizado`;
    infoTooltip.style.left = (e.clientX - 65) + 'px';
    infoTooltip.style.top = (e.clientY + 15) + 'px';
  });

  estado.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });
};

function togglePerfil() {
  const txtUsuario = document.querySelector('.usuario');
  const iconoUsuario = document.querySelector('.experiencia');
  const txtVerPerfil = document.querySelector('.ver-perfil');
  const btnNotificaciones = document.querySelector('.notificaciones');
  const inputEstado = document.getElementById('estado');

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
};

function toggleEstado() {
  const estado = document.querySelector('.estadoTexto');
  const inputEstado = document.querySelector('.cambiar-estado');

  estado.addEventListener('click', () => {
    inputEstado.style.display = 'block';
    inputEstado.value = "";
    inputEstado.style.left = (estado.getBoundingClientRect().left - 50) + 'px';
    inputEstado.style.top = (estado.getBoundingClientRect().top + 30) + 'px';
    inputEstado.focus();
  });
  inputEstado.addEventListener('blur', () => {
    inputEstado.style.display = 'none';
  });

  inputEstado.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const nuevoEstado = inputEstado.value.trim();
      if (nuevoEstado !== '') {
        estado.textContent = `"${nuevoEstado}"`;
        const estadoCuadro = document.querySelector('.estado-cuadro');
        estadoCuadro.textContent = nuevoEstado;
      }
      else if (nuevoEstado === '') {
        document.querySelector('.estado-cuadro').textContent = Usuario.estado;
        document.querySelector('.estadoTexto').textContent = Usuario.estado;
      }
      inputEstado.style.display = 'none';
    }
  });
};

function actualizarUsuariosAside() {
  let amigos = document.querySelector('.container-friends');
  let append = ``;
  grupoUsuarios.forEach((usuario) => {
    // al pasar mouse por encima del amigo, se actualiza la tarjeta de perfil con su info
    append += ` <div class="friend">
                  <img class="icon" src="${usuario.icono}" alt="iconuser" height="40 px" width="40 px">
                  <div class="info">
                    <p class="nombre">${usuario.nombre}</p>
                    <p class="status ${usuario.estado.toLowerCase().replace(/ /g, '-')}"><i></i>${usuario.estado}</p>
                  </div>
                </div>`;

  });
  amigos.innerHTML = append;
};

function expandirAmigos() {
  const amigos = document.querySelector('.container-friends');
  const generalAside = document.querySelector('.titulo-aside');

  if (generalAside.textContent.search('▾') == 0) {
    generalAside.textContent = generalAside.textContent.replace('▾', '▸');
    amigos.style.display = 'none';
  }
  else {
    generalAside.textContent = generalAside.textContent.replace('▸', '▾');
    amigos.style.display = 'flex';
  }
};

