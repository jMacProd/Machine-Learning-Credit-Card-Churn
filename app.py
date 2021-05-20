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

# from scipy import stats
# from scipy.stats import randint
# Models
# Tree Classifier
# from sklearn.tree import DecisionTreeClassifier
# Random Forest
# from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
# from sklearn.model_selection import RandomizedSearchCV
# Logistic Regression
# from sklearn.linear_model import LogisticRegression
 

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

    #IF we are using SQL on Heruko
# from flask_sqlalchemy import SQLAlchemy
# From Ryan's example
# from sqlalchemy.sql import select, column, text
# from sqlalchemy.sql.expression import func
# import simplejson

#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace("://", "ql://", 1) or "sqlite:///db.sqlite"

    #IF we are using SQL on local servier
    #cofig.py file used when accessing data from locally hosted postgres database. Commented out for Heroku deployment. File not tracked to github
# from config import user, password
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{user}:{password}@localhost:5432/twitteractivity'

    # Remove tracking modifications - probably only need this if using SQL
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# XXXXX = create_classes(db)

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
    return jsonify(customer)

#################################################
# create route that collects entered CSV on index.html
# and passes through model,  predictions and returns outcome
#################################################
@app.route("/bulk")
def bulk():
    return "Bulk data"


#################################################
# create route to test running data through prediction
#################################################
    #When ready to get Thomas's data use this
    #https://python-forum.io/thread-29090.html
#@app.route("/predictiontest", methods=["POST"])    
@app.route("/predictiontest")
def predictiontest():
    
        # this links data from Thomas's javascript file
    # data = request.json

        #For now create test data
    df_column_names = ['Customer_Age', 'Gender',
       'Dependent_count', 'Education_Level', 'Marital_Status',
       'Income_Category', 'Card_Category', 'Months_on_book',
       'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1', 'Avg_Utilization_Ratio']
    
    X_test_array = np.array([[43, 0, 2, 5, 1, 2, 1, 36, 6, 3, 2, 2570, 2107, 463, 0.651, 4058, 83, 0.766, 0.82]])

    X_test_scaled = pd.DataFrame(data=X_test_array, columns=df_column_names)

    X_scaler = pickle.load(open('04 Pre-processing Template/X_scaler.pkl', 'rb'))

    #List columns that need scaling
    col_names = ['Months_on_book', 'Total_Relationship_Count', 'Months_Inactive_12_mon',
       'Contacts_Count_12_mon', 'Credit_Limit', 'Total_Revolving_Bal',
       'Avg_Open_To_Buy', 'Total_Amt_Chng_Q4_Q1', 'Total_Trans_Amt',
       'Total_Trans_Ct', 'Total_Ct_Chng_Q4_Q1']
    
    #Create dataframe of just the columns to be scaled
    X_test_features = X_test_scaled[col_names]

    #Transform the data
    X_test_features = X_scaler.transform(X_test_features.values)

    #Updated originally copied df with new scaled features
    X_test_scaled[col_names] = X_test_features

    #Import ML Model using pickle
    randomforest = pickle.load(open("05 Machine Learning Models/randomforest_model_trained.sav", 'rb'))

    #Check that it works
    predictions_forest = randomforest.predict(X_test_scaled)

    #Predictions - 0 is Attrited, 1 is Existing Customer
    predictions_forest_decoded = np.argmax(predictions_forest, axis=1)

    if (predictions_forest_decoded[0] == 0):
        return (f"Customer is at risk of churn")
    elif (predictions_forest_decoded[0] == 1):
        return (f"Customer is not at risk of churn")

    # lists = predictions_forest_decoded.tolist()
    # json_str = json.dumps(lists)
    # return json_str
    # return str(predictions_forest_decoded[0])


#################################################
# End
#################################################1
if __name__ == "__main__":
    app.run(debug=True)