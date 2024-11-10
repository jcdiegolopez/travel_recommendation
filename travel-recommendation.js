async function fetchApi() {
    const url = "api.json";
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

let resultcontainer = document.getElementById("resultcontainer");
let searchButton = document.querySelector(".btn-search");
let clearButton = document.querySelector(".btn-clear");

function renderReco(data) {
    resultcontainer.innerHTML = "";
    resultcontainer.style.display = "block";
    if (typeof data === "string") {
        resultcontainer.innerHTML = "Not found";
        return;
    }

    

    data.forEach((item) => {
        let card = document.createElement("div");
        card.className = "card";
        card.style.padding = "10px";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: auto; border-radius: 5px;">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

    
        resultcontainer.appendChild(card);
        resultcontainer.appendChild(document.createElement("hr"));
    });
}


clearButton.addEventListener("click", () => {
    resultcontainer.style.display = "none";
    resultcontainer.innerHTML = ""; 
});


searchButton.addEventListener("click", async () => {
    let query = document.getElementById("query").value;
    let data = await fetchApi();
    
    if (!data) {
        console.error("No data returned from API");
        return;
    }

    
    if (query.toLowerCase().includes("beach")) {
        renderReco(data.beaches);
    }
    
    else if (query.toLowerCase().includes("country")) {
        renderReco(data.countries.flatMap(country => country.cities)); 
    }
    
    else if (query.toLowerCase().includes("temple")) {
        renderReco(data.temples);
    }else{
        renderReco('none');
    }
});
