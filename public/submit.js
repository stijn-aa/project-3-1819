var socket = io();


function TagOnEnter(element) {
    if (event.key === 'Enter') {
        textTagToAddTag(createSugTag(element.value))
        element.value = ""
    }
}

function sugTagOnSpace(element) {
    if (event.key === 'Enter') {
        removeTags();

        handleEnterdWords(element.value)
        clickListener(element)
    }
}

function Submit(){
  const tags = document.querySelectorAll(".tag.added")
  const titel = document.querySelector("#titel").value
  const msg = document.querySelector("#markdown").value
  
  socket.emit('uploadLog', titel, msg, tags)

}


function clickListener() {

    document.querySelector("#markdown").addEventListener('click', event => {
        const element = event.path[0].value
        removeTags();
        handleEnterdWords(element)
    })
}

function createSugTag(value) {
    const tagAera = document.querySelector("input.add-tag")
    tagAera.insertAdjacentHTML('beforebegin', `<span class="tag sug new" role="listitem"><span>${value}</span><span class="delete-tag" role="button"></span></span>`);
    const newSugTag = document.querySelector(".new")
    newSugTag.lastChild.addEventListener("click", deleteTagListener)
    return newSugTag
}

function sugTagToAddTag(element) { //clicked on sug > create tag

    const span = element.path[1]

    span.classList.remove("sug");
    span.classList.add("added")
    span.firstChild.removeEventListener("click", sugTagToAddTag)
    span.firstChild.addEventListener('click', function (event) {
        removeTags();
        checkWordsOnClick(event);
    })
}

function removeTags() {

    if (document.querySelectorAll(".sug").length !== 0) {
        const tags = document.querySelectorAll(".sug")
        console.log(tags)
        tags.forEach(element => {
            console.log(element)
            element.parentNode.removeChild(element)
        })
    }

}

function textTagToAddTag(span) {
    span.classList.remove("new")
    span.classList.remove("sug");
    span.classList.add("added")
    span.firstChild.addEventListener('click', function (event) {
        removeTags();
        checkWordsOnClick(event);
    })

}


function deleteTagListener(element) {
    element.path[1].parentNode.removeChild(element.path[1])
}

function handleWords(words) { //when clicked on tag or entered log
    const wordsArray = words.split(' ')
    wordsArray.forEach(element => {
        checkWordsOnClick(element)
    });
}

function handleEnterdWords(words) { //when clicked on tag or entered log
    const wordsArray = words.split(' ')
    wordsArray.forEach(element => {
        checkWordsOnEnter(element)
    });
}


function checkWordsOnClick(element) {
    if (element.path) {
        word = element.path[1].firstChild.innerText
        handleWords(getSubtags(word).join(" "))
        return
    } else {
        word = element
    }
    generateSugTags(word)
}

function checkWordsOnEnter(element) {
    if (getTags(element)) {
        word = getTags(element)
        generateSugTags(word)
    } else {
        return
    }

}

function generateSugTags(word) {
    var tagSug = createSugTag(word) //create sug tags 
    tagSug.classList.remove("new");
    tagSug.firstChild.addEventListener("click", sugTagToAddTag)
}

function getSubtags(word) {
    return tagList[word]; //Als taglist een property heeft gelijk aan text, zoals "fiets", return dan de value ervan (de subtags)
}

function getTags(word) {
    if (tagList[word] !== undefined) {
        return word
    } else {
        console.log("woord", word, "niet in de lijst")
    }
}

const tagList = {
    fiets: [
        "stuur",
        "zadel",
        "banden"
    ],
    auto: [
        "benzine",
        "motor",
        "kofferbak",
        "knipperlicht"
    ],
    
};