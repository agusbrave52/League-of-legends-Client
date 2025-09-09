const exp_lvl = 40; //porcentaje de experiencia (0-100)
const lvl = 319; //nivel del jugador

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

    document.querySelector('.experincia').style.setProperty('--percent', exp_lvl ); // Cambia el valor a tu porcentaje deseado
    document.querySelector('.lvl').setAttribute('data-lvl', lvl); // Cambia el valor a tu nivel deseado

});

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
            break;
        case 2:
            document.querySelector('#estado').classList.add('ausente');
            document.querySelector('#estado').innerHTML = '<i></i>Ausente';
            break; 
        case 3:
            document.querySelector('#estado').classList.add('en-cola');
            document.querySelector('#estado').innerHTML = '<i></i>En Cola';
            break;
        case 4:
            document.querySelector('#estado').classList.add('partida-casual');
            document.querySelector('#estado').innerHTML = '<i></i>1/5 Partida Casual';
            break;
    }

};

function cambiarActive() {
    document.querySelector('.notificaciones').classList.toggle('active');
}
