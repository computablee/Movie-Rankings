document.addEventListener('DOMContentLoaded', function () {
    fetch("./movies.ssv").then(res => {
        populateTableFromCSV(res.text);
        applyRankingColors();
    })
});

function populateTableFromCSV(csv) {
    const lines = csv.trim().split("\n");
    const tbody = document.querySelector("#rankings tbody");

    lines.forEach(line => {
        const [rating, title, director, comments] = line.split(";");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><span class="rating">${rating}</span><span class="out-of">/10</span></td>
        <td>${title}</td>
        <td>${director}</td>
        <td>${comments}</td>
        `;

        tbody.appendChild(row);
    });
}

function applyRankingColors() {
    const rankings = document.querySelectorAll("#rankings tbody tr td:first-child .rating");

    rankings.forEach(rank => {
        let value = parseInt(rank.textContent);

        if (value >= 9) {
            rank.parentElement.classList.add("blue-rating");
        } else if (value >= 7) {
            rank.parentElement.classList.add("green-rating");
        } else if (value >= 4) {
            rank.parentElement.classList.add("yellow-rating");
        } else {
            rank.parentElement.classList.add("red-rating");
        }
    });
}
