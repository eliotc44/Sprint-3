import { getAllEtablissements } from "./cache.js";

export async function afficherCarteEtablissement({ formation }) {
  const etablissements = await getAllEtablissements();

  if (formation.geo.lat != null && formation.geo.lon != null) {
      const lat = formation.geo.lat;
      const lon = formation.geo.lon;

      const container = document.querySelector(".carte-etablissement");
      container.style.width = container.style.width || "100%";
      container.style.height = container.style.height || "350px";

      // 📌 Reset carte si déjà existante
      if (container._leaflet_id) {
          container._leaflet_id = null;
          container.innerHTML = "";
      }

      // 🎨 Fond de carte (même que ton OpenLayers)
      const baseLight = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      );

      // 📍 Icône personnalisée
      const icon = L.icon({
          iconUrl: "./images/svg/icone_current.svg",
          iconSize: [40, 40],       // ajustable
          iconAnchor: [20, 40]      // même effet anchor [0.5, 1]
      });

      // 🗺️ Initialisation de la carte
      const map = L.map(container, {
          center: [lat, lon],
          zoom: 12,
          minZoom: 3,
          maxZoom: 19,
          layers: [baseLight]
      });

      // 📍 Ajout du marqueur
      L.marker([lat, lon], { icon }).addTo(map);
  }
}


// Données
const tauxAcces = {
    2024: 56.5,
    2023: 35.9
  };
  
  // Couleurs donut


  export function afficherRepratitionHF(year, formation) {
    const colors = ["#2050F0", "#C9BAFF"];
    const container = document.querySelector(".stat.repart-hf");
  
    // Reset complet
    container.innerHTML = "";
  
    // 1) Ajouter la div du chart
    const chartDiv = document.createElement("div");
    chartDiv.style.width = "100%";
    chartDiv.style.height = "350px";
    container.appendChild(chartDiv);
  
    const chart = echarts.init(chartDiv);
    let stats;
    // 2) Construire les données
    if(year == 2023){
         
        stats = formation.stat_prev_admission; 
    }else if(year == 2024){
        stats = formation.stat_actuel_admission; 
    }
    const data = [
        { value: stats.pct_acp_hommes, name: `Hommes (en %)` },
        { value: 100 - stats.pct_acp_femmes, name: "Femmes (en %)" }
    ];

  
    chart.setOption({
      title: {
        text: `Taux d'accès ${year}`,
        left: "center",
        top: 8,
        textStyle: { fontSize: 16, fontWeight: 600, color: "#111827" }
      },
      tooltip: { formatter: "{b} : {d}%" },
      series: [
        {
          type: "pie",
          radius: ["55%", "80%"],
          data: data,
          label: { show: false },
          labelLine: { show: false }
        }
      ],
      itemStyle: {
        borderRadius: 10,
      },
      color: colors
    });
  
    // 4) Ajouter le container légende
    const legendDiv = document.createElement("div");
    legendDiv.classList.add("container-stat-tag")
    legendDiv.style.display = "flex";
    legendDiv.style.gap = "12px";
    container.appendChild(legendDiv);
  

    data.forEach((item, index) => {
      const span = document.createElement("span");
      span.classList.add("stat-tag");
      span.textContent = item.name;
    span.style.setProperty("--tag-color", colors[index]);
        span.textContent = (item.name);
      legendDiv.appendChild(span);
    });
  
    // Responsive
    window.addEventListener("resize", () => chart.resize());
  }

  export function afficherTauxDacces(year, formation) {
    const colors = ["#7953FF", "#E5E7EB"];
    const container = document.querySelector(".stat.taux-acces");
  
    // Reset complet
    container.innerHTML = "";
  
    // 1) Ajouter la div du chart
    const chartDiv = document.createElement("div");
    chartDiv.style.width = "100%";
    chartDiv.style.height = "350px";
    container.appendChild(chartDiv);
  
    const chart = echarts.init(chartDiv);
    let stats;
    // 2) Construire les données
    if(year == 2023){
         
        stats = formation.stat_prev_admission; 
    }else if(year == 2024){
        stats = formation.stat_actuel_admission; 
    }
    let tauxAcces;
    if(stats.tauxAcces == 0 && stats.propositions != 0){
      tauxAcces = stats.propositions / stats.candidatures * 100;
    }else{
      tauxAcces = stats.tauxAcces;
    }
    const data = [
        { value: tauxAcces, name: `Taux d'accès` },
        { value: 100 - tauxAcces, name: "Taux de rejet" }
    ];

  
    chart.setOption({
      title: {
        text: `Repartition ${year}`,
        left: "center",
        top: 8,
        textStyle: { fontSize: 16, fontWeight: 600, color: "#111827" }
      },
      tooltip: { formatter: "{b} : {d}%" },
      series: [
        {
          type: "pie",
          radius: ["55%", "80%"],
          data: data,
          label: { show: false },
          labelLine: { show: false }
        }
      ],
      itemStyle: {
        borderRadius: 10,
      },
      color: colors
    });
  
    // 4) Ajouter le container légende
    const legendDiv = document.createElement("div");
    legendDiv.classList.add("container-stat-tag")
    legendDiv.style.display = "flex";
    legendDiv.style.gap = "12px";
    container.appendChild(legendDiv);
  

    data.forEach((item, index) => {
      const span = document.createElement("span");
      span.classList.add("stat-tag");
      span.textContent = item.name;
    span.style.setProperty("--tag-color", colors[index]);
        span.textContent = (item.name);
      legendDiv.appendChild(span);
    });
  
    // Responsive
    window.addEventListener("resize", () => chart.resize());
  }




  export function afficherRepartitionFormation(year, formation) {
    const colors = ["#7953FF", "#C9BAFF", "#60BAFF", "#00B1D7", "#0072C8"];
    const container = document.querySelector(".stat.repart-parcours");
  
    // Reset complet
    container.innerHTML = "";
  
    // 1) Ajouter la div du chart
    const chartDiv = document.createElement("div");
    chartDiv.style.width = "100%";
    chartDiv.style.height = "350px";
    container.appendChild(chartDiv);
  
    const chart = echarts.init(chartDiv);
    let stats;
    // 2) Construire les données
    if(year == 2023){
         
        stats = formation.stat_prev_admission; 
    }else if(year == 2024){
        stats = formation.stat_actuel_admission; 
    }
    const data = [
        { value: stats.pct_acp_lg, name: `Licence Général` },
        { value: stats.pct_acp_lp, name: `Licence Professionnel` },
        { value: stats.pct_acp_but, name: `Bachelore Universitaire Technologique` },
        { value: stats.pct_acp_master, name: `Master` },
        { value: stats.pct_acp_autre, name: `Autre` }
    ];

  
    chart.setOption({
      title: {
        text: `Repartition ${year}`,
        left: "center",
        top: 8,
        textStyle: { fontSize: 16, fontWeight: 600, color: "#111827" }
      },
      tooltip: { formatter: "{b} : {d}%" },
      series: [
        {
          type: "pie",
          radius: ["55%", "80%"],
          data: data,
          label: { show: false },
          labelLine: { show: false }
        }
      ],
      itemStyle: {
        borderRadius: 10,
      },
      color: colors
    });
  
    // 4) Ajouter le container légende
    const legendDiv = document.createElement("div");
    legendDiv.classList.add("container-stat-tag")
    legendDiv.style.display = "flex";
    legendDiv.style.gap = "12px";
    container.appendChild(legendDiv);
  

    data.forEach((item, index) => {
      const span = document.createElement("span");
      span.classList.add("stat-tag");
      span.textContent = item.name;
    span.style.setProperty("--tag-color", colors[index]);
        span.textContent = (item.name);
      legendDiv.appendChild(span);
    });
  
    // Responsive
    window.addEventListener("resize", () => chart.resize());
  }


  export function afficherTauxInsertion(formation) {
    const wrapper = document.querySelector('.stat.taux-insertion');
    wrapper.innerHTML = "";
  
    // ----- Structure du DOM -----
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");
    chartContainer.style.width = "100%";
    chartContainer.style.minHeight = "260px";
  
    const legendDiv = document.createElement("div");
    legendDiv.classList.add("container-stat-tag");
    legendDiv.style.display = "flex";
    legendDiv.style.gap = "12px";
  
    wrapper.appendChild(chartContainer);
    wrapper.appendChild(legendDiv);
  
    // ----- Init ECharts -----
    const myChart = echarts.init(chartContainer);
  
    const colors = ['#2050F0', '#C9BAFF', '#60BAFF', '#7953FF'];
    const labels = [
      'Taux d’insertion',
      'Taux sortant',
      'Taux de poursuite'
    ];
  
    const values = [
      formation.insertion_professionnelle.pct_sortant_emplois,
      formation.insertion_professionnelle.pct_sortant,
      formation.insertion_professionnelle.pct_poursuites
    ].map(v => Number(String(v).replace(",", ".").trim()));
  
    const option = {
      polar: { radius: [30, '80%'] },
      angleAxis: { max: 100, startAngle: 90 },
      radiusAxis: {
        type: 'category',
        data: labels,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      tooltip: { trigger: 'item', formatter: '{b} : {c}%' },
      series: [
        {
          type: 'bar',
          coordinateSystem: 'polar',
          roundCap: true,
          data: values.map((v, i) => ({
            value: v,
            name: labels[i],
            itemStyle: { color: colors[i] },
            label: {
              show: true,
              position: 'start',
              distance: 10,
              rotate: 'tangential',
              formatter: v + '%',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700
            }
          }))
        }
      ]
    };
  
    myChart.setOption(option);
  
    // ----- Légende -----
    labels.forEach((item, i) => {
      const span = document.createElement("span");
      span.classList.add("stat-tag");
      span.textContent = item;
      span.style.setProperty("--tag-color", colors[i]);
      legendDiv.appendChild(span);
    });
  
    // ----- Resize Automatique (vraiment fiable) -----
    const ro = new ResizeObserver(() => {
      myChart.resize();
    });
    ro.observe(wrapper);
  
    // Sécurité si le layout change ailleurs
    window.addEventListener("resize", () => myChart.resize());
  }
  

  
export function afficherSalaire(formation) {
  let container = document.querySelector(".stat.comparatifs-salaires");

  container.innerHTML = "";
  container.style.minHeight = "350px";

  // wrapper qui va contenir le chart
  const chartDiv = document.createElement("div");
  chartDiv.style.width = "100%";
  chartDiv.style.height = "100%";
  container.appendChild(chartDiv);

  const chart = echarts.init(chartDiv);

  const data = [
      { name: "Salaire median", value: formation.insertion_professionnelle.remun_mediane },
      { name: "Salaire bas", value: formation.insertion_professionnelle.remun_basse },
      { name: "Salaire haut", value: formation.insertion_professionnelle.remun_haute }
  ];

  const colors = ["#7953FF", "#C9BAFF", "#60BAFF"];

  chart.setOption({
      tooltip: {
          trigger: "item",
          formatter: "{b} : {c} €"
      },
      xAxis: {
          type: "category",
          data: data.map(d => d.name),
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false }
      },
      yAxis: {
          type: "value",
          axisLabel: { color: "#6b7280" },
          splitLine: { lineStyle: { color: "#e5e7eb" } }
      },
      series: [
          {
              type: "bar",
              barWidth: "40%",
              data: data.map((d, i) => ({
                  value: d.value,
                  itemStyle: {
                      color: colors[i],
                      borderRadius: [6, 6, 0, 0]
                  }
              })),
              label: {
                  show: true,
                  position: "top",
                  formatter: "{c} €",
                  fontWeight: 600,
                  color: "#111827"
              }
          }
      ],
      flex: { top: 60, bottom: 60, left: 60, right: 40 },
      color: colors
  });

  // LÉGENDE
  const legendDiv = document.createElement("div");
  legendDiv.classList.add("container-stat-tag");
  legendDiv.style.display = "flex";
  legendDiv.style.gap = "12px";
  container.appendChild(legendDiv);

  data.forEach((item, i) => {
      const span = document.createElement("span");
      span.classList.add("stat-tag");
      span.textContent = item.name;
      span.style.setProperty("--tag-color", colors[i]);
      legendDiv.appendChild(span);
  });

  // ⭐ Observer le container pour resize auto et propre
  const ro = new ResizeObserver(() => {
      chart.resize();
  });
  ro.observe(container);

  return chart;
}



export async function afficherCarteSuggestion(points) {

  const iconDefault = L.icon({
    iconUrl: "./images/svg/icone.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });
  
  const iconCurr = L.icon({
    iconUrl: "./images/svg/icone_current.svg", 
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  });
  

  // Sélectionne le container
  const container = document.querySelector('.carte-suggestion');
  container.style.width = container.style.width || '100%';
  container.style.height = container.style.height || '400px';

  // Reset si une carte existait déjà
  container.innerHTML = "";

  // Initialisation de la carte
  const map = L.map(container, {
    zoomControl: true,
    minZoom: 3,
    maxZoom: 15
  });

  // Fond de carte Carto Light
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd'
  }).addTo(map);

  // Groupe de clusters (gère spiderfy automatiquement)
  const markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    maxClusterRadius: 35,
    animateAddingMarkers: true
  });

  // Icône personnalisée
  const customIcon = L.icon({
    iconUrl: "./images/svg/icone.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  // Ajout des points
  points.forEach(p => {
    const marker = L.marker([p.lat, p.lon], {
      icon: p.curr ? iconCurr : iconDefault 
    });

    // Tooltip survol
    marker.bindTooltip(p.name, {
      direction: "top",
      offset: [0, -10],
      opacity: 1
    });

    // Click → ouvre la fiche master
    marker.on("click", () => {
      if (p.url) window.location.href = p.url;
    });

    markers.addLayer(marker);
  });

  map.addLayer(markers);

  // Centrage automatique de la carte
  if (points.length > 1) {
    map.fitBounds(markers.getBounds(), { padding: [40, 40] });
  } else if (points.length === 1) {
    map.setView([points[0].lat, points[0].lon], 12);
  } else {
    map.setView([2.3, 40.8], 6); // défaut France
  }
}


