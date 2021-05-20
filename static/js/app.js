console.log("App Ready");

d3.select("#alertOutcome").style("display", "none");

d3.select("#btn").on("click", (event) => doCheckCustomer(event));

function doCheckCustomer(event) {
    d3.event.preventDefault();

    console.log("Checking Customer");

    let cust_age = d3.select("#validationDefault01").node().value;
    let gender = d3.select("#validationDefault02").node().value;
    let dependants = d3.select("#validationDefault03").node().value;
    let marital_status = d3.select("#validationDefault04").node().value;
    let education_level = d3.select("#validationDefault05").node().value;
    let income = d3.select("#validationDefault06").node().value;
    let card_cat = d3.select("#validationDefault07").node().value;

    let customer = {
        "cust_age": parseFloat(cust_age),
        "gender": parseFloat(gender),
        "dependants": parseInt(dependants),
        "marital_status": parseInt(marital_status),
        "education_level": parseInt(education_level),
        "income": parseInt(income),
        "card_cat": parseInt(card_cat),
    }

    console.log(customer);

    document.querySelector('form').reset(); // to clear the form for the next entries


    d3.json(
        "/individual", {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    ).then(
        (customer) => console.log(customer)
    );

}

// // needs to be adjusted for customer churn output

// function showResult(customer) {
//     console.log("showResult");
//     console.log(customer);

//     var outcome = "Unknown";
//     let alertOutcomeDisplay = d3.select("#alertOutcome");

//     if (customer["result"][0] == 1) {
//         outcome = "Survived";
//         alertOutcomeDisplay.attr("class", "alert alert-success");
//     } else if (customer["result"][0] == 0) {
//         outcome = "Dead";
//         alertOutcomeDisplay.attr("class", "alert alert-info");
//     }

//     alertOutcomeDisplay.text(outcome);
//     alertOutcomeDisplay.style("display", "block");

// }