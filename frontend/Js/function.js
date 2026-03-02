const file = "../../postit.json";
const list = document.querySelector('#results');
const API_URL ="http://127.0.0.1:5000/api/techs";
fetch(file)
  .then(res => res.json())
  .then(data => {
    displayPostIt(data.hello); 
  });
// Fonction pour charger les post-its
const displayPostIt=(postIts)=>{



  list.innerHTML = "";

  postIts.forEach((postIt, postItIndex) => {

   
    if (!Array.isArray(postIt.lines)) {
      console.error("lines manquant pour :", postIt);
      return;
    }

    const linesHTML = postIt.lines
  .map((line, lineIndex) =>
    `<li
      data-postit="${postItIndex}"
      data-line="${lineIndex}">
      ${line}
    </li>`
  )
  .join("");

    list.innerHTML += `
      <div class="post-it2" style="background:${postIt.Color}">
        <h1 class="Titre-post">${postIt.Title}</h1>
        <ul>
          ${linesHTML}
        </ul>
      </div>
    `;
  });
}
// Valeur de progression
let progressValue = 0;

// Barre de progression
const progressbar = document.getElementById("progressbar");

// Clic simple = cocher / décocher
list.addEventListener("click", (e) => {

  if (e.target.tagName === "LI") {
    const li = e.target;

    // Toggle visuel
    li.classList.toggle("done");

    // Mise à jour de la progression
    if (li.classList.contains("done")) {
      progressValue += 10;
    } else {
      progressValue -= 10;
    }

    // Sécurité (0–100)
    progressValue = Math.max(0, Math.min(100, progressValue));

    progressbar.value = progressValue;
  }
});

// Double-clic = édition
list.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "LI") {
    const li = e.target;

    li.setAttribute("contenteditable", "true");
    li.focus();
  }
});

// Quand on quitte l'édition
list.addEventListener("blur", (e) => {
  if (e.target.tagName === "LI") {
    e.target.removeAttribute("contenteditable");
  }
}, true);
//On créer une valeur pour la barre de progression
let listLI = 0;



// Fonction qui met à jour la barre
const updateProgress=()=> {
  progressbar.value = listLI;
}
list.addEventListener("blur", (e) => {

  if (e.target.tagName === "LI") {

    // On récupère les infos depuis les data-attributes
    const postItIndex = e.target.dataset.postit;
    const lineIndex = e.target.dataset.line;
    const newText = e.target.textContent.trim();

    // Envoi au serveur
    fetch("../../postit.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postItIndex,
        lineIndex,
        newText
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Ligne sauvegardée :", data);
    });
  }

}, true);

    // Mise à jour visuelle
    updateProgress();

    // Debug
    console.log("Progression :", listLI);

// Liste des couleurs disponibles
const othersCouleurs = [];

// On récupère tous les boutons de couleur
const couleurPost = document.querySelectorAll(".ButtonColor");

// Pour chaque bouton de couleur
couleurPost.forEach((button) => {

  // On récupère la couleur associée au bouton
  const couleur = button.dataset.color;

  // On stocke la couleur dans la liste globale
  othersCouleurs.push(couleur);

  // On ajoute la classe couleur au bouton (visuel)
  button.classList.add(couleur);

  // On écoute le clic sur ce bouton
  button.addEventListener("click", function (event) {

    // Empêche le submit du formulaire
    event.preventDefault();

    // On récupère le post-it affiché
    const postIt = document.querySelector(".post-it2");

    // Sécurité : si aucun post-it, on arrête
    if (!postIt) return;

    // On retire toutes les couleurs existantes
    othersCouleurs.forEach(color => {
      postIt.classList.remove(color);
    });

    // On applique la nouvelle couleur
    postIt.classList.add(couleur);

    // Debug
    console.log("Couleur appliquée :", couleur);
  });
});
//vivian
const availiable = [
  "auto", "default", "none", "context-menu", "help", "pointer", "progress",
  "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy",
  "move", "no-drop", "not-allowed", "grab", "grabbing", "all-scroll",
  "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize",
  "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize",
  "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"
];
const all = document.querySelectorAll("div");
const len = availiable.length;

all.forEach(div => {
  div.addEventListener("mouseenter", () => {
    const selected = availiable[Math.floor(Math.random() * len)];
    div.style.cursor = selected;
  });
});
