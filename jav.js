const API_KEY = "5a3ef3ee";

async function searchMovie() {

    const movieName =
        document.getElementById("movieInput").value.trim();

    const moviesDiv = document.getElementById("movies");

    // empty search protection
    if (!movieName) {
        moviesDiv.innerHTML = "<p>Enter a movie name</p>";
        return;
    }

    moviesDiv.innerHTML = "<p>Loading...</p>";

    try {

        const url =
        `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // debugging

        moviesDiv.innerHTML = "";

        // ✅ Correct OMDb response handling
        if (data.Response === "True") {

            data.Search.forEach(movie => {

                const poster =
                    movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image";

                moviesDiv.innerHTML += `
                    <div class="card">
                        <img src="${poster}" alt="${movie.Title}">
                        <div class="card-content">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                    </div>
                `;
            });

        } else {
            moviesDiv.innerHTML = `<p>${data.Error}</p>`;
        }

    } catch (error) {

        console.error(error);
        moviesDiv.innerHTML =
            "<p>Network error. Try again.</p>";
    }
}


// 🔥 ENTER key search support
document
.getElementById("movieInput")
.addEventListener("keypress", function(e){
    if(e.key === "Enter") searchMovie();
});