const btnAdd = document.getElementById("btn-add");
const btnModel = document.getElementById("btn-remove");
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
// if/else para bloquear o button de inicia se estiver zero palavra
function updateQuantityWords() {
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
}

updateQuantityWords();

// Função para remover palavras
let list = getWords();
btnModel.addEventListener("click", () => {
    const div = document.createElement("DIV");
    div.classList.add("model-remove")
    div.innerHTML = `
        <div class="box-model">
            <h1>Remover palavras</h1>
            <button class="btn-close">X</button>
            ${list.length > 0 ? (
                `<ul>
                    ${list.map((item, index) => `
                        <div class="line-model" >
                            <li>${item.english}</li>
                            <li>${item.portugues}</li>
                            <button class="btn-delete" data-index="${index}">X</button>
                        </div>`).join("")}
                </ul>`
            ) : (
                `<p>Nenhuma palavra adicionada</p>`
            )}
        </div>
    `;

    div.addEventListener("click", (e) => {
        if(e.target === div) {
            div.remove();
        }

        if(e.target.classList.contains("btn-delete")) {
            const index = Number(e.target.dataset.index);
            list = list.filter((_, i) => i !== index);

            localStorage.setItem("@words-quests", JSON.stringify(list));

            e.target.closest(".line-model").remove();
            updateQuantityWords();
        }
    });

    div.querySelector(".btn-close").addEventListener("click", () => div.remove());
    document.body.appendChild(div);
    
});

