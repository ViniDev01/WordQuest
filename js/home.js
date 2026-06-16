const btnAdd = document.getElementById("btn-add");
const modelAdd = document.getElementById("model-add");
const form = document.getElementById("model-filho");
const title = document.getElementById("title");
const link = document.getElementById("link");

// Abrir model
btnAdd.onclick = () => {
    modelAdd.style.display = "flex";
}
// Fechar model
modelAdd.onclick = () => {
    modelAdd.style.display = "none";
}
// Bloquear model de fechar
form.onclick = (event) => {
    event.stopPropagation();
}

// Pegar o value do input usando o form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const english = e.target.english.value;
    const portugues = e.target.portugues.value;
    addWord(english, portugues);
    window.location.reload();
    modelAdd.style.display = "none";
});
// Função para adicionar palavras
function addWord(english, portugues) {
    const words = JSON.parse(localStorage.getItem("@words-quests") || "[]");
    words.push({
        english,
        portugues
    });
    localStorage.setItem("@words-quests", JSON.stringify(words))
}
// Função para buscar as palavras
function getWords() {
    const words = JSON.parse(localStorage.getItem("@words-quests") || "[]");
    return words;
}
const quantityWords = getWords().length;
if(quantityWords > 0) {
    title.textContent = `Você tem ${quantityWords} ${quantityWords === 1 ? "palavra" : "palavras"} para aprender`;
}else if(quantityWords <= 0) {
    link.addEventListener("click", (e) => {
        e.preventDefault();
    });
    link.style.pointerEvents = "none";
    link.style.opacity = "0.5";
}