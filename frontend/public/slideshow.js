// public/slideshow.js
console.log('📦 slideshow.js LOADED');

window.initSlideshow = function () {
  console.log('🚀 initSlideshow CALLED');
  document.body.style.background = 'black';

  document
    .querySelectorAll('.container, #prev, #next, #dots, .slide-header')
    .forEach((el) => el.remove());

  Element.prototype.createE = function (tag, referance, content) {
    var element = document.createElement(tag);

    if (referance && referance[0] === '#') {
      element.id = referance.replace('#', '');
    } else if (referance) {
      element.classList = referance;
    }

    if (content && tag.toUpperCase() == 'IMG') {
      element.src = content;
    } else if (content) {
      element.innerHTML = content;
    }

    if (!this.doctype) {
      var final = this.appendChild(element);
    }

    return final || element;
  };

  var loop, columns, delay;

  var prev = document.body.createE('button', '#prev', '←');
  prev.onclick = () => nextPrev(-1);

  var next = document.body.createE('button', '#next', '→');
  next.onclick = () => nextPrev(1);

  var dots = document.body.createE('div', '#dots');

  var input = [
    {
      image:
        'https://image.tmdb.org/t/p/original/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg',
      title: 'Aquaman',
      subtitle:
        'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
      url: 'https://www.themoviedb.org/movie/297802',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/8bZ7guF94ZyCzi7MLHzXz6E5Lv8.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
      title: 'Bumblebee',
      subtitle:
        'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.  When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.',
      url: 'https://www.themoviedb.org/movie/424783',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/z6m7s4w4Erxnr5k2jc1TZR1AMva.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg',
      title: 'Bird Box',
      subtitle:
        "When a mysterious force decimates the world’s population, only one thing is certain: if you see it, you take your life. Facing the unknown, Malorie finds love, hope and a new beginning only for it to unravel. Now she must flee with her two children down a treacherous river to the one place left that may offer sanctuary. But to survive, they'll have to undertake the perilous two-day journey blindfolded.",
      url: 'https://www.themoviedb.org/movie/405774',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/3pvIMjJps4uJr5NOmolY0MXvTYD.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/uTVGku4LibMGyKgQvjBtv3OYfAX.jpg',
      title: 'Mary Poppins Returns',
      subtitle:
        "In Depression-era London, a now-grown Jane and Michael Banks, along with Michael's three children, are visited by the enigmatic Mary Poppins following a personal loss. Through her unique magical skills, and with the aid of her friend Jack, she helps the family rediscover the joy and wonder missing in their lives.",
      url: 'https://www.themoviedb.org/movie/400650',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/e7CE5vx4KqUuz0peKdHRVZB0Pn8.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/laMM4lpQSh5z6KIBPwWogkjzBVQ.jpg',
      title: 'Spider-Man: Into the Spider-Verse',
      subtitle:
        'Miles Morales is juggling his life between being a high school student and being Spider-Man. However, when Wilson "Kingpin" Fisk uses a super collider, another Spider-Man from another dimension, Peter Parker, accidentally winds up in Miles\' dimension. As Peter trains Miles to become a better Spider-Man, they are soon joined by four other Spider-Men from across the "Spider-Verse". As all these clashing dimensions start to tear Brooklyn apart, Miles must help the others stop Fisk and return everyone to their own dimensions.',
      url: 'https://www.themoviedb.org/movie/324857',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/oEu96CmVL9kjneOzjatLeeSZYS2.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/fPc793wngYwFk1pziUNAoCCBmMU.jpg',
      title: 'Crayon Shin-chan: Burst Serving! Kung Fu Boys ~Ramen Rebellion~',
      subtitle:
        'Shin-chan is all set to challenge Kung Fu in the Chinatown of Kasukabe city, known as Aiyā Town.  He and the Kasukabe Defence Force are going to put up a totally no-stunt Kung Fu challenge on the stage.',
      url: 'https://www.themoviedb.org/movie/507562',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg',
      title: 'Venom',
      subtitle:
        'Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.',
      url: 'https://www.themoviedb.org/movie/335983',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg',
      title: 'Creed II',
      subtitle:
        "Follows Adonis Creed's life inside and outside of the ring as he deals with new found fame, issues with his family, and his continuing quest to become a champion.",
      url: 'https://www.themoviedb.org/movie/480530',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/wDN3FIcQQ1HI7mz1OOKYHSQtaiE.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/kQKcbJ9uYkTQql2R8L4jTUz7l90.jpg',
      title: 'Fantastic Beasts: The Crimes of Grindelwald',
      subtitle:
        'Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.',
      url: 'https://www.themoviedb.org/movie/338952',
    },
    {
      image:
        'https://image.tmdb.org/t/p/original/6OTRuxpwUUGbmCX3MKP25dOmo59.jpg',
      artWork:
        'https://image.tmdb.org/t/p/w500/518jdIQHCZmYqIcNCaqbZuDRheV.jpg',
      title: 'Dragon Ball Super: Broly',
      subtitle:
        "Earth is peaceful following the Tournament of Power. Realizing that the universes still hold many more strong people yet to see, Goku spends all his days training to reach even greater heights. Then one day, Goku and Vegeta are faced by a Saiyan called 'Broly' who they've never seen before. The Saiyans were supposed to have been almost completely wiped out in the destruction of Planet Vegeta, so what's this one doing on Earth? This encounter between the three Saiyans who have followed completely different destinies turns into a stupendous battle, with even Frieza (back from Hell) getting caught up in the mix.",
      url: 'https://www.themoviedb.org/movie/503314',
    },
  ];

  makeSlideshow(input);

  function makeSlideshow(input, n = input.length) {
    init(input);
    downloadImage(input, n);

    async function downloadImage(input) {
      for (var i = 0; i < n; i++) {
        await new Promise((resolve, reject) => {
          var image = new Image();
          image.src = input[i].image;
          image.onload = () => {
            createDot(input[i], i);
            resolve();
          };
          image.onerror = () => {
            createDot(input[i], i, true);
            resolve();
          };
        });
      }
    }
  }

  function init(_input, _columns = 12, _delay = 5000) {
    input = _input;
    columns = _columns;
    delay = _delay;
  }

  function createDot(slide, index, err) {
    err ? (slide.image = '404.png') : null;
    var dotContainer = dots.createE('div', 'dot-container');

    var dot = dotContainer.createE('div', 'dot');
    dot.style.backgroundImage = 'url(' + slide.artWork + ')';
    dot.setAttribute('onclick', 'showSlide(' + index + ')');

    if (index == 0) {
      slideshow(slide);
    }
  }

  function slideshow(slide) {
    var firstSlide = makeLayout(slide);
    visibleBox(firstSlide.boxes);
    document.getElementsByClassName('dot')[0].classList.add('active');

    loop = setTimeout(() => {
      nextPrev(1);
    }, delay);
  }

  function showSlide(n) {
    clearTimeout(loop);
    makeAnimation(input[n]);
    var allDots = document.getElementsByClassName('dot');
    for (var i = 0; i < allDots.length; i++) {
      allDots[i].classList.remove('active');
    }
    var dot = allDots[n];
    dot.classList.add('active');
    loop = setTimeout(() => {
      nextPrev(1);
    }, delay);
  }

  function nextPrev(n) {
    clearTimeout(loop);
    var allDots = document.getElementsByClassName('dot');
    for (var i = 0; i < allDots.length; i++) {
      var target = n + i;
      if (allDots[i].classList.contains('active')) {
        allDots[i].classList.remove('active');
        if (target >= allDots.length) {
          target = 0;
        } else if (target < 0) {
          target = allDots.length - 1;
        }
        makeAnimation(input[target]);
        allDots[target].classList.add('active');
        break;
      }
    }
    loop = setTimeout(() => {
      nextPrev(1);
    }, delay);
  }

  function makeAnimation(slide) {
    removePrevious();
    var animation = [
      'pushUpDown(slide)',
      'pullUpDown(slide)',
      'pullDown(slide)',
      'pullUp(slide)',
      'boxEmerge(slide)',
      'boxEmergeReverse(slide)',
      'pushUp(slide)',
      'pushDown(slide)',
      'fade(slide)',
      'slideCol(slide)',
      'slideColReverse(slide)',
      'slideIn(slide, "Left")',
      'slideIn(slide, "Right")',
      'slideIn(slide, "Up")',
      'slideIn(slide, "Down")',
      'slideOut(slide, "Left")',
      'slideOut(slide, "Right")',
      'slideOut(slide, "Up")',
      'slideOut(slide, "Down")',
      'slideWith(slide, "Left")',
      'slideWith(slide, "Right")',
      'slideWith(slide, "Up")',
      'slideWith(slide, "Down")',
    ];

    var x = Math.floor(Math.random() * animation.length);
    eval(animation[x]);
  }

  function makeLayout(slide, out) {
    var oldContainer = document.getElementsByClassName('container');
    oldContainer = oldContainer[oldContainer.length - 1];

    if (out) {
      var oldVertical = oldContainer.getElementsByClassName('col');
      var oldBoxes = [];
      for (var i = 0; i < oldVertical.length; i++) {
        oldVertical[i].className = 'col';
        var oldRows = oldVertical[i].getElementsByClassName('row');
        var oldOneCol = [];
        for (var j = 0; j < oldRows.length; j++) {
          var content = oldRows[j].getElementsByClassName('content')[0];
          content.className = 'content visible';
          oldOneCol.push(content);
        }
        oldBoxes.push(oldOneCol);
      }
      oldContainer.style.zIndex = 1;
    }

    var container = document.body.createE('div', 'container');
    var boxes = [];
    var vertical = [];

    for (var i = 0; i < columns; i++) {
      vertical.push(container.createE('div', 'col'));
    }

    var rows = Math.floor(window.innerHeight / vertical[0].offsetWidth);

    for (var i = 0; i < vertical.length; i++) {
      var horizontal = [];
      for (var j = 0; j < rows; j++) {
        horizontal.push(vertical[i].createE('div', 'row'));
      }
      var oneCol = [];
      for (var j = 0; j < horizontal.length; j++) {
        oneCol.push(horizontal[j].createE('div', 'content'));
      }
      boxes.push(oneCol);
      createBackground(oneCol, slide.image);
    }

    function createBackground(slices, image) {
      for (var i = 0; i < slices.length; i++) {
        slices[i].style.backgroundImage = 'url(' + image + ')';
        positionBackground(slices[i]);
      }
    }

    createSlideHeader(slide.artWork, slide.title, slide.subtitle, slide.url);

    out ? visibleBox(boxes) : null;

    return {
      vertical: oldVertical || vertical,
      boxes: oldBoxes || boxes,
      container: container,
      oldContainer: oldContainer,
    };
  }

  function positionBackground(slice) {
    slice.style.backgroundPosition =
      -slice.offsetLeft + 'px ' + -slice.offsetTop + 'px';
    slice.style.backgroundSize = window.innerWidth + 'px';
  }

  function visibleBox(boxes) {
    if (boxes[0][0]) {
      for (var i = 0; i < boxes.length; i++) {
        for (var j = 0; j < boxes[i].length; j++) {
          boxes[i][j].classList.add('visible');
        }
      }
    } else {
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('visible');
      }
    }
  }

  function removePrevious() {
    var containers = document.getElementsByClassName('container');
    if (containers.length >= 2) {
      containers[0].remove();
    }

    var slideHeader = document.querySelectorAll('.slide-header');
    if (slideHeader.length >= 2) {
      for (var i = 0; i < slideHeader.length; i++) {
        slideHeader[i].remove();
      }
    } else if (slideHeader.length >= 1) {
      slideHeader[0].classList.add('out');
      slideHeader[0].classList.remove('in');
      setTimeout(() => {
        slideHeader[0].remove();
      }, 500);
    }
  }

  async function timeline(boxes, className, colDelay, rowDelay) {
    colsAwait(boxes);
    async function colsAwait(boxes) {
      for (var i = 0; i < boxes.length; i++) {
        colDelay
          ? await new Promise((resolve) => setTimeout(resolve, colDelay))
          : null;
        boxesAwait(boxes[i]);
      }
    }
    async function boxesAwait(boxes) {
      for (var i = 0; i < boxes.length; i++) {
        rowDelay
          ? await new Promise((resolve) => setTimeout(resolve, rowDelay))
          : null;
        boxes[i].classList.add(className);
      }
    }
  }

  Array.prototype.boxReverse = function () {
    this.reverse();
    for (var i = 0; i < this.length; i++) {
      this[i].reverse();
    }
    return this;
  };

  window.addEventListener('resize', () => {
    var slices = document.querySelectorAll('.content');
    for (var i = slices.length - 1; i >= 0; i--) {
      positionBackground(slices[i]);
    }
  });

  function createSlideHeader(artwork, title, subtitle, url) {
    var slideHeader = document.body.createE('div', 'slide-header');
    var artworkImage = slideHeader.createE('img', null, artwork);
    var headerText = slideHeader.createE('div', 'header-text');
    var title = headerText.createE('h3', null, title);
    var subtitle = headerText.createE('p', null, subtitle);
    slideHeader.classList.add('in');

    slideHeader.addEventListener('mouseover', () => {
      clearTimeout(loop);
    });
    slideHeader.addEventListener('mouseout', () => {
      loop = setTimeout(() => {
        nextPrev(1);
      }, delay);
    });
    slideHeader.addEventListener('click', () => {
      window.open(url, '_blank');
    });
  }

  async function pushUpDown(input) {
    var layout = makeLayout(input);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      visibleBox(layout.boxes[i]);
      cols[i].classList.add('pushUpDown');
    }
  }

  async function pullUpDown(input) {
    var layout = makeLayout(input, true);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      visibleBox(layout.boxes[i]);
      cols[i].classList.add('pullUpDown');
    }
  }

  async function pullDown(input) {
    var layout = makeLayout(input, true);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 75));
      cols[i].classList.add('pullDown');
    }
  }

  async function pullUp(input) {
    var layout = makeLayout(input, true);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 75));
      cols[i].classList.add('pullUp');
    }
  }

  async function boxShrink(input) {
    var layout = makeLayout(input, true);
    var boxes = layout.boxes;
    timeline(boxes, 'boxShrink', 75, 75);
  }

  async function boxShrinkReverse(input) {
    var layout = makeLayout(input, true);
    var boxes = layout.boxes;
    boxes.boxReverse();

    timeline(boxes, 'boxShrink', 75, 75);
  }

  async function boxEmerge(input) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;

    timeline(boxes, 'boxEmerge', 75, 75);
  }

  async function boxEmergeReverse(input) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;
    boxes.boxReverse();

    timeline(boxes, 'boxEmerge', 75, 75);
  }

  async function slideCol(input) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;
    timeline(boxes, 'slideCol', 75);
  }

  async function slideColReverse(input) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;
    boxes.reverse();
    timeline(boxes, 'slideCol', 75);
  }

  async function pushUp(input) {
    var layout = makeLayout(input);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 75));
      visibleBox(layout.boxes[i]);
      cols[i].classList.add('pushUp');
    }
  }

  async function pushDown(input) {
    var layout = makeLayout(input);
    var cols = layout.vertical;
    for (var i = 0; i < cols.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 75));
      visibleBox(layout.boxes[i]);
      cols[i].classList.add('pushDown');
    }
  }

  function fade(input) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;
    visibleBox(boxes);
    var container = layout.container;
    container.classList.add('fade');
  }

  function slideIn(input, direction) {
    var layout = makeLayout(input);
    var boxes = layout.boxes;
    visibleBox(boxes);
    var container = layout.container;
    var oldContainer = layout.oldContainer;
    container.className = 'container ' + 'push' + direction;
    oldContainer.className = 'container smaller';
  }

  function slideOut(input, direction) {
    var layout = makeLayout(input, true);
    var container = layout.container;
    var oldContainer = layout.oldContainer;
    oldContainer.className = 'container ' + 'pull' + direction;
    container.className = 'container bigger';
  }

  function slideWith(input, direction) {
    var layout = makeLayout(input, true);
    var container = layout.container;
    var oldContainer = layout.oldContainer;
    oldContainer.className = 'container ' + 'pull' + direction;
    container.className = 'container ' + 'push' + direction;
  }
};
