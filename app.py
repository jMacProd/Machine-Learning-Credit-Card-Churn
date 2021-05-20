# import necessary libraries
#from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from scipy import stats
from scipy.stats import randint
# Models
# Tree Classifier
from sklearn.tree import DecisionTreeClassifier
# Random Forest
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.model_selection import RandomizedSearchCV
# Logistic Regression
from sklearn.linear_model import LogisticRegression
 

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
    customers = request.json    
    console.log(customer)
    return jsonify(customer)

#################################################
# create route that collects entered CSV on index.html
# and passes through model,  predictions and returns outcome
#################################################
@app.route("/bulk")
def bulk():
    return "Bulk data"

#################################################
# End
#################################################1
if __name__ == "__main__":
    app.run(debug=True)