const main = document.querySelector("main")
const section = document.querySelector(".section-quest");
const label = document.querySelector(".label-quest");
const input = document.getElementById("input-palavra");
const button = document.querySelector(".btn-next");
const btnRefresh = document.getElementById("refresh");

function getWords() {
    const words = JSON.parse(localStorage.getItem("@words-quests") || "[]");
    return words;
}
const words = getWords();

let currentIndex = 0;
let allCorrectAnswer = [];
let allTheWrongAnswers = [];
label.textContent = words[currentIndex].english;

// Função para o botão funcionar com o Enter
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        button.click();
    }
})
button.addEventListener("click", () => {
    const answer = input.value.trim().toLowerCase();
    const correctAnswer = words[currentIndex].portugues.toLowerCase();
    const wrongAnswers = words[currentIndex].english.toLowerCase();

    if(answer === correctAnswer) {
        allCorrectAnswer.push({
            wrongAnswers,
            answer,
            correctAnswer
        });
    }else {
        allTheWrongAnswers.push({
            wrongAnswers,
            answer,
            correctAnswer,
        });
    }

    currentIndex++;

    if(currentIndex >= words.length) {
        alert("Fim do jogo");
        section.style.display = "none";
        const sectionResumo = document.createElement("SECTION");
        sectionResumo.classList.add("resumo-quests");
        sectionResumo.innerHTML = `
            <h1 class="title-resumo">Confira quais você <span>acertou</span> ou <span>erro</span></h1>
            ${allCorrectAnswer.map(item => `
                <div class="box success">
                    <div class="box-header">
                        <span class="status">✓ Correta</span>
                    </div>

                    <div class="question">
                        <strong>Pergunta</strong>
                        <p>${item.wrongAnswers}</p>
                    </div>

                    <div class="answer">
                        <strong>Sua resposta</strong>
                        <p>${item.answer}</p>
                    </div>
                </div>
            `).join("")}

            ${allTheWrongAnswers.map(item => `
                <div class="box error">
                    <div class="box-header">
                        <span class="status">✕ Incorreta</span>
                    </div>

                    <div class="question">
                        <strong>Pergunta</strong>
                        <p>${item.wrongAnswers}</p>
                    </div>

                    <div class="answer">
                        <strong>Sua resposta</strong>
                        <p>${item.answer}</p>
                    </div>

                    <div class="correct-answer">
                        <strong>Resposta correta</strong>
                        <p>${item.correctAnswer}</p>
                    </div>
                </div>
            `).join("")}
            
        `
        main.appendChild(sectionResumo);
        return;
    }

    label.textContent = words[currentIndex].english;
    input.value = "";
});
// Button de atualizar pagina
btnRefresh.addEventListener("click", () => {
    window.location.reload();
});