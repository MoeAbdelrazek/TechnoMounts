// ===== GALLERY CONFIG – ALL 53 IMAGES =====
const galleryImages = [
  "Assets/01_luxury.png",
  "Assets/02_modern.png",
  "Assets/03_office.png",
  "Assets/04_hotel.png",
  "Assets/05_retail.png",
  "Assets/06_showroom.png",
  "Assets/07_business.png",
  "Assets/08_elegant.png",
  "Assets/09_minimal.png",
  "Assets/10_tablet.png",
  "Assets/11_display.png",
  "Assets/12_floor.png",
  "Assets/13_stand.png",
  "Assets/14_mount.png",
  "Assets/15_desktop.png",
  "Assets/16_wall.png",
  "Assets/17_black.png",
  "Assets/18_white.png",
  "Assets/19_angle.png",
  "Assets/20_rotation.png",
  "Assets/21_feature.png",
  "Assets/22_adjustable.png",
  "Assets/23_secure.png",
  "Assets/24_anti.png",
  "Assets/25_theft.png",
  "Assets/26_install.png",
  "Assets/27_adhesive.png",
  "Assets/28_screws.png",
  "Assets/29_tilt.png",
  "Assets/30_height.png",
  "Assets/31_gallery.png",
  "Assets/32_scene.png",
  "Assets/33_usage.png",
  "Assets/34_customer.png",
  "Assets/35_staff.png",
  "Assets/36_counter.png",
  "Assets/37_hospital.png",
  "Assets/38_clinic.png",
  "Assets/39_event.png",
  "Assets/40_exhibition.png",
  "Assets/41_profile.png",
  "Assets/42_closeup.png",
  "Assets/43_shine.png",
  "Assets/44_glossy.png",
  "Assets/45_detail.png",
  "Assets/46_motion.png",
  "Assets/47_focus.png",
  "Assets/48_light.png",
  "Assets/49_clean.png",
  "Assets/50_space.png",
  "Assets/51_form.png",
  "Assets/52_style.png",
  "Assets/53_visual.png"
];

// ===== HERO BARS + COUNTERS =====
function animateHeroBars() {
  const bars = document.querySelectorAll(".hero-stat-bar-inner");
  bars.forEach(bar => {
    const target = parseFloat(bar.getAttribute("data-bar-target") || "0");
    requestAnimationFrame(() => {
      bar.style.width = target + "%";
    });
  });

  const counters = document.querySelectorAll("[data-counter-target]");
  counters.forEach(counter => {
    const targetStr = counter.getAttribute("data-counter-target");
    const target = parseFloat(targetStr);
    const isDecimal = targetStr.includes(".");
    let current = 0;
    const duration = 1600;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const value = current + progress * (target - current);
      counter.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ===== KPI + EMAIL BARS =====
function animateKpiBars() {
  const bars = document.querySelectorAll(".kpi-bar-inner");
  bars.forEach(bar => {
    const value = parseFloat(bar.getAttribute("data-kpi-bar") || "0");
    requestAnimationFrame(() => {
      bar.style.width = value + "%";
    });
  });

  const emailBars = document.querySelectorAll(".email-bar-inner");
  emailBars.forEach(bar => {
    const value = parseFloat(bar.getAttribute("data-email-bar") || "0");
    requestAnimationFrame(() => {
      bar.style.width = value + "%";
    });
  });

  // ROAS pills could be color-modulated based on value
  const roasPills = document.querySelectorAll(".roas-pill");
  roasPills.forEach(pill => {
    const roas = parseFloat(pill.getAttribute("data-roas") || "0");
    if (roas >= 5.5) {
      pill.style.background = "#e5ffec";
      pill.style.borderColor = "#2eaf55";
    } else if (roas >= 4.0) {
      pill.style.background = "#fff7e3";
      pill.style.borderColor = "#e3a122";
    } else {
      pill.style.background = "#ffeceb";
      pill.style.borderColor = "#cb5c4c";
    }
  });
}

// ===== ADVANCED GALLERY =====
let currentIndex = 0;
let autoplayInterval = null;

function buildGallery() {
  const track = document.getElementById("galleryTrack");
  const thumbsContainer = document.getElementById("galleryThumbs");
  if (!track || !thumbsContainer) return;

  galleryImages.forEach((src, index) => {
    // Slides
    const slide = document.createElement("div");
    slide.className = "gallery-slide";
    slide.dataset.index = index.toString();

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Visual asset " + (index + 1);
    slide.appendChild(img);
    track.appendChild(slide);

    slide.addEventListener("click", () => openLightbox(index));

    // Thumbs
    const thumb = document.createElement("div");
    thumb.className = "gallery-thumb";
    thumb.dataset.index = index.toString();

    const thumbImg = document.createElement("img");
    thumbImg.src = src;
    thumbImg.alt = "Thumbnail " + (index + 1);
    thumb.appendChild(thumbImg);
    thumbsContainer.appendChild(thumb);

    thumb.addEventListener("click", () => {
      setGalleryIndex(index, true);
      openLightbox(index);
    });
  });

  setGalleryIndex(0, false);
  startAutoplay(track);
}

function setGalleryIndex(index, scrollIntoView) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;

  const track = document.getElementById("galleryTrack");
  const slides = track ? track.querySelectorAll(".gallery-slide") : [];
  const thumbsContainer = document.getElementById("galleryThumbs");
  const thumbs = thumbsContainer ? thumbsContainer.querySelectorAll(".gallery-thumb") : [];

  slides.forEach(slide => slide.classList.remove("gallery-slide--active"));
  thumbs.forEach(thumb => thumb.classList.remove("gallery-thumb--active"));

  const activeSlide = slides[currentIndex];
  const activeThumb = thumbs[currentIndex];

  if (activeSlide) {
    activeSlide.classList.add("gallery-slide--active");
    if (scrollIntoView) {
      activeSlide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }
  if (activeThumb) {
    activeThumb.classList.add("gallery-thumb--active");
    activeThumb.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }
}

function startAutoplay(track) {
  if (!track) return;
  if (autoplayInterval) clearInterval(autoplayInterval);

  autoplayInterval = setInterval(() => {
    setGalleryIndex(currentIndex + 1, true);
  }, 3500);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

// ===== LIGHTBOX =====
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  const counter = document.getElementById("lightboxCounter");
  if (!lightbox || !img || !counter) return;

  setGalleryIndex(index, false);
  img.src = galleryImages[currentIndex];
  counter.textContent = (currentIndex + 1) + " / " + galleryImages.length;
  lightbox.classList.add("is-open");
  stopAutoplay();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("is-open");

  const track = document.getElementById("galleryTrack");
  startAutoplay(track);
}

function moveLightbox(delta) {
  currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
  const img = document.getElementById("lightboxImage");
  const counter = document.getElementById("lightboxCounter");
  if (!img || !counter) return;
  img.src = galleryImages[currentIndex];
  counter.textContent = (currentIndex + 1) + " / " + galleryImages.length;
}

// ===== INIT =====
window.addEventListener("load", () => {
  animateHeroBars();
  animateKpiBars();
  buildGallery();

  // Lightbox events
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => moveLightbox(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => moveLightbox(1));

  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target.classList.contains("lightbox-backdrop")) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", e => {
    const isOpen = lightbox && lightbox.classList.contains("is-open");
    if (!isOpen) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") moveLightbox(1);
    if (e.key === "ArrowLeft") moveLightbox(-1);
  });
});
