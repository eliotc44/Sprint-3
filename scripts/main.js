/*?id=1402546G42EK*/

import { getMasterId } from "./fetchMaster.js";
import { createEntete } from './entete.js';
import { createAdmissionStats, updateBtnStyle, initSlider} from './statAdmission.js';
import { createInsertionStats } from './statInsertion.js';
import { afficherCarteEtablissement, afficherTauxDacces, afficherRepratitionHF, afficherRepartitionFormation, afficherSalaire, afficherTauxInsertion, afficherCarteSuggestion} from "./viz.js";
import { createConseilsEtablissement } from "./cartesConseilsEtablissement.js";
import { selectPersona, createPersona } from "./persona.js";
import {createSuggestion} from "./suggestion.js";

document.addEventListener("DOMContentLoaded", initialiser)

async function initialiser() {
    const content = document.getElementById("content");
    const id = getMasterId(window.location.href)
    if (id != null) {
        try {
            const response = await fetch("https://monmaster-api-uni.up.railway.app/api/formations/" + id);
            (response.status);
            const formation = await response.json();

            const enteteDom = await createEntete(formation);
            content.appendChild(enteteDom);
            afficherCarteEtablissement({ formation });

            const admissionDom = await createAdmissionStats(formation);
            content.appendChild(admissionDom);
            afficherRepratitionHF(2024, formation);
            afficherTauxDacces(2024, formation);
            afficherRepartitionFormation(2024, formation);
            const sectionAdmission = document.querySelector(".admission-stats");
            initSlider(sectionAdmission);
            const btns2024 = document.querySelectorAll(".btn2024");
            btns2024.forEach(btn => {
                btn.classList.add("active");
                btn.disabled = true;
            });
            document.querySelector(".taux-acces .btn2024").addEventListener("click", (btn) => {
                afficherTauxDacces(2024, formation);
                updateBtnStyle.call(event.currentTarget);
            });
            document.querySelector(".taux-acces .btn2023").addEventListener("click", (btn) => {
                afficherTauxDacces(2023, formation);
                updateBtnStyle.call(event.currentTarget);
            });
            document.querySelector(".repart-hf .btn2024").addEventListener("click", (btn) => {
                afficherRepratitionHF(2024, formation);
                updateBtnStyle.call(event.currentTarget);
            });
            document.querySelector(".repart-hf .btn2023").addEventListener("click", (btn) => {
                afficherRepratitionHF(2023, formation);
                updateBtnStyle.call(event.currentTarget);
            });
            document.querySelector(".repart-parcours .btn2024").addEventListener("click", (btn) => {
                afficherRepartitionFormation(2024, formation);
                updateBtnStyle.call(event.currentTarget);
            });
            document.querySelector(".repart-parcours .btn2023").addEventListener("click", (btn) => {
                afficherRepartitionFormation(2023, formation);
                updateBtnStyle.call(event.currentTarget);
            });


            if (formation.insertion_professionnelle.pct_sortant_emplois !== "nd" && formation.insertion_professionnelle.pct_sortant_emplois !== "" && formation.insertion_professionnelle.pct_sortant_emplois !== null) {
                const insertionDom = await createInsertionStats(formation);
                content.appendChild(insertionDom);
                afficherSalaire(formation);
                afficherTauxInsertion(formation);
                const sectionInsertion = document.querySelector(".insertion-stats");
                initSlider(sectionInsertion);
    
            }

            const persona = await selectPersona(formation);
            if (persona) {
                const personaDOM = createPersona(persona);
                content.appendChild(personaDOM);
            }

            if (Array.isArray(formation.diplomesConseilles) && formation.diplomesConseilles.length > 0) {
                const conseilEtab = await createConseilsEtablissement(formation);
                content.appendChild(conseilEtab);
            }
            let idMentions = formation.mention_id;
            const responseSuggestion = await fetch("https://monmaster-api-uni.up.railway.app/api/formations/mention/" + idMentions + "?max=100");
            const formationsSuggestion = await responseSuggestion.json();
            if (!formationsSuggestion.error){
                const formationsArray = Object.values(formationsSuggestion);
                const points = [];
                formationsArray.forEach(formationsSuggestion => {
                    points.push({
                      lat: formationsSuggestion.geo.lat,
                      lon: formationsSuggestion.geo.lon,
                      name: formationsSuggestion.libelle + " " + formationsSuggestion.parcours,
                      url: "./master.html?id=" + formationsSuggestion.id,
                      curr: formationsSuggestion.id == formation.id
                    });
                });      
            const suggestion = await createSuggestion();
            content.appendChild(suggestion);
            afficherCarteSuggestion(points);


        }
        } catch (erreur) {
            console.error("Erreur :", erreur);
        }
    }
}



