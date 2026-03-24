const primaryNav = document.querySelector('#navlist');
const navToggle = document.querySelector('#mbutt');
const opeN = document.querySelector('#open');
const closE = document.querySelector('#close');

function toggleNav({ target }) {
    const visibility = navToggle.getAttribute('aria-expanded');

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute('aria-expanded', true);
        opeN.style.display = "none";
        closE.style.display = "block";
    } else if (visibility === "true") {
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute('aria-expanded', false);
        opeN.style.display = "block";
        closE.style.display = "none";
    }
    console.log(visibility);
}

navToggle.addEventListener('click', toggleNav);

// give the header a display of sticky
// after the user scrolls below 200 pixels
const nav = document.getElementById("navlist")

window.onscroll = function () {
    if (window.scrollY > 200) {
        nav.classList.add("sticky");
        nav.classList.remove("container");
    }
}