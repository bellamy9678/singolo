window.onload = function() {
  const MENU_ITEMS = document.querySelectorAll(".options__menu li a");
  const HEADER_HEIGHT = document.querySelector('.header').offsetHeight;
  const MENU_SECTIONS = document.querySelectorAll('section');

  let sectionsOffsetY = [];
  for (let i = 0; i < MENU_SECTIONS.length; i++) {
    sectionsOffsetY.push(MENU_SECTIONS[i].offsetTop);
  }

  for (let i = 0; i < MENU_ITEMS.length; i++) {
    MENU_ITEMS[i].onclick = (event) => {
      event.preventDefault();
      window.scrollTo(0, sectionsOffsetY[i] - HEADER_HEIGHT );
    };
  }

  document.addEventListener('scroll', function () {
    const CURRENT_OFFSET_TOP = Math.round(window.scrollY) + HEADER_HEIGHT;
    
    for (let i = 0; i < MENU_SECTIONS.length; i++) {
      if (CURRENT_OFFSET_TOP >= MENU_SECTIONS[i].offsetTop && CURRENT_OFFSET_TOP < MENU_SECTIONS[i].offsetTop + MENU_SECTIONS[i].offsetHeight ) {
        for (let j = 0; j < MENU_ITEMS.length; j++) {
          MENU_ITEMS[j].classList.remove("active");
        };
        MENU_ITEMS[i].classList.add("active");
      }
    }
  })

  const TAGS = document.querySelector(".tags-group__list").children;

  function mixPictures() {
    const PICTURES = document.querySelector(".portfolio__examples").children;
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
    TAGS[i].onclick = event => {
      if (!TAGS[i].classList.contains("active-tag")) {
        for (let j = 0; j < TAGS.length; j++) {
          TAGS[j].classList.remove("active-tag");
        }
        TAGS[i].classList.add("active-tag");

        let mixedPictureArr = mixPictures();
        let output = document.createDocumentFragment();
        mixedPictureArr.forEach(function(elem) {
          let img = document.createElement("img");
          img = elem;
          output.appendChild(img);
        });

        const CONTAINER = document.querySelector(".portfolio__examples");
        CONTAINER.appendChild(output);

        setHandlerOnPortfolio();
        clearPortfolioImagesBorder();
      }
    };
  }

  const PICTURES = document.querySelector(".portfolio__examples").children;

  function clearPortfolioImagesBorder() {
    for (let j = 0; j < PICTURES.length; j++) {
      PICTURES[j].classList.remove("img-selected");
    }
  }

  function setHandlerOnPortfolio() {
    for (let i = 0; i < PICTURES.length; i++) {
      PICTURES[i].onclick = function() {
        if (this.classList.contains("img-selected")) {
          this.classList.remove("img-selected");
        } else {
          for (let j = 0; j < PICTURES.length; j++) {
            PICTURES[j].classList.remove("img-selected");
          }
          this.classList.add("img-selected");
        }
      };
    }
  }

  setHandlerOnPortfolio();

  const LEFT_MOBILE_CONTROL = document.querySelector("#phone-button-left");
  const RIGHT_MOBILE_CONTROL = document.querySelector("#phone-button-right");

  LEFT_MOBILE_CONTROL.onclick = () => {
    const BLACK_MIRROR = document.querySelector("#black-mirror-left");

    if (BLACK_MIRROR.classList.contains("mirror-on")) {
      BLACK_MIRROR.classList.remove("mirror-on");
    } else {
      BLACK_MIRROR.classList.add("mirror-on");
    }
  };

  RIGHT_MOBILE_CONTROL.onclick = () => {
    const BLACK_MIRROR = document.querySelector("#black-mirror-right");

    if (BLACK_MIRROR.classList.contains("mirror-on")) {
      BLACK_MIRROR.classList.remove("mirror-on");
    } else {
      BLACK_MIRROR.classList.add("mirror-on");
    }
  };

  const FORM = document.querySelector("#form");
  const MODAL = document.querySelector(".modal");
  const TEXTAREA = document.querySelector("#message");

  TEXTAREA.onchange = event => {
    if (TEXTAREA.value.length > 500) {
      event.preventDefault();
      alert(`Description is too long (max 500 symbols)`);
      let text = TEXTAREA.value;
      TEXTAREA.value = text.slice(0, 501);
    }
  };

  FORM.onsubmit = evt => {
    evt.preventDefault();
    MODAL.style.visibility = "unset";
    MODAL.classList.add('visible');

    const subject = document.querySelector("#modal-window__subject");
    const description = document.querySelector("#modal-window__description");

    if (document.querySelector("#subject").value.length == 0) {
      subject.innerText = "Without subject";
    } else {
      subject.innerText = `Subject: ${
        document.querySelector("#subject").value
      }`;
    }

    if (document.querySelector("#message").value.length == 0) {
      description.innerText = "Without description";
    } else {
      description.innerText = `Description:  ${
        document.querySelector("#message").value
      }`;
    }

    const OK_BUTTON = document.querySelector("#modal-window__ok");
    OK_BUTTON.onclick = () => {
      FORM.reset();
      MODAL.classList.remove('visible');
      MODAL.style.visibility = "hidden";
    };
  };

  const SLIDES = document.querySelectorAll(".slide");
  const CONTROL_LEFT = document.querySelector(".control-left");
  const CONTROL_RIGHT = document.querySelector(".control-right");

  let currentImagePosition = 0;
  let isAllowedAnimation = true;

  function getNextSlide(n) {
    currentImagePosition = (currentImagePosition + 1) % SLIDES.length;
  }

  function getPrevSlide(n) {
    currentImagePosition =
      (currentImagePosition - 1 + SLIDES.length) % SLIDES.length;
  }

  CONTROL_LEFT.addEventListener("click", function(event) {
    if (isAllowedAnimation) {
      isAllowedAnimation = false;
      SLIDES[currentImagePosition].classList.add("hide-to-right");
      getPrevSlide(currentImagePosition);
      SLIDES[currentImagePosition].classList.add(
        "active-slide",
        "show-from-left"
      );
      setTimeout(function() {
        SLIDES[currentImagePosition].classList.remove("show-from-left");
        getNextSlide(currentImagePosition);
        SLIDES[currentImagePosition].classList.remove(
          "active-slide",
          "hide-to-right"
        );
        getPrevSlide(currentImagePosition);
        isAllowedAnimation = true;
      }, 550);
    }
  });

  CONTROL_RIGHT.addEventListener("click", function(event) {
    if (isAllowedAnimation) {
      isAllowedAnimation = false;
      SLIDES[currentImagePosition].classList.add("hide-to-left");
      getNextSlide(currentImagePosition);
      SLIDES[currentImagePosition].classList.add(
        "active-slide",
        "show-from-right"
      );
      setTimeout(function() {
        SLIDES[currentImagePosition].classList.remove("show-from-right");
        getPrevSlide(currentImagePosition);
        SLIDES[currentImagePosition].classList.remove(
          "active-slide",
          "hide-to-left"
        );
        getNextSlide(currentImagePosition);
        isAllowedAnimation = true;
      }, 550);
    }
  });
};
