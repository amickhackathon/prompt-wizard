const base_url = 'http://127.0.0.1:5000/';

const generatePromptButton = document.getElementById("generate-prompt-button");
const promptContentContainer = document.getElementById("prompt-content-container");
const viewPromptHistoryButton = document.getElementById("view-prompt-history");

const generateConvoButton = document.getElementById("generate-convo-button");
const convoContentContainer = document.getElementById("convo-content-container");
const viewPromptHistoryContainer = document.getElementById("prompt-history-container");

generatePromptButton.addEventListener("click", handlePromptSubmit);
generateConvoButton.addEventListener("click", handleConvoSubmit);
viewPromptHistoryButton.addEventListener("click", handleViewHistory);

function getHome() {
    axios.get(base_url)
    .then(function (response) {
        contentContainer.innerHTML += '<p>' + JSON.stringify(response.data) + '</p>';

        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function postKeywords(formData) {
    axios.post(base_url + 'generate-prompt', formData)
    .then(function (response) {
        data = JSON.stringify(response.data);

        const textArea = document.getElementById("convo");

        textArea.innerText = data

        if (textArea.innerText.trim() !== "") {
            // If there is content, show the second container
            document.getElementById('convo-section').style.display = 'block';
        } else {
            // If there's no content, hide the second container
            document.getElementById('convo-section').style.display = 'none';
        }

        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function postPrompt(formData) {

    document.getElementById('loadingSpinner').style.display = 'block';

    axios.post(base_url + 'generate-convo', formData)
    .then(function (response) {
        convoContentContainer.innerHTML += '<p>' + JSON.stringify(response.data) + '</p>';

        if (convoContentContainer.innerText.trim() !== "") {
            // If there is content, show the second container
            document.getElementById('convo-response').style.display = 'block';
        } else {
            // If there's no content, hide the second container
            document.getElementById('convo-response').style.display = 'none';
        }

        document.getElementById('loadingSpinner').style.display = 'none';

        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        document.getElementById('loadingSpinner').style.display = 'none';
    })
    .finally(function () {

    });
};

function getPromptHistory() {

    axios.get(base_url + 'prompt-history')
    .then(function (response) {
        console.log(response)
        document.getElementById('convo-response').style.display = 'none';
        viewPromptHistoryContainer.innerText = response.data

        if (viewPromptHistoryContainer.innerText.trim() !== "") {
            // If there is content, show the second container
            viewPromptHistoryContainer.style.display = 'block';
        } else {
            // If there's no content, hide the second container
            viewPromptHistoryContainer.style.display = 'none';
        }
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {

    });
};


function handlePromptSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(document.getElementById('prompt-form'));

    postKeywords(formData);
}

function handleConvoSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(document.getElementById('convo-form'));

    postPrompt(formData);
}

function handleViewHistory(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    getPromptHistory();
}
