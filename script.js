document.addEventListener('DOMContentLoaded', function () {
    fetch("https://raw.githubusercontent.com/computablee/Movie-Rankings/main/movies.ssv").then(res => res.text()).then(csvData => {
        populateTableFromCSV(csvData);
        applyRankingColors();
    })
});

function populateTableFromCSV(csv) {
    const lines = csv.trim().split("\n");
    const tbody = document.querySelector("#rankings tbody");

    const sortedLines = lines.sort((a, b) => {
        const ratingA = parseInt(a.split(";")[0]);
        const ratingB = parseInt(b.split(";")[0]);
        return ratingB - ratingA; // For descending order
    });

    sortedLines.forEach(line => {
        const [rating, title, director, comments] = line.split(";");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><span class="rating">${rating}</span><span class="out-of"> /10</span></td>
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
