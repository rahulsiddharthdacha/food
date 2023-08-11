document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const menuContainer = document.querySelector(".menu");
    const billElement = document.getElementById("bill");

    const items = [
        { name: "Burger", price: 8.99, image: "burger.jpg" },
        { name: "Pizza", price: 10.99, image: "pizza.jpg" },
        // Add more items here
    ];

    // Dynamically create item cards using Bootstrap
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card">
                <img src="${item.image}" alt="${item.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.price.toFixed(2)}</p>
                    <input type="checkbox" class="item form-check-input" data-name="${item.name}" data-price="${item.price}">
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });

    calculateButton.addEventListener("click", calculateBill);

    function calculateBill() {
        let total = 0;
        const selectedItems = [];

        const selectedCheckboxes = document.querySelectorAll(".item:checked");
        selectedCheckboxes.forEach(checkbox => {
            const itemName = checkbox.getAttribute("data-name");
            const itemPrice = parseFloat(checkbox.getAttribute("data-price"));
            total += itemPrice;
            selectedItems.push(itemName);
        });

        displayBill(total, selectedItems);
    }

    function displayBill(total, selectedItems) {
        const billHTML = `
            <h3 class="mb-3">Total Bill: $${total.toFixed(2)}</h3>
            <h4>Selected Items:</h4>
            <ul>
                ${selectedItems.map(item => `<li>${item}</li>`).join("")}
            </ul>
            <button class="btn btn-success" id="shareBill">Share Bill on WhatsApp</button>
        `;

        billElement.innerHTML = billHTML;

        const shareButton = document.getElementById("shareBill");
        shareButton.addEventListener("click", shareBillOnWhatsApp);
    }

    function shareBillOnWhatsApp() {
        const billText = encodeURIComponent(billElement.textContent);
        const whatsappLink = `https://api.whatsapp.com/send?text=${billText}`;
        window.open(whatsappLink, "_blank");
    }
});
