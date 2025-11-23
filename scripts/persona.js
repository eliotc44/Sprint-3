import { getAllDisciplines } from "./cache.js";
import{createNode} from"./domUtil.js";

export async function selectPersona(formation) {

    const disciplines = await getAllDisciplines();
    const persona = disciplines[formation.id_discipline];
    console.log(persona);

    if (!persona) return null;

    // Construction des données prêtes pour createPersona()
    return {
        nom: persona.nom,
        age: persona.age,
        discipline: persona.discipline,
        description: persona.description,

        // image auto : camille.png, yassine.png, etc.
        image: `./images/${persona.nom.toLowerCase()}.png`,

        // classe CSS auto : ex tag-sciences-humaines-et-sociales
        tagClass: `tag-${persona.discipline.toLowerCase()
            .replace(/ /g, "-")
            .replace(/,/g, "")
            .replace(/é/g, "e")
            .replace(/è/g, "e")
            .replace(/ê/g, "e")
            .replace(/î/g, "i")
        }`,

        // champs générés plus tard
        habitudes:persona.habitude_vie,

        parcours:
            `Avant de rejoindre ce master, ${persona.nom} a suivi un parcours cohérent en lien avec les sciences étudiées. ` + persona.parcours_scolaire
    };
}


/**
 * Génère le DOM du persona
 */
export function createPersona(persona) {

    const template = {
        tag: "section",
        class: "section-persona",
        children: [

            { tag: "h2", text: "Découvrez l’une des personnes étudiant en Master" },

            // --- Présentation ---
            {
                tag: "div",
                class: "presentation-persona",
                children: [
                    {
                        tag: "div",
                        class: "textes-persona",
                        children: [
                            { tag: "h3", class: persona.tagClass, text: persona.nom },
                            { tag: "p", text: `${persona.age} ans, ${persona.discipline}` },
                            { tag: "p", class: "description", text: persona.description }
                        ]
                    },
                    { tag: "img", attrs: { src: persona.image, alt: persona.nom } }
                ]
            },

            // --- Habitudes ---
            {
                tag: "div",
                class: "habitudes-de-vie-persona",
                children: [
                    {
                        tag: "div",
                        class: "textes-persona",
                        children: [
                            { tag: "h3", class: persona.tagClass, text: "Habitudes de vie" },
                            { tag: "p", class: "description", text: persona.habitudes }
                        ]
                    },
                    { tag: "img", attrs: { src: persona.image, alt: persona.nom } }
                ]
            },

            // --- Parcours ---
            {
                tag: "div",
                class: "parcours-de-vie-persona",
                children: [
                    {
                        tag: "div",
                        class: "textes-persona",
                        children: [
                            { tag: "h3", class: persona.tagClass, text: "Parcours de vie" },
                            { tag: "p", class: "description", text: persona.parcours }
                        ]
                    },
                    { tag: "img", attrs: { src: persona.image, alt: persona.nom } }
                ]
            }
        ]
    };

    return createNode(template);
}