const API_BASE = "https://monmaster-api-uni.up.railway.app/api";

let cacheEtablissements = null;
let cacheDisciplines = null;


export function getAllEtablissements() {
  // 1. Cache RAM
  if (cacheEtablissements) {
    console.log("→ Établissements depuis le cache RAM");
    return Promise.resolve(cacheEtablissements);
  }

  // 2. Cache localStorage
  const stored = localStorage.getItem("etablissements");
  if (stored) {
    console.log("→ Établissements depuis le localStorage");
    cacheEtablissements = JSON.parse(stored);
    return Promise.resolve(cacheEtablissements);
  }

  // 3. Fetch API
  console.log("→ Fetch API /etablissements");
  return fetch(API_BASE + "/etablissements")
    .then(function (reponse) {
      if (!reponse.ok) {
        throw new Error("HTTP " + reponse.status);
      }
      return reponse.json();
    })
    .then(function (donnees) {
      cacheEtablissements = donnees;
      localStorage.setItem("etablissements", JSON.stringify(donnees));
      return donnees;
    })
    .catch(function (erreur) {
      console.error("Erreur getAllEtablissements :", erreur);
      return [];
    });
}

// ===============================
// 2) Toutes les disciplines
// ===============================
export function getAllDisciplines() {
  // 1. Cache RAM
  if (cacheDisciplines) {
    console.log("→ Disciplines depuis le cache RAM");
    return Promise.resolve(cacheDisciplines);
  }

  // 2. Cache localStorage
  const stored = localStorage.getItem("disciplines");
  if (stored) {
    console.log("→ Disciplines depuis le localStorage");
    cacheDisciplines = JSON.parse(stored);
    return Promise.resolve(cacheDisciplines);
  }

  // 3. Fetch API
  console.log("→ Fetch API /disciplines");
  return fetch(API_BASE + "/disciplines")
    .then(function (reponse) {
      if (!reponse.ok) {
        throw new Error("HTTP " + reponse.status);
      }
      return reponse.json();
    })
    .then(function (donnees) {
      cacheDisciplines = donnees;
      localStorage.setItem("disciplines", JSON.stringify(donnees));
      return donnees;
    })
    .catch(function (erreur) {
      console.error("Erreur getAllDisciplines :", erreur);
      return [];
    });
}


export function clearApiCache() {
  cacheEtablissements = null;
  cacheDisciplines = null;
  localStorage.removeItem("etablissements");
  localStorage.removeItem("disciplines");
}
