/*! For license information please see main.bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./src/js/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moviesfunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moviesfunction.js */ \"./src/js/moviesfunction.js\");\n//import * as variables from './variables';\n\n\n//variable project\n\n\n(async () => {\n    try {\n\n    const dataEntry = await (0,_moviesfunction_js__WEBPACK_IMPORTED_MODULE_0__.genererarPeliculas)();\n    await (0,_moviesfunction_js__WEBPACK_IMPORTED_MODULE_0__.obtenerPeliculas)(dataEntry);\n   \n\n    } catch (error) {\n      console.error(error);\n    }\n  })();\n\n//# sourceURL=webpack://webpack/./src/js/index.js?")},"./src/js/moviesfunction.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "OPenvideo": () => (/* binding */ OPenvideo),\n/* harmony export */   "genererarPeliculas": () => (/* binding */ genererarPeliculas),\n/* harmony export */   "obtenerPeliculas": () => (/* binding */ obtenerPeliculas),\n/* harmony export */   "pyVideo": () => (/* binding */ pyVideo)\n/* harmony export */ });\n/* function generarPeliculas */\nasync function genererarPeliculas(){\n\nconst movies = await fetch(\'/json/movies.json\');\nconst dataEntry = await movies.json();\nreturn dataEntry.peliculas;\n\n}\n\n/* function obtenerPeliculas */\nasync function obtenerPeliculas(dataEntry ){\n\n\n /* variables */\n\n\n\nconst moreinfo = document.querySelector(".block-info-movie-hero__info");\nconst pagecontainer = document.querySelector(".page-container");\nconst popinfo = document.querySelector(".info");\nconst popup = document.querySelector(".pop");\nconst textinfo = document.querySelector(".block-info-movie-hero")\nconst carousel = document.querySelector(".carousel");\nconst carouselTend = document.querySelector(".tendencias");\nconst carouselTaqui = document.querySelector(".taquillazos");\n\n\nconst filterePopulares = filtrarPeliculas(dataEntry, "populares");\nconst filteredTendencias = filtrarPeliculas(dataEntry, "tendencias");\nconst filteredTaquilleras = filtrarPeliculas(dataEntry, "taquilleras")\n\n\nmoreinfo.addEventListener("click", function(){\n\n  moviePopUp(1, "populares");\n})\n\n/* function filtro */\nfunction filtrarPeliculas( dataEntry, category) {\n\n\n  return dataEntry.filter(pelicula => pelicula.category === category);\n\n}\n\n\n/* */\n\n/* funcion imprimir peliculas*/\nfunction generarHTMLPeliculas(filtrarPeliculas) {\n  \n  const category = filtrarPeliculas[0]?.category || ""; \n  return filtrarPeliculas.reduce((html, movie, index) => {\n\n   return html + `\n      <div class="pelicula"  data-categoria="${category}" data-index="${index}">\n        <a href="#"><img src="${movie.thumbnail}" alt=""></a>\n      </div>`;\n  }, \'\');\n}\n\n/* cargando las peliculas */\n\n\n carousel.innerHTML = generarHTMLPeliculas(filterePopulares);\n carouselTend.innerHTML = generarHTMLPeliculas(filteredTendencias);\n carouselTaqui.innerHTML = generarHTMLPeliculas(filteredTaquilleras);\n\n/* cargando las peliculas */\n\n\n\n\nconst peliculas = document.querySelectorAll(".pelicula");\n\n\n /* variables */\npeliculas.forEach(pelicula => {\n    pelicula.addEventListener("click", (e) => {\n        const index = e.currentTarget.dataset.index;\n        const categoria = e.currentTarget.dataset.categoria;\n\n\n       /* const movie = dataEntry.peliculas[index]*/\n        moviePopUp(index, categoria);\n    })\n});\n\n\n\n\n \n /* popUp  */\n\n    function moviePopUp(index , categoria ){\n     \n             popup.classList.add("block")\n             popinfo.classList.add("block")\n             pagecontainer.style.position = "fixed";\n             popinfo.style.position = "absolute";\n            \n      \n             setTimeout(() => {\n              popup.style.opacity = "1";\n              popinfo.style.opacity = "1";\n            }, 10);\n\n          \n          popup.addEventListener("click", closeinfo)\n    \n\n     \n           showmovies(index,  categoria);\n       \n   \n        }\n\n\n\n\n\n        function closeinfo(){\n\n          popup.style.opacity = "0";\n          popinfo.style.opacity = "0";\n          \n          setTimeout(() => {\n            popup.classList.remove("block")\n           popinfo.classList.remove("block")\n            pagecontainer.style.position = "relative";\n           \n          }, 500); // Tiempo para que se complete la transición de fadeOut (0.5 segundos)\n\n        }\n\n\n/* print peliculas */ \n   \n\n   function showmovies(index, categoria){\n    \n\n\n    const categoryData = {\n      populares: filterePopulares,\n      tendencias: filteredTendencias,\n      taquilleras: filteredTaquilleras\n    };\n    \n\n    if (categoria in categoryData) {\n      const movies = categoryData[categoria];\n     printInfo( movies[index]);\n    }\n\n\n\n    \n  \n    }\n\n\n    function showmoviesTen(index, dataEntry){\n \n\n    \n      const movieSelectTend = filteredTendencias[index];\n      printInfo(movieSelectTend);\n      \n    \n      }\n  \n  \n\n\n\n    \n\n\nfunction printInfo(movieSelect){\n\nconst div =  ` <div class="block-movieinfo--hero">\n<span class="close"></span>\n<div class="block-movieinfo--hero-img"> \n<div class="image" style="background: url(\'${ movieSelect.imagen }\');height: 41vh;\nbackground-size: cover;\nbackground-position: center center;">\n\n<div class="bg-gradient-black"></div></div>\n</div>\n<div class="block-movieinfo--hero-text">\n\n\n<div class="block-movieinfo--hero-logo">   \n\n<img  src="${ movieSelect.logomovie }" alt="" > </div>\n\n\n<div class="btns"> \n  <button  type="button" class="block-info-movie-hero__play">Reproducir</button>\n<img src="../assets/img/hand.svg" width="50">  <img src="../assets/img/plus.svg" width="50">  </div>\n</div>\n\n</div>\n</div>\n<div class="block-info-data">\n<h1> ${ movieSelect.nombre }</h1>\n<p>${ movieSelect.descripcion }</p>\n</div>\n\n`  \npopinfo.innerHTML = div;\n\nconst close = document.querySelector(".close");\nclose.addEventListener("click", closeinfo)\n\n\n\n\npyVideo();\n\n}\n\n\n\n\n\nfunction peliculasPopulares( filteredTendencias,  ){\n\n    const peliculasHTML = filteredTendencias.map((movie, index, dataEntry) => {\n\n    return `\n    <div class="pelicula" data-index="${index}" ><a href="#">\n    <img src="${movie.thumbnail}" alt="dogflix"></a></div>`  \n    \n    \n    }\n    ).join(\'\');\n    \n    carousel.innerHTML = peliculasHTML;\n\n\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n}\n\n\n\n\nfunction pyVideo() {\n\n  const videocontent = document.querySelector(".block-movieinfo--hero");\n  const fullscreenButton = videocontent.querySelector(".block-info-movie-hero__play");\n  \n  fullscreenButton.addEventListener("click", OPenvideo)\n\n\n}\n\n\n\nfunction OPenvideo() {\n\n   var containervid = document.querySelector(".video-movie")\n   var backBtn = document.querySelector(".backBtn");\n   var video = document.getElementById("myVideo");\n\n   video.volume = 0.1;\n\n\n  containervid.style.display = "block";\n    setTimeout(function(){\n\n       containervid.classList.add("show");\n        video.play();\n\n    },100)\n\n\n    backBtn.addEventListener("click", function(){\n\n      close(containervid,backBtn,video);\n    })\n\n video.addEventListener("ended", function(){\n\n  setTimeout(function(){\n\n    close(containervid, backBtn,  video);\n\n  },200)\n\n\n })\n\n\n}\n\n\n\n\n\n\n\nfunction close(containervid, backBtn,  video){\n\n\n  setTimeout(function(){\n    \n    containervid.classList.remove("show");\n    video.pause();\n    video.currentTime = 0;\n\n},100)\ncontainervid.style.display = "none";\n\n\n  \n\n}\n\n//# sourceURL=webpack://webpack/./src/js/moviesfunction.js?')}},__webpack_module_cache__={};function __webpack_require__(n){var e=__webpack_module_cache__[n];if(void 0!==e)return e.exports;var o=__webpack_module_cache__[n]={exports:{}};return __webpack_modules__[n](o,o.exports,__webpack_require__),o.exports}__webpack_require__.d=(n,e)=>{for(var o in e)__webpack_require__.o(e,o)&&!__webpack_require__.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},__webpack_require__.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),__webpack_require__.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/js/index.js")})();