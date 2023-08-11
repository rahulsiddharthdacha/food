document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const items = document.querySelectorAll(".item");
    const billElement = document.getElementById("bill");

    calculateButton.addEventListener("click", calculateBill);

    function calculateBill() {
        let total = 0;

        items.forEach(item => {
            if (item.checked) {
                const price = parseFloat(item.getAttribute("data-price"));
                total += price;
            }
        });

        billElement.innerHTML = `Total Bill: $${total.toFixed(2)}`;
    }
});
