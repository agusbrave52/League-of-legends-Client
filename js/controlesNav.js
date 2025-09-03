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
});