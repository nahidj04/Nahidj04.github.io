// Easy selector helper function //
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
}

// Easy event listener function //
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
}

// Easy on scroll event listener //
   const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}



//// ---- vertical menu ---- ////
 // active state on scroll //
 let navbarlinks = select('#navbar .scrollto', true)
 const navbarlinksActive = () => {
   let position = window.scrollY + 200
   navbarlinks.forEach(navbarlink => {
     if (!navbarlink.hash) return
     let section = select(navbarlink.hash)
     if (!section) return
     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
       navbarlink.classList.add('active')
     } else {
       navbarlink.classList.remove('active')
     }
   })
 }
 window.addEventListener('load', navbarlinksActive)
 onscroll(document, navbarlinksActive)
  
 // Scrolls to an element with header offset //
 const scrollto = (el) => {
     let elementPos = select(el).offsetTop
     window.scrollTo({
       top: elementPos,
       behavior: 'smooth'
     })
   }

 // header - hamburger //
   on('click', '.mobile-nav-toggle', function(e) {
     select('body').classList.toggle('mobile-nav-active')
     this.classList.toggle('bi-list')
     this.classList.toggle('bi-x')
   })
 // header - hamburger //
  
   
// Scrool with ofset on links with a class name //
   on('click', '.scrollto', function(e) {
     if (select(this.hash)) {
       e.preventDefault()
 
       let body = select('body')
       if (body.classList.contains('mobile-nav-active')) {
         body.classList.remove('mobile-nav-active')
         let navbarToggle = select('.mobile-nav-toggle')
         navbarToggle.classList.toggle('bi-list')
         navbarToggle.classList.toggle('bi-x')
       }
       scrollto(this.hash)
     }
   }, true)
 
 // Scroll with ofset on page load with hash links in the url // 
   window.addEventListener('load', () => {
     if (window.location.hash) {
       if (select(window.location.hash)) {
         scrollto(window.location.hash)
       }
     }
   });
//// ---- vertical menu ---- ////

////  portfolio menu-categories ////
const menu = [
  {
    id: 1,
    category: "HTML & css",
    img: "./photos/html-css1.png",
  },
  {
    id: 2,
    category: "HTML & css",
    img: "./photos/html-css2.png",
  },
  {
    id: 3,
    category: "Bootstrap & sass",
    img: "./photos/bootstrap-sass1.png",
  },
  {
    id: 4,
    category: "Bootstrap & sass",
    img: "./photos/bootstrap-sass2.png",
  },
  {
    id: 5,
    category: "Js",
    img: "./photos/js1.png",
  },
  {
    id: 6,
    category: "Js",
    img: "./photos/js2.png",
  },
];

const addMenuList = (itemList = []) => {
  document.getElementById("menu-list").innerHTML = itemList
    .map(
      (portfolio) => `
  <div class="portfolio-item">
    <img class="portfolio-photo" src="${portfolio.img}"/>
  </div>`
    )
    .join(" ");
};

const setActiveClass = (button) => {
  if (button) {
    document.querySelectorAll(".btn-category").forEach((b) => {
      b.classList.remove("active-btn");
    });
    button.classList.add("active-btn");
  }
};

const addCategoryButtons = () => {
  const categoryList = menu.reduce(
      (categories, item) => {
        if (item && item.category && !categories.includes(item.category)) {
          categories.push(item.category);
        }
        return categories;
      },
      ["all"]
    );
  
    const buttons = categoryList.map(
      (cat) =>
        `<button class="btn btn-category ${cat === 'all' ? 'active-btn' : ''}" category-id="${cat}">${cat}</button>`
    );
  
    if (buttons.length > 0) {
      document.getElementById("menu-categories").innerHTML = buttons.join(" ");
    }
  
    document.querySelectorAll(".btn-category").forEach((item) => {
      const categoryType = item.getAttribute("category-id");
  
      item.addEventListener("click", function () {
        setActiveClass(item);
        item.classList.add("active-btn");
        if (categoryType === "all") {
          addMenuList(menu);
          return;
        }
        const filteredList = menu.filter(
          (item) => item.category === categoryType
        );
        addMenuList(filteredList);
      });
    });
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    addCategoryButtons();
    addMenuList(menu);
  });
//// end portfolio menu-categories ////
  
//// favorite showSlides ////
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("myphotos");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}
//// end favorite showSlides ////


//// Back to top button ////
let backtotop = select(".back-to-top");
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);
}
//// end Back to top button ////