const plans = {
  "5": {
    title: "5 Lakhs",
    img: "/assets/images/Savings through chit.png", // Use local asset image as requested
    desc: "The ₹5,00,000 chit fund scheme is perfect for achieving bigger financial goals, offering reliable savings, transparent bidding, and instant payouts. Flexible options ensure each member finds the right fit for their needs, whether planning for family, business, or major purchases. This is the main description for the 5 Lakh plan.",
    months: {
      "20": "Save ₹25,000 per month for 20 months and access your lump sum faster. This plan is ideal for those who want quick results and timely fund disbursement",
      "40": "Contribute ₹12,500 per month over 40 months for a smoother savings journey. Enjoy lower monthly payments while gaining all the benefits of secure chit fund participation"
    }
  },
  "10": {
    title: "10 Lakhs",
    img: "https://via.placeholder.com/800x300/ffcc99/333?text=10+Lakhs",
    desc: "The ₹10,00,000 chit fund scheme lets you save with confidence and enjoy spot payments for life’s bigger goals. Tailored for ambitious savers, this plan combines secure contributions, transparent auctions, and flexible options to fit your needs.",
    months: {
      "20": "Pay ₹50,000 per month for 20 months to accumulate ₹10,00,000 quickly. Choose this path for faster access to your lump sum and maximum financial flexibility.",
      "40": "Opt for lower monthly payments: ₹25,000 per month over 40 months. Enjoy all the benefits of a secure chit fund with manageable installments spread over a longer term, ideal for steady savers."
    }
  },
  "25": {
    title: "25 Lakhs",
    img: "https://via.placeholder.com/800x300/cc99ff/333?text=25+Lakhs",
    desc: "The ₹25,00,000 chit fund scheme is designed for ambitious savers and business owners aiming for significant milestones. It offers secure savings, transparent bidding, and instant payouts with two flexible payment options.",
    months: {
      "20": "Pay ₹1,25,000 per month for 20 months and quickly accumulate a large corpus, perfect for major investments or business expansion.",
      "40": "Contribute ₹62,500 per month over 40 months, making high-value savings more accessible with comfortable payments and all the benefits of a premium chit fund plan."
    }
  },
  "50": {
    title: "50 Lakhs",
    img: "https://via.placeholder.com/800x300/99ffcc/333?text=50+Lakhs",
    desc: "The ₹50,00,000 chit fund scheme is tailored for visionaries and entrepreneurs with grand financial goals. It ensures secure savings, transparent auctions, and timely payouts with two convenient payment choices.",
    months: {
      "20": "Pay ₹2,50,000 per month for 20 months to build a substantial fund quickly, ideal for large-scale investments, real estate, or business expansion.",
      "40": "Contribute ₹1,25,000 per month for 40 months, offering a smoother payment schedule while enjoying all the advantages of a premium high-value chit fund plan."
    }
  }
};

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
    monthDesc.textContent = data.months[currentMonth];
  });
});

// Update Month
monthBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    monthBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentMonth = btn.dataset.month;
    monthDesc.textContent = plans[currentPlan].months[currentMonth];
  });
});
