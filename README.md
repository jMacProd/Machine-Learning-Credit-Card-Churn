# Machine Learning Project - Credit Card Churn

## Background

Customer churn is one of the biggest challenges for any business. It can be difficult for established businesses with a broad customer base to identify customers at risk. In this project, we used a dataset of credit card customers to develop a **machine learning** model that predicts if a customer is going to leave or stay with the business.

![dog](Images/have_to_go.jpg)

## Dataset

[Our dataset](https://www.kaggle.com/sakshigoyal7/credit-card-customers) consists of 10,000 existing and attrited customers. It includes 23 columns including their age, salary, marital_status, credit card limit, credit card category, etc.

## Data Exploration

We started the data exploration with a univariate analysis and visualised it in an [interactive Tableau dashbord](https://public.tableau.com/profile/franz.kiel#!/vizhome/Credit_Card_Churn/CreditCardChurn):

[![dashboard](Images/dashboard.png)](https://public.tableau.com/profile/franz.kiel#!/vizhome/Credit_Card_Churn/CreditCardChurn)

We further conducted bi-variate analysis, missing value treatment, and outlier treatment using Python in a [Jupyter Notebook](01%20Data%20Exploration/Multivariate_analysis.ipynb). Here are some of the results:

[<img src="Images/dashboard.png">](http://google.com.au/)

- Variable Identification (in word file in google drive)
- [Univariate Analysis in Tableau](https://public.tableau.com/profile/franz.kiel#!/vizhome/Credit_Card_Churn/CreditCardChurn)
- Bi-variate Analysis (Python file in data exploration)
- Missing Values treatment (in Python file)
- Outlier treatment (in python file)

## The App

The Credit Card Churn Predictor can be found here:

https://project3-bank-churning.herokuapp.com/
