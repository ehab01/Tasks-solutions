function loadGlider() {
  let glider = new Glider(document.querySelector(".glider"), {
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: true,
    responsive: [
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25,
          scrollLock: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          itemWidth: 150,
          duration: 0.25,
          scrollLock: true,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });

  function sliderAuto(slider, miliseconds) {
    const slidesCount = slider.track.childElementCount;
    let slideTimeout = null;
    let nextIndex = 5;

    function slide() {
      slideTimeout = setTimeout(function () {
        if (nextIndex >= slidesCount) {
          nextIndex = 1;
        }
        slider.scrollItem(nextIndex);
        nextIndex += 4;
      }, miliseconds);
    }

    slider.ele.addEventListener("glider-animated", function () {
      window.clearInterval(slideTimeout);
      slide();
    });

    slide();
  }

  sliderAuto(glider, 5000);
}
