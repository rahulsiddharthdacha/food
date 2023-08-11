document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const mainCourseContainer = document.getElementById("main-course");
    const dessertsContainer = document.getElementById("desserts");
    const billElement = document.getElementById("bill");
    const billImageElement = document.getElementById("billImage");
    // ... (previous JavaScript content) ...
    // ... (previous code) ...

    const eventForm = document.getElementById("event-form");

    eventForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const location = document.getElementById("location").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const people = parseInt(document.getElementById("people").value, 10);

        const total = calculateBill();
        displayBill(total);
        generateBillImage(total);

        const shareButton = document.getElementById("shareBill");
        shareButton.addEventListener("click", function () {
            shareBillOnWhatsApp(location, date, time, people, total);
        });
    });

    // ... (rest of the JavaScript content) ...


    const mainCourseItems = [
        { name: "Burger", price: 8.99, image: "burger.jpg" },
        { name: "Pizza", price: 10.99, image: "pizza.jpg" },
        // Add more main course items here
    ];

    const dessertItems = [
        { name: "Ice Cream", price: 4.99, image: "ice-cream.jpg" },
        { name: "Cheesecake", price: 6.99, image: "cheesecake.jpg" },
        // Add more dessert items here
    ];

    // Dynamically create item cards using Bootstrap
    function createItemCard(item, container) {
        const card = document.createElement("div");
        card.className = "card mb-4";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">$${item.price.toFixed(2)}</p>
                <label class="form-check-label">
                    <input type="checkbox" class="item form-check-input" data-name="${item.name}" data-price="${item.price}">
                    Select
                </label>
            </div>
        `;
        container.appendChild(card);
    }

    mainCourseItems.forEach(item => createItemCard(item, mainCourseContainer));
    dessertItems.forEach(item => createItemCard(item, dessertsContainer));

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
        generateBillImage(total, selectedItems);
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

    function generateBillImage(total, selectedItems) {
        const data = {
            labels: selectedItems,
            datasets: [{
                data: selectedItems.map(_ => 1),
                backgroundColor: selectedItems.map(_ => getRandomColor()),
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Selected Items'
                    }
                }
            }
        };

        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;

        const ctx = canvas.getContext('2d');
        new Chart(ctx, config);

        billImageElement.innerHTML = '';
        billImageElement.appendChild(canvas);
    }

    function shareBillOnWhatsApp() {
        const canvas = billImageElement.querySelector('canvas');
        const dataUrl = canvas.toDataURL('image/png');

        const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out my food bill!")}&data=${dataUrl}`;
        window.open(whatsappLink, "_blank");
    }

    function getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
});
