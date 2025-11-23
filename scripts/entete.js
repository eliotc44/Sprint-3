import { getAllEtablissements, getAllDisciplines, clearApiCache} from "./cache.js";
import{createNode} from"./domUtil.js";


const enteteTemplate = {
    tag: 'section',
    class: 'entete',
    children: [
        {
            tag: 'div',
            class: 'entete-presentation',
            children: [
                { tag: 'img', class: 'logo-univ', attrs: { srcKey: 'logoSrc', altKey: 'logoAlt' } },
                { tag: 'h1', class: 'intitulé-master', dataKey: 'titre' },
                { tag: 'p', class: 'univ', dataKey: 'univ' },
                { tag: 'a', class: 'partage-master', attrs: { target: '_blank', hrefKey: 'partageHref' }, text: 'Partager' },
                { tag: 'a', class: 'postule-master', attrs: { target: '_blank', hrefKey: 'postuleHref' }, text: 'Postuler sur mon Master' }
            ]
        },
        {
            tag: 'div',
            class: 'entete-info',
            children: [
                { tag: 'div', class: 'carte-etablissement' },
                {
                    tag: 'div', class: 'domaine',
                    children: [
                        { tag: 'h2', text: 'Domaine' },
                        { tag: 'p', dataKey: 'domaine' }
                    ]
                },
                {
                    tag: 'div', class: 'capacite',
                    children: [
                        { tag: 'h2', text: 'Capacité' },
                        { tag: 'p', dataKey: 'capacite' }
                    ]
                },
                {
                    tag: 'div', class: 'alternance',
                    children: [
                        { tag: 'h2', text: 'Alternance' },
                        { tag: 'p', dataKey: 'alternance' }
                    ]
                },
            ]
        }
    ]
};


export async function createEntete(formation) {
    const etablissements = await getAllEtablissements();
    const etablissement = etablissements[formation.etablissement_id];
    const disciplines = await getAllDisciplines();
    const discipline = disciplines[formation.id_discipline];
    console.log(disciplines);
    const data = {
        logoSrc: `https://monmaster.gouv.fr/api/logo/${etablissement.uai}`,
        logoAlt: etablissement.nom,
        titre: `${formation.libelle} ${formation.parcours}`,
        univ: etablissement.nom,
        partageHref: '', // Lien de partage à compléter selon besoins
        postuleHref: `https://monmaster.gouv.fr/formation/${formation.etablissement_id}/${formation.id}/detail`,
        domaine: discipline.discipline,
        capacite: formation.capacite,
        alternance: formation.alternance ? "oui" : "non",
    };

    const dom = createNode(enteteTemplate, data);
    return dom;
}
