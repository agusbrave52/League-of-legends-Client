let Usuario = {
  nombre: 'Usuario',
  estado: 'En Línea',
  nivel: 200,
  experiencia: 40,
  lema: '#URU',
  titulo: 'Ladron',
  rango: 'Oro I',
  desafios: 'Platino',
  skinFavorita: './assets/pj/LucianForajido.jpg',
  icono: './assets/icon-user1.png',
  rp: 2600,
  escencia: 83635
}




document.addEventListener("DOMContentLoaded", function () {
  actualizarPerfil(Usuario);
  inicializarNavSelect();
  iniciarInfos();
  IniciarInfoConMouse();
  togglePerfil();
  toggleEstado();
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
      texto = 'En Línea';
      clase = 'en-linea';
      break;
    case 2:
      texto = 'Ausente';
      clase = 'ausente';
      break;
    case 3:
      texto = 'En Cola';
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
  Usuario.estado = texto;

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
    Usuario.nombre = nuevoUsuario;
    document.querySelector('.usuario').textContent = Usuario.nombre;
    document.querySelector('.usuario-cuadro').textContent = Usuario.nombre;
    document.getElementById('nuevoUsuario').value = ''; // Limpiar el campo de entrada
  }
};

function actualizarPerfil(usuario) {
  document.querySelector('.experiencia').style.setProperty('--percent', usuario.experiencia);
  document.querySelector('.lvl').setAttribute('data-lvl', usuario.nivel);
  document.querySelector('.icon-user').style.backgroundImage = `url(${usuario.icono})`;
  document.querySelector('.icon-user-cuadro').style.backgroundImage = `url('${usuario.icono}')`;
  document.querySelector('.usuario').textContent = usuario.nombre;
  document.querySelector('.usuario-cuadro').textContent = usuario.nombre;
  document.querySelector('.cuadro-info-Perfil').style.backgroundImage = `url(${usuario.skinFavorita})`;
  document.querySelector('#riot-pts-cant').textContent = usuario.rp;
  const esenciaAzul = document.querySelector('#esencia-azul-cant');
  if (Usuario.escencia > 9999) {
    esenciaAzul.textContent = (Usuario.escencia / 1000).toFixed(1) + ' K';
  } else {
    esenciaAzul.textContent = Usuario.escencia;
  }
};

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

  const infoTooltip = document.getElementById('infoTooltip');

  esenciaAzul.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `${Usuario.escencia} Esencia Azul`;
    infoTooltip.style.display = 'flex';
    infoTooltip.style.left = (esenciaAzul.getBoundingClientRect().left - 50) + 'px';
    infoTooltip.style.top = (esenciaAzul.getBoundingClientRect().top + 30) + 'px';
  });

  esenciaAzul.addEventListener('mouseleave', () => {
    infoTooltip.style.display = 'none';
  });

  rp.addEventListener('mousemove', (e) => {
    infoTooltip.textContent = `${Usuario.rp} RP`;
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