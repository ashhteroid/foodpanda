from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)



class Food(db.Model):
    ndbno = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    measure = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return '<Food %r>' % self.name

class Nutrient(db.Model):
    nutrient_id = db.Column(db.Integer, primary_key=True)
    nutrient_name = db.Column(db.String(80), unique=True, nullable=False)
    unit = db.Column(db.String(80), nullable=False)
    value_per_unit = db.Column(db.String(80))
    grams_per_100 = db.Column(db.Integer)
    food_id = db.Column(db.Integer, db.ForeignKey('food.ndbno'), nullable=False)
    food = db.relationship('Food', backref=db.backref('nutrient', lazy=True))

    def __repr__(self):
        return '<Nutrient %r>' % self.nutrient_name

        

def update_database():
    with open('food_data.json') as f:
        json_dict = json.load(f)
    foods = json_dict["report"]["foods"]
    for food in foods:
        nutrients = food["nutrients"]
        for nutrient in nutrients:
            current_nutrient = int(nutrient["nutrient_id"])
            if current_nutrient in [203, 204, 205, 269]:
                if nutrient["gm"] == '--':
                    current_grams_per_100 = 0
                else:
                    current_grams_per_100 = int(nutrient["gm"])
                f = Food(
                        ndbno=int(food["ndbno"]), 
                        name=food["name"], 
                        weight=int(food["weight"]),
                        measure=food["measure"],
                        nutrient_id=current_nutrient,
                        nutrient_name=current_nutrient, 
                        unit= nutrient["unit"], 
                        value_per_unit=nutrient["value"],
                        grams_per_100=current_grams_per_100)
                db.session.add(f)
                db.session.commit()

@app.route('/api/foods')
def get_current_time():
    return {'time': time.time()}



