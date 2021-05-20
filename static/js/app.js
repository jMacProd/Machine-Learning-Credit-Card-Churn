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
    let total_ct_chng_Q4_Q1 = d3.select("#validationDefault18").node().value;
    let avg_utilization_ratio = d3.select("#validationDefault19").node().value;


    let customer = {
        "Customer_Age": parseInt(cust_age),
        "Gender": parseInt(gender),
        "Dependent_count": parseInt(dependants),
        "Education_Level": parseInt(education_level),
        "Marital_Status": parseInt(marital_status),
        "Income_Category": parseInt(income),
        "Card_Category": parseInt(card_cat),
        "Months_on_book": parseInt(months_on_book),
        "Total_Relationship_Count": parseInt(total_Relationship_Count),
        "Months_Inactive_12_mon": parseInt(months_inactive_12_mon),
        "Contacts_Count_12_mon": parseInt(contacts_Count_12_mon),
        "Credit_Limit": parseInt(credit_Limit),
        "Total_Revolving_Bal": parseInt(total_revolving_bal),
        "Avg_Open_To_Buy": parseInt(avg_open_to_buy),
        "Total_Amt_Chng_Q4_Q1": parseFloat(total_amt_chng_Q4_Q1),
        "Total_Trans_Amt": parseInt(total_trans_amt),
        "Total_Trans_Ct": parseInt(total_trans_ct),
        "Total_Ct_Chng_Q4_Q1": parseFloat(total_ct_chng_Q4_Q1),
        "Avg_Utilization_Ratio": parseFloat(avg_utilization_ratio),

    }

    // let customer = {
    //     "Customer_Age": parseInt(45),
    //     "Gender": parseInt(1),
    //     "Dependent_count": parseInt(3),
    //     "Education_Level": parseInt(3),
    //     "Marital_Status": parseInt(1),
    //     "Income_Category": parseInt(4),
    //     "Card_Category": parseInt(1),
    //     "Months_on_book": parseInt(39),
    //     "Total_Relationship_Count": parseInt(5),
    //     "Months_Inactive_12_mon": parseInt(1),
    //     "Contacts_Count_12_mon": parseInt(3),
    //     "Credit_Limit": parseInt(12345),
    //     "Total_Revolving_Bal": parseInt(1244),
    //     "Avg_Open_To_Buy": parseInt(12345),
    //     "Total_Amt_Chng_Q4_Q1": parseFloat(1.335),
    //     "Total_Trans_Amt": parseInt(1144),
    //     "Total_Trans_Ct": parseInt(42),
    //     "Total_Ct_Chng_Q4_Q1": parseFloat(1.625),
    //     "Avg_Utilization_Ratio": parseFloat(0.061),

    // }

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
