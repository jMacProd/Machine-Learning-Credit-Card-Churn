

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


    // let customer = {
    //     "Customer_Age": parseInt(cust_age),
    //     "Gender": parseInt(gender),
    //     "Dependent_count": parseInt(dependants),
    //     "Education_Level": parseInt(education_level),
    //     "Marital_Status": parseInt(marital_status),
    //     "Income_Category": parseInt(income),
    //     "Card_Category": parseInt(card_cat),
    //     "Months_on_book": parseInt(months_on_book),
    //     "Total_Relationship_Count": parseInt(total_Relationship_Count),
    //     "Months_Inactive_12_mon": parseInt(months_inactive_12_mon),
    //     "Contacts_Count_12_mon": parseInt(contacts_Count_12_mon),
    //     "Credit_Limit": parseInt(credit_Limit),
    //     "Total_Revolving_Bal": parseInt(total_revolving_bal),
    //     "Avg_Open_To_Buy": parseInt(avg_open_to_buy),
    //     "Total_Amt_Chng_Q4_Q1": parseFloat(total_amt_chng_Q4_Q1),
    //     "Total_Trans_Amt": parseInt(total_trans_amt),
    //     "Total_Trans_Ct": parseInt(total_trans_ct),
    //     "Total_Ct_Chng_Q4_Q1": parseFloat(total_ct_chng_Q4_Q1),
    //     "Avg_Utilization_Ratio": parseFloat(avg_utilization_ratio),

    // }

    // this is testing code so I don't have to keep entering values.
    // Remember comment this out and to re-add commented code above
    let customer = {
        "Customer_Age": parseInt(62),
        "Gender": parseInt(0),
        "Dependent_count": parseInt(0),
        "Education_Level": parseInt(5),
        "Marital_Status": parseInt(1),
        "Income_Category": parseInt(2),
        "Card_Category": parseInt(1),
        "Months_on_book": parseInt(49),
        "Total_Relationship_Count": parseInt(2),
        "Months_Inactive_12_mon": parseInt(3),
        "Contacts_Count_12_mon": parseInt(3),
        "Credit_Limit": parseInt(1438.3),
        "Total_Revolving_Bal": parseInt(0),
        "Avg_Open_To_Buy": parseInt(1438.3),
        "Total_Amt_Chng_Q4_Q1": parseFloat(1.047),
        "Total_Trans_Amt": parseInt(692),
        "Total_Trans_Ct": parseInt(16),
        "Total_Ct_Chng_Q4_Q1": parseFloat(.6),
        "Avg_Utilization_Ratio": parseFloat(0),

    }

    console.log(customer);
    console.log(customer["Customer_Age"]);

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
        (outcome) => showResult(outcome)
    );

    function showResult(outcome) {
        console.log("Encoded");
        console.log(outcome);
    
        var prediction = ""
        let predictionbox = d3.select("#msg");
    
    
        if (outcome == 0) {
            prediction = "Customer is at risk of churn";

        }
        else if (outcome == 1) {
            prediction = "Customer is not at risk of churn";

        }

        addtable = predictionbox.append("table");
        tableatttri = addtable.attr("id", "prediction_table")
            .attr("class", "table table-striped");
        tablehead1 = addtable.append("thead").append("th").attr("class", "table-head").text("Input");
        tablebody = addtable.append("tbody");
        tablerow1 = tablebody.append("tr");
        age = tablerow1.append("td").text("Age: " + customer["Customer_Age"]);
        gender = tablerow1.append("td").text("Gender: " + customer["Gender"]);
        depend = tablerow1.append("td").text("Dependents: " + customer["Dependent_count"]);
        educat = tablerow1.append("td").text("Education: " + customer["Education_Level"]);

        tablerow2 = tablebody.append("tr");
        marry = tablerow2.append("td").text("Marital Status: " + customer["Marital_Status"]);
        blank = tablerow2.append("td");
        income = tablerow2.append("td").text("Income: " + customer["Income_Category"]);
        card_cat = tablerow2.append("td").text("Card Level: " + customer["Card_Category"]);
        
        tablerow3 = tablebody.append("tr");
        book = tablerow3.append("td").text("Months on book: " + customer["Months_on_book"]);
        relat = tablerow3.append("td").text("Relationship Count : " + customer["Total_Relationship_Count"]);
        inact = tablerow3.append("td").text("Months Inactive: " + customer["Months_Inactive_12_mon"]);
        contact = tablerow3.append("td").text("Contacts Count: " + customer["Contacts_Count_12_mon"]);

        tablerow4 = tablebody.append("tr");
        credit = tablerow4.append("td").text("Credit Limit: " + customer["Credit_Limit"]);
        bal = tablerow4.append("td").text("Total Revolving Bal: " + customer["Total_Revolving_Bal"]);
        openbuy = tablerow4.append("td").text("Avg Open To Buy: " + customer["Avg_Open_To_Buy"]);
        Amtchange = tablerow4.append("td").text("Total Amt Chng: " + customer["Total_Amt_Chng_Q4_Q1"]);

        tablerow5 = tablebody.append("tr");
        totalAmt = tablerow5.append("td").text("Total Trans Amt: " + customer["Total_Trans_Amt"]);
        totalCnt = tablerow5.append("td").text("Total Trans Ct: " + customer["Total_Trans_Ct"]);
        Cntchange = tablerow5.append("td").text("Total Ct Chng: " + customer["Total_Ct_Chng_Q4_Q1"]);
        util = tablerow5.append("td").text("Avg Util. Ratio: " + customer["Avg_Utilization_Ratio"]);

        addtable2 = predictionbox.append("table");
        tableatttri = addtable.attr("id", "prediction_table")
            .attr("class", "table table-striped");
        
        tablehead2 = addtable.append("thead");
        headrow2 = tablehead2.append("th").attr("class", "table-head").text("Prediction:");
        headrow2 = tablehead2.append("th").text(prediction);

    }



function showResult(outcome) {
    console.log("Encoded");
    console.log(outcome);

    var prediction = ""
    let predictionbox = d3.select("#msg");


    if (outcome == 0) {
        prediction = "Customer is at risk of churn";

        // console.log("Prediction1");
        // console.log("Customer is at risk of churn");
    }
    else if (outcome == 1) {
        prediction = "Customer is not at risk of churn";
        // console.log("Prediction2");
    //     console.log(prediction);
        
    
    }
    // predictionbox.append("p");
    predictionbox.text("prediction");
}