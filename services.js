const plans = {
    "1": {
      title: "1 Lakh",
      img: "https://via.placeholder.com/800x300/ff9999/333?text=1+Lakh",
      desc: "This is the main description for the 1 Lakh plan.",
      months: {
        "20": "For 20 months: You pay smaller installments with steady growth.",
        "40": "For 40 months: You pay lower monthly amounts with long-term benefits."
      }
    },
    "2": {
      title: "2 Lakhs",
      img: "https://via.placeholder.com/800x300/99ccff/333?text=2+Lakhs",
      desc: "This is the main description for the 2 Lakh plan.",
      months: {
        "20": "20 months option gives you a balanced short-term return.",
        "40": "40 months option maximizes savings with extended timeline."
      }
    },
    "5": {
      title: "5 Lakhs",
      img: "https://via.placeholder.com/800x300/ccffcc/333?text=5+Lakhs",
      desc: "This is the main description for the 5 Lakh plan.",
      months: {
        "20": "For 20 months: higher monthly payments, faster maturity.",
        "40": "For 40 months: lower payments, longer growth."
      }
    },
    "10": {
      title: "10 Lakhs",
      img: "https://via.placeholder.com/800x300/ffcc99/333?text=10+Lakhs",
      desc: "This is the main description for the 10 Lakh plan.",
      months: {
        "20": "20 months: aggressive savings with fast growth.",
        "40": "40 months: steady, long-term plan."
      }
    },
    "25": {
      title: "25 Lakhs",
      img: "https://via.placeholder.com/800x300/cc99ff/333?text=25+Lakhs",
      desc: "This is the main description for the 25 Lakh plan.",
      months: {
        "20": "20 months: short-term high installment plan.",
        "40": "40 months: relaxed payment with compounded growth."
      }
    },
    "50": {
      title: "50 Lakhs",
      img: "https://via.placeholder.com/800x300/99ffcc/333?text=50+Lakhs",
      desc: "This is the main description for the 50 Lakh plan.",
      months: {
        "20": "20 months: best for rapid wealth accumulation.",
        "40": "40 months: extended plan for consistent savings."
      }
    }
  };
  
  const planBtns = document.querySelectorAll(".plan-btn");
  const monthBtns = document.querySelectorAll(".month-btn");
  const planImage = document.getElementById("planImage");
  const planTitle = document.getElementById("planTitle");
  const planDesc = document.getElementById("planDesc");
  const monthDesc = document.getElementById("monthDesc");
  
  let currentPlan = "1";
  let currentMonth = "20";
  
  // Update Plan
  planBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      planBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
  
      currentPlan = btn.dataset.plan;
      const data = plans[currentPlan];
  
      planImage.src = data.img;
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
  