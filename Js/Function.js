const file = "component/postit.json";

const searchBar = document.getElementById("Search-word");
let Post_itCard =[]
const list =document.querySelector('#results');
function displayPOst_it(items) {
 Post_itCard.innerHTML =`
 <div class='post-it2' contenteditable class="Grand">
            <h1 class="Titre-post">${Post_itCard.title}</h1>
            <ul>
                <li>${Post_itCard.title}</li>
                <li>${Post_itCard.title}</li>
                <li>${Post_itCard.title}</li>
            </ul>

        </div>';`
 items.forEach(item => {
const li =document.createElement('li');
 li.textContent = item.name;
 list.appendChild(li);
 });
}



// Fonction pour charger les post-its à partir du fichier JSON
fetch(file)
  .then(postit => postit.json())
  .then((postit) => {
    Post_itCard = postit; // On stocke les données des technologies
    displayPOst_it(Post_itCard); // Afficher toutes les technologies au début
  
  
  })
//On créer une valeur pour la barre de progression
let listeLI = 0;
//on va chercher la barre de progression
const progressbar = document.getElementById("post-it2");


//On doit ensuite récuperer les lignes "li" et ajouter la classe ".done" ou la retirer si elle était activé.
const postit = document.querySelectorAll("li");


// faire une fonction de mise à jour
function updateProgress() {
  progressbar.value = listeLI;
}

//On doit écouter si le texte est cliqué
postit.forEach((li) => {
  li.addEventListener("click", () => {

    // Si on click on ajoute la classe done
    if (!li.classList.contains("done")) {
      li.classList.add("done");
      listeLI += 10;
    } 
    // Si on click une seconde fois on retire la classe
    else {
      li.classList.remove("done");
      listeLI -= 10;
    }

    updateProgress();
    console.log(listeLI);
  });
});
//on va chercher le grand Post-it
const Post_it = document.querySelector(".post-it2");
//on prépare une liste des différents couleurs disponibles
const othersCouleurs = []

//On va chercher les différents bouttons
const couleurPost = document.querySelectorAll(".ButtonColor");
//Pour chacun on va ajouter leurs couleurs à la liste
couleurPost.forEach((button) => {
  othersCouleurs.push(button.dataset.color)

  //Puis on fait une constante qui possède la couleurs du boutons selectionné
  const couleurs = (button.dataset.color)
  //Ensuite on écoute quel bouton est utilisé
  //Enfin, au click, on supprime toutes les autres classes de couleurs et on ajoute la nouvelle
  button.addEventListener("click", function (event) {
    event.preventDefault();
    othersCouleurs.forEach(Element => {
      Post_it.classList.remove(Element)
    });

    console.log(couleurs);
    console.log(othersCouleurs);

    Post_it.classList.add(couleurs);
  })

})

