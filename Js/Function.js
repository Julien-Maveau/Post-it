//On doit écouter si le texte est cliqué
//On doit ensuite récuperer les lignes "li" et ajouter la classe ".done" ou la retirer si elle était activé.
const postit = document.querySelectorAll("li");
postit.forEach((li) => {
  li.addEventListener("click", () => {
    li.classList.toggle("done")
  })
})
//on va chercher le grand Post-it
const Post_it = document.querySelector(".post-it2");
//on prépare une liste des différents couleurs disponibles
const othersCouleurs = []

//On va chercher les différents bouttons
const CouleurPost = document.querySelectorAll(".ButtonColor");
//Pour chacun on va ajouter leurs couleurs à la liste
CouleurPost.forEach((button) => {
  othersCouleurs.push(button.dataset.color)

  //Puis on fait une constante qui possède la couleurs du boutons selectionné
  const couleurs = (button.dataset.color)
  //Ensuite on écoute quel bouton est utilisé
  //Enfin, au click, on supprime toutes les autres classes de couleurs et on ajoute la nouvelle
  button.addEventListener(("click"), function (event) {
    event.preventDefault();
    othersCouleurs.forEach(Element => {
      Post_it.classList.remove(Element)
    });

    console.log(couleurs);
    console.log(othersCouleurs);

    Post_it.classList.add(couleurs);
  })

})

const listeLI = []

const progressbar = document.querySelector("progress");
li.forEach(Element(".done") , {

})