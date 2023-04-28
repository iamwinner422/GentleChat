const saveButton = document.getElementById('saveButton');
const customText = document.getElementById('customText');

saveButton.addEventListener('click', function() {
    const text = customText.value;
    chrome.storage.sync.set({ customText: text }, function() {
        alert('Options enregistrées.');
    });
});
