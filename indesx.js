// ERROR FOUND: The code is wrapped in <script> ... </script> tags, which is invalid in a .js file.
// SOLUTION: Remove the <script> and </script> tags.

document.addEventListener('DOMContentLoaded', () => {
  const yearIds = ['y1990','y2000','y2010','y2020','y2025'];
  const radios  = yearIds.map(id => document.getElementById(id));
  const tabs    = Array.from(document.querySelectorAll('.tab'));
  const tabbar  = document.querySelector('.tabbar');
  let current   = 0;
  let autoplay  = null;

  /* ---- 1) sequentially reveal the year pills ---- */
  function revealSequentially(i = 0){
    if(i >= tabs.length){
      // all pills shown -> start autoplay of panels
      startAutoplay();
      return;
    }
    const t = tabs[i];
    t.classList.add('is-visible');
    // small stagger after each entrance
    t.addEventListener('animationend', () => {
      setTimeout(() => revealSequentially(i+1), 120);
    }, { once:true });
  }

  /* ---- 2) update active pill + progress line ---- */
  function setActive(index){
    current = index;
    // check the corresponding radio (this shows the panel)
    radios.forEach((r,i) => r.checked = i === index);
    // pill styles
    tabs.forEach((t,i) => t.classList.toggle('active', i === index));
    // blue progress width: from first pill center to active pill center
    requestAnimationFrame(() => {
      const first = tabs[0].getBoundingClientRect();
      const active = tabs[index].getBoundingClientRect();
      const barRect = tabbar.getBoundingClientRect();

      const startX = (first.left + first.right)/2;
      const endX   = (active.left + active.right)/2;
      const width  = Math.max(0, endX - startX);
      tabbar.style.setProperty('--progress', `${width}px`);
    });
  }

  /* ---- 3) autoplay after reveal ---- */
  function startAutoplay(){
    setActive(0);
    autoplay = setInterval(() => {
      const next = (current + 1) % yearIds.length;
      setActive(next);
    }, 4000);
  }

  /* click on a pill -> go there and keep autoplay running */
  tabs.forEach((t,i) => t.addEventListener('click', () => setActive(i)));

  /* start: hide pills (CSS does), reveal them one by one */
  revealSequentially();
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other accordion items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          const otherIcon = otherItem.querySelector('.accordion-icon');
          otherContent.style.maxHeight = '0';
          otherContent.style.opacity = '0';
          otherIcon.textContent = '+';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        icon.textContent = '+';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        icon.textContent = '−';
      }
    });
  });
});



// =================== FIXED VIDEO TESTIMONIAL CAROUSEL ===================
class TestimonialCarousel {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;

    // ✅ manually add local videos from /assets/videos/
    this.testimonials = [
      { name: "Anitha | Chennai", src: "../assets/images/testimonials 1.mp4" },
      { name: "Karthik | Madurai", src: "./assets/images/testimonials 2.mp4" },
      { name: "Priya | Coimbatore", src: "./assets/images/testimonials 3.mp4" },
      { name: "Rahul | Tirunelveli", src: "./assets/images/testimonials 4.mp4" },
      { name: "Meera | Thanjavur", src: "./assets/images/testimonials 5.mp4" },
      { name: "Deepa | Trichy", src: "./assets/images/testimonials 6.mp4" },
      { name: "Sanjay | Salem", src: "./assets/images/testimonials 7.mp4" },
      { name: "Nisha | Erode", src: "./assets/images/testimonials 8.mp4" },
      { name: "Gokul | Karur", src: "./assets/images/testimonials 9.mp4" },
      { name: "Divya | Tuticorin", src: "./assets/images/testimonials 10.mp4" },
      { name: "Vignesh | Cuddalore", src: "./assets/images/testimonials 11.mp4" },
      { name: "Harini | Dindigul", src: "./assets/images/testimonials 12.mp4" },
      { name: "Kavya | Nagercoil", src: "./assets/images/testimonials 13.mp4" },
      { name: "Rajesh | Puducherry", src: "./assets/images/testimonials 14.mp4" },
    ];

    this.total = this.testimonials.length;
    this.track = document.getElementById("carouselTrack");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.slides = [];
    this.init();
  }

  init() {
    this.createSlides();
    this.setupEvents();
    this.updateCarousel();
  }

  createSlides() {
    this.testimonials.forEach((t, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.dataset.index = index;
      slide.style.display = "none";

      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-video-container">
            <video preload="metadata" playsinline>
              <source src="${t.src}" type="video/mp4">
            </video>
            <div class="play-btn"><i class="fas fa-play"></i></div>
            <div class="testimonial-reviewer">${t.name}</div>
          </div>
        </div>
      `;
      this.track.appendChild(slide);
      this.slides.push(slide);
    });
  }

  setupEvents() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
  
    // ✅ Fixed Play/Pause button event handling
    this.track.addEventListener("click", (e) => {
      // Check if click is on play button or its icon
      const playBtn = e.target.closest(".play-btn");
      if (!playBtn) return;

      const video = playBtn.parentElement.querySelector("video");
      if (!video) return;

      // Pause all OTHER videos first (not the current one)
      this.slides.forEach((s) => {
        const otherVideo = s.querySelector("video");
        const otherBtn = s.querySelector(".play-btn");
        if (otherVideo && otherVideo !== video) {
          otherVideo.pause();
          if (otherBtn) otherBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      });

      // Toggle current video
      if (video.paused) {
        video.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        video.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }

      // When video ends, reset icon
      video.onended = () => {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      };
    });
  }
  

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.updateCarousel();
    setTimeout(() => (this.isAnimating = false), 600);
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
    this.updateCarousel();
    setTimeout(() => (this.isAnimating = false), 600);
  }

  updateCarousel() {
    // First, hide all slides and reset classes + play buttons
    this.slides.forEach((s) => {
      s.classList.remove("active", "prev", "next");
      s.style.display = "none";
      const v = s.querySelector("video");
      const b = s.querySelector(".play-btn");
      if (v) v.pause();
      if (b) b.innerHTML = '<i class="fas fa-play"></i>';
    });

    // Always show the current (center/active) slide
    this.slides[this.currentIndex].classList.add("active");
    this.slides[this.currentIndex].style.display = "block";

    // Only show prev/next when actually navigating (not on page load)
    // On page load, both are hidden. But after navigation, show prev/next as usual.

    // Detect if this is the first load (show only the center slide)
    // We'll use a flag on the class instance
    if (typeof this.hasNavigated === "undefined") {
      this.hasNavigated = false;
    }

    // Only show the prev/next slides if a navigation button was clicked at least once
    if (this.hasNavigated) {
      const prevIndex = (this.currentIndex - 1 + this.total) % this.total;
      const nextIndex = (this.currentIndex + 1) % this.total;

      this.slides[prevIndex].classList.add("prev");
      this.slides[prevIndex].style.display = "block";

      this.slides[nextIndex].classList.add("next");
      this.slides[nextIndex].style.display = "block";
    }
  }

  // Overwrite next/prev to set flag when navigation occurs
  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.hasNavigated = true;
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.updateCarousel();
    setTimeout(() => (this.isAnimating = false), 600);
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.hasNavigated = true;
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
    this.updateCarousel();
    setTimeout(() => (this.isAnimating = false), 600);
  }

  pauseAllVideos() {
    this.slides.forEach((s) => {
      const v = s.querySelector("video");
      const b = s.querySelector(".play-btn");
      if (v) v.pause();
      if (b) b.innerHTML = '<i class="fas fa-play"></i>';
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new TestimonialCarousel());
