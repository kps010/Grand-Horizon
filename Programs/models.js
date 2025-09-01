document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item .nav-link");
  const modelNavItems = document.querySelectorAll(".model-nav-item");
  const allModelDiv = document.querySelector(".series");
  const modelNav = document.querySelector(".model-nav");
  const offsetTop = modelNav.offsetTop; // Get initial position

  // underlines model-nav-item when its active
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach(
        (nav) => nav.classList.remove("active", "border-bottom")
        // nav.classList.remove("active", "bg-transparent")
      );

      this.classList.add("active", "border-bottom");
      // this.classList.add("active", "bg-transparent");
    });
  });

  // adds margin whenever any link of model-nav clicked
  // modelNavItems.forEach((item) => {
  //   item.addEventListener("click", function () {
  //     allModelDiv.style.paddingTop = "100px";
  //   });
  // });

  // makes model navbar sticky on top
  window.addEventListener("scroll", function () {
    if (window.scrollY >= offsetTop) {
      modelNav.classList.add("sticky-top");
    } else {
      modelNav.classList.remove("sticky-top");
    }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const gridContainer = document.querySelector(".all-cars");
//   const gridItems = gridContainer.querySelectorAll(".car-button");

//   function adjustGridLayout() {
//     const containerWidth = gridContainer.clientWidth;
//     const itemWidth = gridItems[0]?.clientWidth || 0;
//     const maxItemsPerRow = Math.floor(containerWidth / itemWidth);

//     if (gridItems.length <= maxItemsPerRow) {
//       gridContainer.style.gridTemplateRows = "1fr";
//     } else {
//       gridContainer.style.gridTemplateRows = "auto";
//     }
//   }

//   adjustGridLayout();
//   window.addEventListener("resize", adjustGridLayout);
// });

// ScrollSpy: add 'active' class to nav links based on scroll position
function setupScrollSpy() {
  // Get all sections (each section must have an id that matches a nav link's href)
  const sections = document.querySelectorAll(".series");
  // Get all nav links within the model-nav
  const navLinks = document.querySelectorAll(".model-nav .nav-link");

  function onScroll() {
    // Get current scroll position
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    // Adjust for any fixed header (change the offset as needed)
    const offset = 100;

    // Loop through each section to see if it's currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Check if the current scroll position is within the section's boundaries
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        // Get section id to match with nav link's href
        const id = section.getAttribute("id");
        navLinks.forEach((link) => {
          // Remove 'active' class from all nav links
          link.classList.remove("active", "border-bottom");
          // Add 'active' class if the href matches the section id
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active", "border-bottom");
          }
        });
      }
    });
  }

  // Listen for scroll events
  window.addEventListener("scroll", onScroll);
  // Initialize by triggering the function on load
  onScroll();
}

// Run the scroll spy once the DOM content is loaded
document.addEventListener("DOMContentLoaded", setupScrollSpy);

function setupCarModal() {
  // Get the modal elements
  const modal = document.getElementById("carModal");
  const modalHead = document.getElementById("heading");
  const modalImage = modal.querySelector(".modal-image");
  const modalClose = modal.querySelector(".modal-close");
  const configureLink = modal.querySelector(".modal-btn.configure"); // assign a class for configure link

  // Function to open modal with given image source
  function openModal(imgSrc, carName, altText) {
    modalHead.innerHTML = carName;
    modalImage.src = imgSrc;
    modalImage.alt = altText;
    modal.style.display = "flex";
    document.body.classList.add("no-scroll");
  }

  // Function to close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }

  // Listen for clicks on all car buttons
  const carButtons = document.querySelectorAll(".all-cars .car-button");
  carButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const imgEl = this.querySelector("img");
      if (!imgEl) return;
      const imgSrc = imgEl.getAttribute("src");
      const altText = imgEl.getAttribute("alt");
      const carName = this.querySelector(".card-title").innerHTML;
      openModal(imgSrc, carName, altText);
    });
  });

  // Close modal when clicking on the close button
  modalClose.addEventListener("click", closeModal);

  // Also close modal if clicking outside the modal content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // When the "configure" link is clicked, pass the alt text in the URL
  configureLink.addEventListener("click", function (e) {
    e.preventDefault();
    const carDetails = modalImage.alt;
    // Redirect to configure.html with carDetails as a query parameter
    window.location.href = `configure.html?details=${encodeURIComponent(
      carDetails
    )}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
});

document.addEventListener("DOMContentLoaded", setupCarModal);
