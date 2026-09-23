const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");
const categoryButtons = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");
const toolCount = document.getElementById("toolCount");

let activeCategory = "all";


function filterTools() {
    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    let visibleCount = 0;

    toolCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const matchesCategory =
            activeCategory === "all" ||
            category === activeCategory;

        const matchesSearch =
            searchTerm === "" ||
            name.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    toolCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "tool" : "tools"}`;

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}


/* Search */

searchInput.addEventListener("input", filterTools);


/* Categories */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        filterTools();
    });

});


/* Prevent placeholder tool links from jumping */

toolCards.forEach(card => {

    card.addEventListener("click", event => {

        if (card.getAttribute("href") === "#") {
            event.preventDefault();

            const toolName =
                card.querySelector("h3").textContent;

            console.log(`${toolName} is coming soon.`);
        }

    });

});


/* Initial state */

filterTools();
