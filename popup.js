document.getElementById('submitButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const responseArea = document.getElementById('responseArea');

    // Traitez le texte d'entrée et affichez la réponse dans responseArea
    responseArea.textContent = `Your gently question: ${inputText}`;
    responseArea.style.display = "block";
});
