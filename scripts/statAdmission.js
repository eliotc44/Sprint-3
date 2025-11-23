import{createNode} from"./domUtil.js";

// Fonction pour générer le template section complet
function buildAdmissionStatsTemplate(data) {
    return {
        tag: "section",
        class: "admission-stats",
        children: [
            {
                tag: "h2",
                text: "Statistique d'admission"
            },
            {
                tag: "div",
                class: "stats-controls",
                children: [
                    {
                        tag: "div",
                        class: "slider-controls glassy tag",
                        children: data.map((_, idx) => ({
                            tag: "button",
                            class: "bullet",
                            attrs: {
                                "aria-label": `aller à la slide numéro ${idx + 1}`
                            }
                        }))
                    },
                    {
                        tag: "button",
                        class: "slider-btn prev glassy tag",
                        children: [
                            {
                                tag: "img",
                                attrs: {
                                    src: "./images/svg/arrow-nav.svg",
                                    alt: "slide précédente"
                                }
                            }
                        ]
                    },
                    {
                        tag: "button",
                        class: "slider-btn next glassy tag",
                        children: [
                            {
                                tag: "img",
                                attrs: {
                                    src: "./images/svg/arrow-nav.svg",
                                    alt: "slide suivante"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                tag: "ul",
                children: data.map(data => ({
                    tag: "li",
                    class:data.statClass,
                    children: [
                        { tag: "h3", text: data.statNom },
                        { tag: "div", class: "stat "+data.statClass },
                        { tag: "button", class:"btn2023", text: "2023" },
                        { tag: "button", class:"btn2024", text: "2024" }
                    ]
                }))
            }
        ]
    };
}


export async function createAdmissionStats(formation) {
    const data = [
        { statNom: "Taux d'accès", statClass: "taux-acces"},
        { statNom: "Repartition d'accès Homme Femme", statClass: "repart-hf"},
        { statNom: "Repartition d'accès parcours", statClass: "repart-parcours"}
    ];

    const admissionStatsTemplate = buildAdmissionStatsTemplate(data);
    const dom = createNode(admissionStatsTemplate, data);
    return dom;
}


export  function updateBtnStyle() {
    const group = this.parentElement;       
    const buttons = group.querySelectorAll(".btn2023, .btn2024");
  
    buttons.forEach(btn => {
      btn.classList.remove("active");
      btn.disabled = false;
    });
  
    this.classList.add("active");
    this.disabled = true;
  }


  export function initSlider(slider) {
    if (!slider) return;
  
    const slidesContainer = slider.querySelector("ul");
    const slides = Array.from(slider.querySelectorAll("ul > li"));
  
    const btnPrev = slider.querySelector(".slider-btn.prev");
    const btnNext = slider.querySelector(".slider-btn.next");
    const bullets = Array.from(slider.querySelectorAll(".stats-controls .bullet"));
  
    let currentIndex = 0;
  
    function updateSlider() {
      if (!slides.length) return;
  
      const slideWidth = slides[0].clientWidth;
      const gap = parseInt(getComputedStyle(slidesContainer).gap) || 0;
      const offset = currentIndex * (slideWidth + gap);
  
      // Translate
      slidesContainer.style.transform = `translateX(-${offset}px)`;
  
      // Classe active sur slide
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === currentIndex);
      });
  
      // Classe active sur bullets
      bullets.forEach((b, i) => {
        b.classList.toggle("active", i === currentIndex);
      });
  
      // Gestion prev (première slide)
      if (btnPrev) {
        const isFirst = currentIndex === 0;
        btnPrev.disabled = isFirst;
        btnPrev.classList.toggle("disabled", isFirst);
        btnPrev.style.visibility = isFirst ? "hidden" : "visible";
      }
  
      // Gestion next (dernière slide)
      if (btnNext) {
        const isLast = currentIndex === slides.length - 1;
        btnNext.disabled = isLast;
        btnNext.classList.toggle("disabled", isLast);
        btnNext.style.visibility = isLast ? "hidden" : "visible";
      }
    }
  
    // Next (sans loop)
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });
    }
  
    // Prev (sans loop)
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }
  
    // Bullets
    bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });
  
    // Resize
    window.addEventListener("resize", updateSlider);
  
    // Init
    updateSlider();
  }
  