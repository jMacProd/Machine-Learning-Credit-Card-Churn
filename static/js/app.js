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
    let months_on_book = d3.select("#validationDefault08").node().value;
    let total_Relationship_Count = d3.select("#validationDefault09").node().value;
    let months_inactive_12_mon = d3.select("#validationDefault10").node().value;
    let contacts_Count_12_mon = d3.select("#validationDefault11").node().value;
    let credit_Limit = d3.select("#validationDefault12").node().value;
    let total_revolving_bal = d3.select("#validationDefault13").node().value;
    
    
    
    let avg_open_to_buy = d3.select("#validationDefault14").node().value;
    let total_amt_chng_Q4_Q1 = d3.select("#validationDefault15").node().value;
    let total_trans_amt = d3.select("#validationDefault16").node().value;
    let total_trans_ct = d3.select("#validationDefault17").node().value;
    let total_ct_chng_Q4_Q1 = d3.select("#validationDefault17").node().value;
    let avg_utilization_ratio = d3.select("#validationDefault17").node().value;


    let customer = {
        "cust_age": parseFloat(cust_age),
        "gender": parseFloat(gender),
        "dependants": parseInt(dependants),
        "marital_status": parseInt(marital_status),
        "education_level": parseInt(education_level),
        "income": parseInt(income),
        "card_cat": parseInt(card_cat),
        "months_on_book": parseInt(months_on_book),
        "total_Relationship_Count": parseFloat(total_Relationship_Count),
        "months_inactive_12_mon": parseFloat(months_inactive_12_mon),
        "contacts_Count_12_mon": parseFloat(contacts_Count_12_mon),
        "credit_Limit": parseFloat(credit_Limit),
        "total_revolving_bal": parseFloat(total_revolving_bal),
        "avg_open_to_buy": parseFloat(avg_open_to_buy),
        "total_amt_chng_Q4_Q1": parseFloat(total_amt_chng_Q4_Q1),
        "total_trans_amt": parseFloat(total_trans_amt),
        "total_trans_ct": parseFloat(total_trans_ct),
        "total_ct_chng_Q4_Q1": parseFloat(total_ct_chng_Q4_Q1),
        "avg_utilization_ratio": parseFloat(avg_utilization_ratio),

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
    );

}
