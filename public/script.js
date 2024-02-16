let aboutNav = document.getElementById("nav-bar");
let aboutHeader = document.getElementById("about-header");
let aboutContainer = document.getElementById("about-cont");

const options = {
  root: null, // relative to document viewport
  rootMargin: "10px", // margin around root. Values are similar to css property. Unit-less values not allowed
  threshold: 1.0, // visible amount of item shown in relation to root
};

function makeSticky(entries, observer) {
  if (window.matchMedia("only screen and (max-width: 1000px)").matches) {
    return;
  }

  for (entry of entries) {
    if (entry.isIntersecting) {
      aboutNav.classList.remove("fixed", "top-10");
      aboutContainer.classList.remove("ml-[16.66666666667%]");
    } else {
      aboutNav.classList.add("fixed", "top-10");
      document.querySelector("#about>.animation-target").style.transform = "none";
      aboutContainer.classList.add("ml-[16.66666666667%]");
    }
  }
}

const animationOptions = {
  root: null,
  rootMargin: "10px",
  threshold: 0.3,
}

function animateAboutSection(section) {
  gsap.to(section, {duration: 0, opacity: 1})
  gsap.to(section, {duration: 1, ease: "sine", y: 0})
}

function animateOnScroll(entries, observer) {
  for (entry of entries) {
    if (entry.isIntersecting) {
      const animationTarget = entry.target.querySelector(".animation-target")
      if (animationTarget.style.opacity === "1") {
        return
      }
      animateAboutSection(animationTarget)
    } else {

    }
  }
}


const stickyObserver = new IntersectionObserver(makeSticky, options);
const animationObserver = new IntersectionObserver(animateOnScroll, animationOptions)
stickyObserver.observe(aboutHeader);
animationObserver.observe(document.getElementById("about"))
animationObserver.observe(document.getElementById("work"))
animationObserver.observe(document.getElementById("contact"))
