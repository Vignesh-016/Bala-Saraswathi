// PDF files for each plan and month combination
// Make sure to add these PDF files to your assets folder:

const plans = {
  "5": {
    title: "5 Lakhs",
    img: "/assets/images/Savings through chit.png",
    desc: "The ₹5,00,000 chit fund scheme is perfect for achieving bigger financial goals, offering reliable savings, transparent bidding, and instant payouts. Flexible options ensure each member finds the right fit for their needs, whether planning for family, business, or major purchases. This is the main description for the 5 Lakh plan.",
    months: {
      "20": {
        desc: "Save ₹25,000 per month for 20 months and access your lump sum faster. This plan is ideal for those who want quick results and timely fund disbursement",
        pdf: "./assets/5L 20M.pdf" // Using 25L file as placeholder since 5L doesn't exist
      },
      "40": {
        desc: "Contribute ₹12,500 per month over 40 months for a smoother savings journey. Enjoy lower monthly payments while gaining all the benefits of secure chit fund participation",
        pdf: "./assets/5L 40M.pdf" // Using 25L file as placeholder since 5L doesn't exist
      }
    }
  },
  "10": {
    title: "10 Lakhs",
    img: "https://via.placeholder.com/800x300/ffcc99/333?text=10+Lakhs",
    desc: "The ₹10,00,000 chit fund scheme lets you save with confidence and enjoy spot payments for life's bigger goals. Tailored for ambitious savers, this plan combines secure contributions, transparent auctions, and flexible options to fit your needs.",
    months: {
      "20": {
        desc: "Pay ₹50,000 per month for 20 months to accumulate ₹10,00,000 quickly. Choose this path for faster access to your lump sum and maximum financial flexibility.",
        pdf: "./assets/10L 20M.pdf" // Using 50L file as placeholder since 10L doesn't exist
      },
      "40": {
        desc: "Opt for lower monthly payments: ₹25,000 per month over 40 months. Enjoy all the benefits of a secure chit fund with manageable installments spread over a longer term, ideal for steady savers.",
        pdf: "./assets/10L 40M.pdf" // Using 50L file as placeholder since 10L doesn't exist
      }
    }
  },
  "25": {
    title: "25 Lakhs",
    img: "https://via.placeholder.com/800x300/cc99ff/333?text=25+Lakhs",
    desc: "The ₹25,00,000 chit fund scheme is designed for ambitious savers and business owners aiming for significant milestones. It offers secure savings, transparent bidding, and instant payouts with two flexible payment options.",
    months: {
      "20": {
        desc: "Pay ₹1,25,000 per month for 20 months and quickly accumulate a large corpus, perfect for major investments or business expansion.",
        pdf: "./assets/25L 20M.pdf"
      },
      "40": {
        desc: "Contribute ₹62,500 per month over 40 months, making high-value savings more accessible with comfortable payments and all the benefits of a premium chit fund plan.",
        pdf: "./assets/25L 40M.pdf"
      }
    } 
  },
  "50": {
    title: "50 Lakhs",
    img: "https://via.placeholder.com/800x300/99ffcc/333?text=50+Lakhs",
    desc: "The ₹50,00,000 chit fund scheme is tailored for visionaries and entrepreneurs with grand financial goals. It ensures secure savings, transparent auctions, and timely payouts with two convenient payment choices.",
    months: {
      "20": {
        desc: "Pay ₹2,50,000 per month for 20 months to build a substantial fund quickly, ideal for large-scale investments, real estate, or business expansion.",
        pdf: "./assets/50L 20M.pdf"
      },
      "40": {
        desc: "Contribute ₹1,25,000 per month for 40 months, offering a smoother payment schedule while enjoying all the advantages of a premium high-value chit fund plan.",
        pdf: "./assets/50L 40M.pdf"
      }
    }
  }
};

// Required PDF files in assets folder:
// - 5L 20M.pdf (for 5 Lakhs 20 months)
// - 5L 40M.pdf (for 5 Lakhs 40 months)
// - 10L 20M.pdf (for 10 Lakhs 20 months)
// - 10L 40M.pdf (for 10 Lakhs 40 months)
// - 25L 20M.pdf (for 25 Lakhs 20 months) ✅ EXISTS
// - 25L 40M.pdf (for 25 Lakhs 40 months) ✅ EXISTS
// - 50L 20M.pdf (for 50 Lakhs 20 months) ✅ EXISTS
// - 50L 40M.pdf (for 50 Lakhs 40 months) ✅ EXISTS

const planBtns = document.querySelectorAll(".plan-btn");
const monthBtns = document.querySelectorAll(".month-btn");
const planImage = document.getElementById("planImage");
const planTitle = document.getElementById("planTitle");
const planDesc = document.getElementById("planDesc");
const monthDesc = document.getElementById("monthDesc");

let currentPlan = "5";  // ✅ Default set to 5 Lakhs
let currentMonth = "20";

// Update Plan
planBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    planBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentPlan = btn.dataset.plan;
    const data = plans[currentPlan];

    // Banner stays static (no update to planImage)
    planTitle.textContent = data.title;
    planDesc.textContent = data.desc;
    monthDesc.textContent = data.months[currentMonth].desc;
  });
});

// Update Month
monthBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    monthBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMonth = btn.dataset.month;
    monthDesc.textContent = plans[currentPlan].months[currentMonth].desc;
  });
});




// ✅ Check URL for ?plan=5 or ?plan=10 etc.
const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get("plan");

if (selectedPlan && plans[selectedPlan]) {
  currentPlan = selectedPlan;

  // Highlight correct button
  planBtns.forEach(btn => {
    if (btn.dataset.plan === selectedPlan) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update content
  const data = plans[selectedPlan];
  planTitle.textContent = data.title;
  planDesc.textContent = data.desc;
  monthDesc.textContent = data.months[currentMonth].desc;
}



// Get elements
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popupOverlay = document.getElementById("popupOverlay");

// Open popup
openPopup.addEventListener("click", (e) => {
  e.preventDefault();
  popupOverlay.style.display = "flex";
});

// Close popup (X button)
closePopup.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

// Close popup (click outside)
window.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});

// Download Plans Button Functionality
const downloadBtn = document.querySelector('.cta-btn:not(.primary)'); // First CTA button (Download Our Plans)

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Get the current plan and month data
  const currentPlanData = plans[currentPlan];
  const currentMonthData = currentPlanData.months[currentMonth];
  const pdfFile = currentMonthData.pdf;
  
  // Create PDF viewer modal
  showPDFModal(pdfFile, `${currentPlanData.title} - ${currentMonth} Months Plan`);
  
  // Optional: Show a success message
  console.log(`Opening ${currentPlanData.title} ${currentMonth} month plan PDF...`);
});

// PDF Viewer Modal Function
function showPDFModal(pdfUrl, title) {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'pdf-modal-overlay';
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    padding: 20px;
    box-sizing: border-box;
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    border-radius: 12px;
    width: 90%;
    height: 90%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  `;

  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
    border-radius: 12px 12px 0 0;
  `;

  const headerTitle = document.createElement('h3');
  headerTitle.textContent = title;
  headerTitle.style.cssText = `
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  `;

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = '#f0f0f0';
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'none';
  });

  // Create PDF container
  const pdfContainer = document.createElement('div');
  pdfContainer.style.cssText = `
    flex: 1;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
  `;

  // Create iframe for PDF
  const pdfIframe = document.createElement('iframe');
  pdfIframe.src = pdfUrl;
  pdfIframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `;

  // Assemble modal
  header.appendChild(headerTitle);
  header.appendChild(closeBtn);
  pdfContainer.appendChild(pdfIframe);
  modalContent.appendChild(header);
  modalContent.appendChild(pdfContainer);
  modalOverlay.appendChild(modalContent);

  // Add to page
  document.body.appendChild(modalOverlay);

  // Close functionality
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}
