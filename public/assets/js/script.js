const itemContent = document.getElementById("item-content");
const submitEl = document.getElementById("submit");
const filesList = document.getElementById("files-list");
const fileNameContent = document.getElementById("filename-content");

var textArea = "";
var curFileNameId;

const addItem = (id) => {
    if (itemContent.value.trim() === "") {
        return
    }
    const body = {
        id: id,
        name: itemContent.value
    }
    fetch("/api/filename", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
        .then(red => {
            itemContent.value = "";
            renderList(res)
        })
}
const toDeleteItem = (id) => {
    const body = {
        id: id
    }
    fetch("/api/filename", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
}

const toUpdateItem = (id) => {
    const body = {
        id: id,
        name: textArea.value
    }
    fetch("/api/filename", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json()
        )
        .then(res => {
            renderList(res)
        })
}
const renderList = (res) => {
    filesList.innerHTML = "";
    filesList.id = "files-list"
    for (const filename of res.data) {
        liEl = document.createElement("li");
        liEl.textContent = filename.name.slice(0, 20) + "...";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        liEl.appendChild(deleteButton);

        //event listener to display content on click in text area
        liEl.addEventlistener("click", () => {
            curFileNameId = filename.id;

            //create box with content
            textArea = document.createElement("textarea");
            textArea.value = filename.name;
            fileNameContent.innerHTML = ""

            //button to save
            const saveButton = document.createElement("button");
            saveButton.textContent = "SAVE";
            saveButton.addEventListener("click", () => {
                toUpdateItem(filename.id);
            })
            fileNameContent.appendChild(textArea);
            fileNameContent.appendChild(saveButton);
        })

        deleteButton.addEventListener("click", () => {
            toDeleteItem(filename.id)
        })
        filesList.appendChild(liEL);
    }
}

const init = () => {
    submitEl.addEventListener("click", () => {
        addItem();
    })

    fetch("/api/filename")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            renderList(res)
        })
}

init();

