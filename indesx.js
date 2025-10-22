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

