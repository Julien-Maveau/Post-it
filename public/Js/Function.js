const file = "../../postit.json";
const list = document.querySelector('#results');

fetch(file)
.then(res => res.json())
.then(data => {
  displayPostIt(data);
});

// Fonction pour charger les post-its à partir du fichier JSON
function displayPostIt(postIts) {
  list.innerHTML = "";

  postIts.forEach(postIt => {

    const linesHTML = postIt.lines
      .map(line => `<li contenteditable>${line}</li>`)
      .join("");

    list.innerHTML += `
      <form class="post-it2" action="post-it.html" method="post" >
      <div id="background">
        <h1 class="Titre-post">${postIt.Title}</h1>
        <ul>
          ${linesHTML}
          <input type="text" name="name" id="name">
        <input type="submit" name="" id="">
        </ul>
        </div>
      </form>
    `;
  });
}



//On créer une valeur pour la barre de progression
let listeLI = 0;
//on va chercher la barre de progression
const progressbar = document.getElementById("post-it2");


//On doit ensuite récuperer les lignes "li" et ajouter la classe ".done" ou la retirer si elle était activé.
const postit = document.querySelectorAll("li");


// faire une fonction de mise à jour
function updateProgress() {
  progressbar.value = listLI;
}

let listLI = 0;

//On doit écouter si le texte est cliqué
list.addEventListener("click", (e) => {

  if (e.target.tagName === "LI") {
    const li = e.target;
    // Si on click on ajoute la classe done
    if (!li.classList.contains("done")) {
      li.classList.add("done");
      listLI += 10;
    } 
    // Si on click une seconde fois on retire la classe
    else {
      li.classList.remove("done");
      listLI -= 10;
    }

    updateProgress();
    console.log(listLI);
  }
});
//on va chercher le grand Post-it
//on prépare une liste des différents couleurs disponibles
const othersCouleurs = []
//On va chercher les différents bouttons
const couleurPost = document.querySelectorAll(".ButtonColor");
//Pour chacun on va ajouter leurs couleurs à la liste
couleurPost.forEach((button) => {
  othersCouleurs.push(button.dataset.color)
  button.classList.add(button.dataset.color)
  console.log(othersCouleurs)
  //Puis on fait une constante qui possède la couleurs du boutons selectionné
  const couleurs = (button.dataset.color)
  
  //Ensuite on écoute quel bouton est utilisé
  //Enfin, au click, on supprime toutes les autres classes de couleurs et on ajoute la nouvelle
  button.addEventListener("click", function (event) {
    event.preventDefault();
    let background = list.querySelector("form")
    background.classList.add(couleurs);
    console.log(couleurs);
    console.log(othersCouleurs);
    othersCouleurs.forEach(Elements => {
      background.classList.remove(Elements)
    });

    console.log(couleurs);
    console.log(othersCouleurs);

    background.classList.add(couleurs);
  })

})

// On récupère le form
const form = document.querySelectorAll("form");
// On écoute le submit du form
form.addEventListener("submit", (event) => {
  event.preventDefault();
   // On récupère ce que le user à écrit
  const inputValue = document.querySelector("#name").value;
  // On envoie la donnée dans le fichier json
  fetch("component/postit.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: inputValue })
  })

});
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
