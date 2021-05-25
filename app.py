#NEED TO ACTIVATE PythonData ENVIRONMENT

# import necessary libraries
#from models import create_classes
import os
import pandas as pd
import numpy as np
import pickle




from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)



#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# Not Required

#################################################
# create route that renders index.html template
#################################################

@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results

#################################################
# create route that collects entered individual data on index.html
# and passes through model,  predictions and returns outcome
#################################################

@app.route("/individual", methods=["POST"])
def individual():
    customer = request.json    
    print(customer)
    
    df_column_names = ['Customer_Age', 'Gender',
       'Dependent_count', 'Education_Level', 'Marital_Status',
       'Income_Category', 'Card_Category', 'Months_on_book',
       'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1', 'Avg_Utilization_Ratio']
    
    X_test_scaled = pd.DataFrame([customer])
    # X_test_array = np.array([[43, 0, 2, 5, 1, 2, 1, 36, 6, 3, 2, 2570, 2107, 463, 0.651, 4058, 83, 0.766, 0.82]])
    # X_test_scaled = pd.DataFrame([customer]).rename(columns=df_column_names)
    #  df = pd.DataFrame([data]).rename(columns=rename_cols)[col_order]

    #######################
    X_scaler = pickle.load(open('04 Pre-processing Template/X_scaler.pkl', 'rb'))

    #List columns that need scaling
    col_names = ['Months_on_book', 'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1', 'Avg_Utilization_Ratio']
    
    # #Create dataframe of just the columns to be scaled
    X_test_features = X_test_scaled[col_names]

    # #Transform the data
    X_test_features = X_scaler.transform(X_test_features.values)

    # #Updated originally copied df with new scaled features
    X_test_scaled[col_names] = X_test_features

    # #Import ML Model using pickle
    randomforest = pickle.load(open("05 Machine Learning Models/randomforest_model_trained.sav", 'rb'))

    #Check that it works
    predictions_forest = randomforest.predict(X_test_scaled)

    #Predictions - 0 is Attrited, 1 is Existing Customer
    predictions_forest_decoded = np.argmax(predictions_forest, axis=1)


    prediction_list = predictions_forest_decoded.tolist() 
    return jsonify(prediction_list[0])


#################################################
# create route that collects entered CSV on index.html
# and passes through model,  predictions and returns outcome
#################################################
@app.route("/bulk", methods=["POST"])
def bulk():
    # data = request.json    
    # print(data)

    # if request.method == 'POST':
    data = request.json
    # print(data)

    df_column_names = ['Customer_Age', 'Gender',
       'Dependent_count', 'Education_Level', 'Marital_Status',
       'Income_Category', 'Card_Category', 'Months_on_book',
       'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1', 'Avg_Utilization_Ratio']

    X_test_scaled = pd.DataFrame(data, columns = df_column_names)
    # print(X_test_scaled.columns)
    # print(X_test_scaled.values)

    #ENCODING CATEGORICAL FEATURES
    #Ordinal Categorical Features
    map_education = {"Unknown":1, "Uneducated":2, "High School":3, "College":4, "Graduate":5, "Post-Graduate":6, "Doctorate":7}
    X_test_scaled['Education_Level'] = X_test_scaled['Education_Level'].map(map_education)
    X_test_scaled['Education_Level'] = X_test_scaled['Education_Level'].astype(int)

    map_income = {"Unknown":1, "Less than $40K":2, "$40K - $60K":3, "$60K - $80K":4, "$80K - $120K":5, "$120K +":6}
    X_test_scaled['Income_Category'] = X_test_scaled['Income_Category'].map(map_income)
    X_test_scaled['Income_Category'] = X_test_scaled['Income_Category'].astype(int)


    map_cards = {"Blue":1, "Silver" :2, "Gold":3, "Platinum":4}
    X_test_scaled['Card_Category'] = X_test_scaled['Card_Category'].map(map_cards)
    X_test_scaled['Card_Category'] = X_test_scaled['Card_Category'].astype(int)


    #Non-ordinal Categorical Features
    #Gender
    for i in range(len(X_test_scaled)):
        if (X_test_scaled.loc[X_test_scaled.index[i], 'Gender'] == "F"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Gender'] = 0
        elif (X_test_scaled.loc[X_test_scaled.index[i], 'Gender'] == "M"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Gender'] = 1
        
    X_test_scaled['Gender'] = X_test_scaled['Gender'].astype(int)

    #Marital_Status
    for i in range(len(X_test_scaled)):
        if (X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] == "Married"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] = 1
        elif (X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] == "Single"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] = 2
        elif (X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] == "Unknown"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] = 3
        elif (X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] == "Divorced"):
            X_test_scaled.loc[X_test_scaled.index[i], 'Marital_Status'] = 4
        
    X_test_scaled['Marital_Status'] = X_test_scaled['Marital_Status'].astype(int) 
  
    #ensure all other numeical columns are integers
    X_test_scaled = X_test_scaled.astype({'Customer_Age': 'int64', 'Dependent_count': 'int64', 'Months_on_book': 'int64', 'Total_Relationship_Count': 'int64', 'Months_Inactive_12_mon':'int64', 'Contacts_Count_12_mon':'int64', 'Credit_Limit':'float64', 'Total_Revolving_Bal':'int64', 'Avg_Open_To_Buy':'float64', 'Total_Amt_Chng_Q4_Q1':'float64', 'Total_Trans_Amt':'int64', 'Total_Trans_Ct':'int64', 'Total_Ct_Chng_Q4_Q1':'float64', 'Avg_Utilization_Ratio':'float64'
    })
    # print(X_test_scaled.columns)
    # print(X_test_scaled.values)

    X_scaler = pickle.load(open('04 Pre-processing Template/X_scaler.pkl', 'rb'))
    

    
    #List columns that need scaling
    col_names = ['Months_on_book', 'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1', 'Avg_Utilization_Ratio']
    # print(col_names)
    
    # #Create dataframe of just the columns to be scaled
    X_test_features = X_test_scaled[col_names]
    # print(X_test_features.columns)
    # print(X_test_features.values)

    # # #Transform the data
    X_test_features = X_scaler.transform(X_test_features.values)

    # # #Updated originally copied df with new scaled features
    X_test_scaled[col_names] = X_test_features
    # print(X_test_scaled.columns)
    # print(X_test_scaled.values)

    # # #Import ML Model using pickle
    randomforest = pickle.load(open("05 Machine Learning Models/randomforest_model_trained.sav", 'rb'))

    # #Check that it works
    predictions_forest = randomforest.predict(X_test_scaled)

    # #Predictions - 0 is Attrited, 1 is Existing Customer
    predictions_forest_decoded = np.argmax(predictions_forest, axis=1)

    prediction_list = predictions_forest_decoded.tolist()
    print(prediction_list)
    return jsonify(prediction_list)
    # return jsonify(prediction_list)
    #     return jsonify({"status":"success"})
    # else:
    #     return ("Don't know what this is doing")
    
    # dataframelist = X_test_scaled.tolist() 
    # return jsonify(dataframelist)
    # return ("Bulk data Issue")


#################################################
# End
#################################################1
if __name__ == "__main__":
    app.run(debug=True)