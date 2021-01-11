document.getElementById("loan-form").addEventListener("submit", function (e) {
    document.getElementById("results").style.display = "none";

    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults() {
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const salary = document.getElementById("salary");

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");
    const affordLoan = document.getElementById("afford-loan");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly) && salary.value !== "") {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = (monthly * calculatedPayment - principal).toFixed(
            2
        );

        let payment = monthlyPayment.value * 10;

        if (payment < salary.value) {
            affordLoan.value = "Yes";
        } else if (payment * 10 >= salary.value) {
            affordLoan.value = "No";
        }

        console.log(payment);

        document.getElementById("results").style.display = "block";

        document.getElementById("loading").style.display = "none";
    } else {
        showError("Please check your numbers again");
    }
}

function showError(error) {
    document.getElementById("results").style.display = "none";

    document.getElementById("loading").style.display = "none";
    const errorDiv = document.createElement("div");

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector(".alert").remove();
}
