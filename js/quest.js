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
        button.disabled = true;
        input.disabled = true;
        return;
    }

    label.textContent = words[currentIndex].english;
    input.value = "";
});
// Button de atualizar pagina
btnRefresh.addEventListener("click", () => {
    window.location.reload();
});