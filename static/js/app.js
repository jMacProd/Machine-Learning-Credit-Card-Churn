 d3.select("#btn").on("click", (event) => doCheckCustomer(event));

function doCheckCustomer(event) {
    
    d3.event.preventDefault();

    // console.log("Checking Customer");

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

    // this is testing code so I don't have to keep entering values.
    // Remember comment this out and to re-add commented code above
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

    // console.log(customer);
    // console.log(customer["Customer_Age"]);

    document.querySelector('form').reset(); // to clear the form for the next entries


    d3.json(
        "/individual", {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    ).then((outcome) => showResult(outcome)
    );

    function showResult(outcome) {
        // console.log("Encoded");
        // console.log(outcome);
    
 
        let cleartags = d3.select("#msg").selectAll("*").remove();
        let cleartagsbulk = d3.select("#bulkmsg").selectAll("*").remove();

        let predictionbox = d3.select("#bulkmsg");
    


        addtable = predictionbox.append("table");
        tableatttri = addtable.attr("id", "prediction_table")
                .attr("class", "table table-striped");
        headerrow = addtable.append("thead").append("tr");
        headercell1 = headerrow.append("th").text("Age");
        headercell2 = headerrow.append("th").text("Gender");
        headercell3 = headerrow.append("th").text("Dependants");
        headercell4 = headerrow.append("th").text("Marital Status");
        headercell5 = headerrow.append("th").text("Education");
        headercell6 = headerrow.append("th").text("Income");
        headercell7 = headerrow.append("th").text("Card");
        headercell8 = headerrow.append("th").text("M.O.B");
        headercell9 = headerrow.append("th").text("Relationships");
        headercell10 = headerrow.append("th").text("Inactive");
        headercell11= headerrow.append("th").text("Contacts");
        headercell12 = headerrow.append("th").text("Credit");
        headercell13 = headerrow.append("th").text("Revolving");
        headercell14 = headerrow.append("th").text("Avg open");
        headercell15 = headerrow.append("th").text("Amt Change");
        headercell16 = headerrow.append("th").text("Total trans amt");
        headercell17 = headerrow.append("th").text("Total trans count");
        headercell18 = headerrow.append("th").text("Total trans change");
        headercell19 = headerrow.append("th").text("Ratio");
        headercell20 = headerrow.append("th").text("Prediction");
        tbody = addtable.append("tbody");

        var row = tbody.append("tr");
        let n = 0
            
        Object.entries(customer).forEach(function([key, value]) {
            var cell = row.append("td")
            cell.text(value);
        
        });
        
        let prediction = ""
        if (outcome == 0) {
            prediction = "Churn Risk";
        }
        else if (outcome == 1) {
            prediction = "Safe";
        }
                                    
        var predictcell = row.append("td")
        predictcell.text(prediction)

    }

}



