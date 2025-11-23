import{createNode} from"./domUtil.js";

// Fonction pour générer le template section complet
function buildInsertionStatsTemplate(data) {
    return {
        tag: "section",
        class: "insertion-stats",
        children: [
            {
                tag: "h2",
                text: "Statistique d\"insertion professionnelle"
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
                        { tag: "div", class: "stat " + data.statClass }
                    ]
                }))
            }
        ]
    };
}


export async function createInsertionStats(formation) {
    const data = [
        { statNom: "Comparatifs des salaires", statClass: "comparatifs-salaires"},
        { statNom: "Taux d'insertion", statClass: "taux-insertion"}
    ];

    const admissionStatsTemplate = buildInsertionStatsTemplate(data);
    const dom = createNode(admissionStatsTemplate, data);
    return dom;
}


