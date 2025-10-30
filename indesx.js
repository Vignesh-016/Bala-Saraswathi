document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0; // reset when hidden
      }
    });
  }
  

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Initialize first slide
  showSlide(currentIndex);
});
