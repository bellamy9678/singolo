window.onload = function() {
    
    const MENU = document.querySelector('.options__menu').children;
    
    for (let i = 0; i < MENU.length; i++) {
        MENU[i].onclick = () => {
            for (let j = 0; j < MENU.length; j++) {
                MENU[j].classList.remove('active');
            }
            MENU[i].classList.add('active');
        }
    }

    const TAGS = document.querySelector('.tags-group__list').children;
    
    function mixPictures() {
        const PICTURES = document.querySelector('.portfolio__examples').children;
        let arr = [];
        for (let i = 0; i < PICTURES.length; i++) {
            arr.push(PICTURES[i]);
        }
        arr.sort((a, b) => {
            return 0.5 - Math.random();
        });
        return arr;
    }

    for (let i = 0; i < TAGS.length; i++) {
        TAGS[i].onclick = () => {
            for (let j = 0; j < TAGS.length; j++) {
                TAGS[j].classList.remove('active-tag');
            }
            TAGS[i].classList.add('active-tag');
            let mixedPictureArr = mixPictures();
            let output = document.createDocumentFragment();
            mixedPictureArr.forEach(function(elem) {
                let img = document.createElement('img');
                img = elem;
                output.appendChild(img);
            });
            const CONTAINER = document.querySelector(".portfolio__examples");
            CONTAINER.appendChild(output);
            setHandlerOnPortfolio();
        }
    }
    
    setHandlerOnPortfolio();

    function setHandlerOnPortfolio() {
        let pictures = document.querySelector('.portfolio__examples').children;
        
        for (let i = 0; i < pictures.length; i++) {
            pictures[i].onclick = () => {
                for (let j = 0; j < pictures.length; j++) {
                    pictures[j].classList.remove('img-selected');
                }
                pictures[i].classList.add('img-selected');
            }
        }
    }
    

}
