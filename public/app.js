const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");
const categoryButtons = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");
const toolCount = document.getElementById("toolCount");

let activeCategory = "all";

// Build a searchable string per card: keywords + title + description
const searchIndex = new Map();
toolCards.forEach(card => {
    const title = card.querySelector("h3")?.textContent ?? "";
    const desc = card.querySelector("p")?.textContent ?? "";
    searchIndex.set(card, `${card.dataset.name} ${title} ${desc}`.toLowerCase());
});

function filterTools() {
    const terms = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    toolCards.forEach(card => {
        const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
        const text = searchIndex.get(card);
        const matchesSearch = terms.every(t => text.includes(t));
        const show = matchesCategory && matchesSearch;
        card.style.display = show ? "flex" : "none";
        if (show) visibleCount++;
    });

    toolCount.textContent = `${visibleCount} ${visibleCount === 1 ? "tool" : "tools"}`;
    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterTools);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        activeCategory = button.dataset.category;
        filterTools();
    });
});

// Keyboard shortcuts: "/" or Ctrl/Cmd+K focuses search, Esc clears it
document.addEventListener("keydown", event => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((event.key === "/" && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
    } else if (event.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        filterTools();
        searchInput.blur();
    }
});

filterTools();
