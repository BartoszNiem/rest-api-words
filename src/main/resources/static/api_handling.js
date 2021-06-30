const baseUrl = "http://localhost:8080/wordapi";

/**
 * Dodawanie słów do kolekcji
 */
function addWordClick() {
    let word = document.getElementById("addWordField").value;
    if (!word) {
        alert("Podaj słowo do dodania");
    } else {
        let url = baseUrl + "/addword" ;

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Dodane słowo: " + word);
                document.getElementById("addWordField").value = "";
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(word);
    }
}

/**
 * Usuwanie słów z kolekcji
 */
function deleteWordClick() {
    let word = document.getElementById("deleteWordField").value;

    if (!word) {
        alert("Podaj słowo do usunięcia");
    } else {
        let url = baseUrl + "/deleteword";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Słowo \"" + word + "\" usunięte z kolekcji");
                document.getElementById("deleteWordField").value = "";
            }
        };
        xhttp.open("DELETE", url, true);
        xhttp.send(word);
    }
}

/**
 * Sprawdzenie liczby wystąpień danego słowa w kolekcji
 */
function checkWordClick() {
    let word = document.getElementById("checkWordCountField").value;

    if (!word) {
        alert("Podaj słowo do sprawdzenia");
    } else {
        let url = baseUrl + "/getnumofappearance/" + word;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Słowo powtórzone w kolekcji " + this.responseText + " razy.");
                document.getElementById("checkWordCountField").value = "";
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}

/**
 * Pobranie wszystkich unikalnych słów z kolekcji
 */
function getUniqueWordsClick() {
    let url = baseUrl + "/getuniquewords";

    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", uniqueWordResponseListener);
    xhttp.open("GET", url, true);
    xhttp.send();
}

function uniqueWordResponseListener() {
    let parsedResponse = JSON.parse(this.responseText);

    let displayedText = "";
    for (const element of parsedResponse) {
        displayedText += element + "\n";
    }
    document.getElementById("uniqueWordListText").value = displayedText;
}