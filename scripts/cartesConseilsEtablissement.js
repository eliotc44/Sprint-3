import { createNode } from "./domUtil.js";
import { getAllEtablissements, getAllDisciplines } from "./cache.js";


function buildConseilCard(items, className) {
    const itemsGroupes =
        className === "disciplines-conseilles"
            ? (() => {
                const groupes = [];
                for (let i = 0; i < items.length; i += 3) {
                    groupes.push(items.slice(i, i + 3));
                }
                return groupes;
            })()
            : items;
    return {
        tag: "ul",
        class: className,
         children:

                    // Diplômes : groupes de 3
                    className === "disciplines-conseilles"
                        ? itemsGroupes.map(groupe => ({
                            tag: "li",
                            class:"card-disciplines-conseilles",
                            children: [
                                {
                                    tag: "ul",
                                    children: groupe.map(txt => ({
                                        tag: "li",
                                        children: [{ tag: "p", text: txt }]
                                    }))
                                }
                            ]
                        }))

                        // Qualités : liste simple
                        : items.map((txt, i) => ({
                            tag: "li",
                            class:"card-qualite-a-avoir",
                            children: [
                                { tag: "h4", text: (i + 1).toString() },
                                { tag: "p", text: txt }
                            ]
                        }))
            }
      };

export async function createConseilsEtablissement(formation) {

    const diplomes = formation.diplomesConseilles || [];
    const qualites = formation.attendus || [];
    const etablissements = await getAllEtablissements();
    const etablissement = etablissements[formation.etablissement_id];



    const template = {
        tag: "section",
        class: "conseil-etablissement",
        children: [
            {
                tag: "div",
                class: "conseil-titre",
                children: [
                    {
                        tag: "img",
                        class: "logo-univ",
                        attrs: {
                            src: `https://monmaster.gouv.fr/api/logo/${etablissement.uai}`,
                            alt: etablissement.nom,
                        }
                    },
                    { tag: "h2", text: "Les conseils de l’établissement" }
                ]
            },

            {
                tag: "div",
                class: "conseil-info",
                children: [
                    {tag:"h3", text: "Disciplines conseillées"},
                    {tag:"div", 
                    class: "container-disciplines-conseilles",
                    children: [
                        buildConseilCard(
                            diplomes,
                            "disciplines-conseilles"
                        )
                    ]    
                    },

                    {tag:"h3", text: "Qualités à avoir"},
                    {tag:"div", 
                        class: "container-qualite-a-avoir",
                        children: [
                            buildConseilCard(
                                
                                qualites,
                                "qualite-a-avoir"
                            )
                        ]    
                        }
                ]
            }
        ]
    };

    return createNode(template);
}
