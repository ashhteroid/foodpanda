from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
from flask_restful import Resource, Api, reqparse



app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class Food(db.Model):
    ndbno = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80),  unique=True, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    measure = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return 'Food: ' + self.name

class Nutrient(db.Model):
    nutrient_id = db.Column(db.Integer, primary_key=True)
    nutrient_name = db.Column(db.String(80), nullable=False)
    unit = db.Column(db.String(80), nullable=False)
    value_per_unit = db.Column(db.String(80))
    grams_per_100 = db.Column(db.Integer)
    food_id = db.Column(db.Integer, db.ForeignKey('food.ndbno'), primary_key=True)
    food = db.relationship('Food', backref=db.backref('nutrient', lazy=True))

    def __repr__(self):
        return ('Nutrient ' + self.nutrient_name + '| grams_per_100 ' + str(self.grams_per_100))

def update_database():
    with open('food_data.json') as f:
        json_dict = json.load(f)
    foods = json_dict["report"]["foods"]
    for food in foods:
        nutrients = food["nutrients"]
        for nutrient in nutrients:
            current_nutrient_id = int(nutrient["nutrient_id"])
            if current_nutrient_id in [203, 204, 205, 269]:
                if nutrient["gm"] == '--':
                    current_grams_per_100 = 0
                else:
                    current_grams_per_100 = int(nutrient["gm"])
                food_row = Food(ndbno=int(food["ndbno"]), 
                                name=food["name"], 
                                weight=int(food["weight"]),
                                measure=food["measure"])

                nutrient_row = Nutrient(nutrient_id=current_nutrient_id,
                                        nutrient_name=nutrient["nutrient"], 
                                        unit= nutrient["unit"], 
                                        value_per_unit=nutrient["value"],
                                        grams_per_100=current_grams_per_100,
                                        food_id=int(food["ndbno"]))
                db.session.add(nutrient_row)
        db.session.add(food_row)
    db.session.commit()

class GetFoods(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('protein', type=list)
        parser.add_argument('carbohydrate', type=list)
        parser.add_argument('sugar', type=list)
        parser.add_argument('269' ,type=str )
        print(dir(parser.add_argument))
        d = parser.parse_args()
        print (d)

        result = list(db.session.query(Nutrient).join(Food, Food.ndbno==Nutrient.food_id)\
                 .values(Nutrient.nutrient_id, Nutrient.nutrient_name, Food.name))

        a = Nutrient.query.filter_by(nutrient_id='203',unit="g").first()
        #a = Nutrient.query.filter(Nutrient.grams_per_100 < int(d['203'])).filter(Nutrient.nutrient_id=="203").first()
        print (result[0])
        
        return d

api.add_resource(GetFoods, '/api/foods')

# @app.route('/api/foods')
# def get_current_time():
#     return 'time'

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    # print (Food.query.all())

    db.drop_all()
    db.create_all()
    update_database()
    app.debug = True
    app.run()


