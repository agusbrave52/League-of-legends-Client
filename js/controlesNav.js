document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".barra-nav");
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(i => i.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
    
});