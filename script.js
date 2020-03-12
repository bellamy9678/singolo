window.onload = function() {
    
    const MENU = document.querySelector('.options__menu').children;

    for (let i = 0; i < MENU.length; i++) {
        MENU[i].onclick = () => {
            for (let j = 0; j < MENU.length; j++) {
                MENU[j].classList.remove('active');
            }
            MENU[i].classList.add('active');
            const SECTION = document.querySelectorAll('section');
        }
    }

}