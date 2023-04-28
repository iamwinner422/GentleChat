document.getElementById('submitButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const responseArea = document.getElementById('responseArea');
    let ApiKey = "";
    chrome.storage.sync.get('OpenAiKey', function (object) {
        ApiKey = object.OpenAiKey;
    });
    if (ApiKey !== "" || typeof(ApiKey) !== "undefined") {
        if (inputText !== "") {
            fetch(`https://api.openai.com/v1/engines/davinci/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiKey}`
                },
                body: JSON.stringify({
                    prompt: `Hi ChatGPT! Can you reformulate or resume correctly and simply in the corresponding language this prompt while taking into account the context «${inputText}» ?`,
                    max_tokens: 1000,
                    temperature: 0.5,
                })
            }).then((response) =>{
               console.log(response.json());
            });

        }
    }
    // Traitez le texte d'entrée et affichez la réponse dans responseArea
    responseArea.textContent = `Your gently question: ${inputText}`;
    responseArea.style.display = "block";
});
