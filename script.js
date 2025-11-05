// Carousel functionality
const slides = document.getElementById('slides');
let slidesArr = Array.from(slides.children);
let index = 0;

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % slidesArr.length;
  updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + slidesArr.length) % slidesArr.length;
  updateCarousel();
});

function updateCarousel() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Delete and Reset functionality
let deletedSections = [];
const resetBtn = document.getElementById('resetBtn');

slides.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const slide = e.target.closest('.slide');
    const position = slidesArr.indexOf(slide);

    deletedSections.push({
      id: slide.id,
      html: slide.outerHTML,
      position: position
    });

    slide.remove();
    slidesArr = Array.from(slides.children);

    if (index >= slidesArr.length) index = slidesArr.length - 1;
    if (index < 0) index = 0;
    updateCarousel();
  }
});

resetBtn.addEventListener('click', () => {
  deletedSections.sort((a, b) => a.position - b.position);

  deletedSections.forEach(sec => {
    const temp = document.createElement('div');
    temp.innerHTML = sec.html;
    slides.insertBefore(temp.firstElementChild, slides.children[sec.position] || null);
  });

  deletedSections = [];
  slidesArr = Array.from(slides.children);
  index = 0;
  updateCarousel();
});
