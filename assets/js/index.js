 const macy = Macy({
    container: '.reviews-items',
    margin: 10,
    columns: 3,
    breakAt: {
      1100: 2,
      768: 1,
    }
  });



const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  const headerTop = document.querySelector("header");
  if (window.scrollY > 0) {
    headerTop.classList.add("moved");
  } else {
    headerTop.classList.remove("moved");
  }
});


// const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// const savedTheme = localStorage.getItem("theme");

// const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
// document.documentElement.setAttribute("data-theme", currentTheme);
// updateImages(currentTheme);

// function updateImages(theme) {
//   const images = document.querySelectorAll("img[data-light][data-dark]");
//   images.forEach(img => {
//     img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
//   });
// }

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
setTheme(currentTheme);

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateImages(theme);
}

function updateImages(theme) {
  document.querySelectorAll("img[data-light][data-dark]").forEach(img => {
    img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
  });
}

document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setTheme(btn.dataset.themeBtn);
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".animate-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = [...items].indexOf(entry.target);
        entry.target.style.transitionDelay = `${0.15}s`;
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }),
    { threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));
});




document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top, .fade-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        
        }
      });
    },
    {
      threshold: 0.15, 
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});


$(function () {
  let Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    let links = this.el.find(".link");
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    let $el = e.data.el;
    let $this = $(this),
      $next = $this.next();

    $next.slideToggle();

    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp();
    }

    if (!$this.hasClass("open")) {
      $(".link").removeClass("open");
      $this.addClass("open");
    } else {
      $this.removeClass("open");
    }
  };

  let accordion = new Accordion($("#accordion"), false);

  let firstLink = $("#accordion .link").first();
  let firstSub = firstLink.next(".submenu");

  firstLink.addClass("open");
  firstSub.show();
});



document.addEventListener("DOMContentLoaded", () => {
  const NWrappers = document.querySelectorAll(".language-select-wrapper");
  if (!NWrappers.length) return;

  NWrappers.forEach((NWrapper) => {
    const NHeader = NWrapper.querySelector(".language-select-header");
    const NHeaderText = NHeader?.querySelector("p");
    const NHeaderFlagImg = NHeader?.querySelector(".l-select-flag img");
    const NCloseBtn = NWrapper.querySelector(".icon-close");
    const NItems = NWrapper.querySelectorAll(".language-sub-item");

    if (!NHeader || !NItems.length) return;

   NHeader.addEventListener("click", (e) => {
      e.stopPropagation();
      NWrapper.classList.toggle("active");
    });

   if (NCloseBtn) {
      NCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        NWrapper.classList.remove("active");
      });
    }

    NItems.forEach((NItem) => {
      NItem.addEventListener("click", (e) => {
        e.stopPropagation();

        NItems.forEach((item) => item.classList.remove("active"));
        NItem.classList.add("active");

        const NText = NItem.querySelector("p")?.innerText.trim();
        if (NText && NHeaderText) {
          NHeaderText.innerText = NText;
        }

        const NItemImg = NItem.querySelector("img");
        if (NItemImg && NHeaderFlagImg) {
          NHeaderFlagImg.src = NItemImg.src;
          NHeaderFlagImg.alt = NItemImg.alt || "flag";
        }

        NWrapper.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!NWrapper.contains(e.target)) {
        NWrapper.classList.remove("active");
      }
    });
  });
});
