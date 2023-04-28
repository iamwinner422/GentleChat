document.getElementById('submitButton').addEventListener('click', async () => {
    const module = await import("./api_key.json", {
        assert: {type: "json"},
    });
    const inputText = document.getElementById('inputText').value;
    const responseArea = document.getElementById('responseArea');
    let answer = "";
    let ApiKey = "";

    chrome.storage.sync.get('OpenAiKey', function (object) {
        ApiKey = object.OpenAiKey;
    });
    if (ApiKey !== "" || typeof (ApiKey) !== "undefined") {
        ApiKey = module.default.OPENAI_API_KEY
        console.log();
        if (inputText !== "") {
            const response = await fetch(`https://api.openai.com/v1/engines/davinci/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ApiKey}`
                },
                body: JSON.stringify({
                    prompt: `Hi ChatGPT! Can you reformulate correctly and simply in the corresponding language this prompt while taking into account the context «${inputText}» ? I only want a suggested answer.`,
                    'temperature': 0.7,
                    'max_tokens': 1024,
                    'top_p': 1,
                    'n': 1,
                    'frequency_penalty': 0,
                    'presence_penalty': 1,
                })
            });
            const data = await response.json();
            const completions = data['choices'][0]['text']
            //answer = completions.split("«")[1].split("»")[0]
            console.log(data, "data");
            console.log(completions, "completions")
            console.log(answer, "answer")
                /*.then((response) => {
                console.log(response.json());
            });*/

        }
    }
    // Traitez le texte d'entrée et affichez la réponse dans responseArea
    responseArea.textContent = `Your gently question: ${answer}`;
    responseArea.style.display = "block";
});
