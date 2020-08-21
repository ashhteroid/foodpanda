from flask import (Flask, render_template)
import json
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from collections import namedtuple, defaultdict
from flask import jsonify
from sqlalchemy import or_, and_


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class Food(db.Model):
    code = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80),  unique=True, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    measure = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return self.name

class Nutrient(db.Model):
    code = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    unit = db.Column(db.String(80), nullable=False)
    value_per_unit = db.Column(db.String(80))
    grams_per_100 = db.Column(db.Integer)
    food_id = db.Column(db.Integer, db.ForeignKey('food.code'), primary_key=True)
    food = db.relationship('Food', backref=db.backref('nutrient', lazy=True))

    def __repr__(self):
        return ('Nutrient ' + self.name + '| grams_per_100 ' + str(self.grams_per_100))

def update_database():
    with open('data/food_data.json') as f:
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
                food_row = Food(code=int(food["ndbno"]), 
                                name=food["name"], 
                                weight=int(food["weight"]),
                                measure=food["measure"])

                nutrient_row = Nutrient(code=current_nutrient_id,
                                        name=nutrient["nutrient"], 
                                        unit= nutrient["unit"], 
                                        value_per_unit=nutrient["value"],
                                        grams_per_100=current_grams_per_100,
                                        food_id=int(food["ndbno"]))
                db.session.add(nutrient_row)
        db.session.add(food_row)
    db.session.commit()

class GetFoods(Resource):

    def __init__(self, *args, **kwargs):
        super(GetFoods, self).__init__(*args, **kwargs)
        self.MinMax = namedtuple('MinMax', 'minval maxval')

    def _get_min_max_dict(self, passed_values_dict):
        ''' Returns a dictionary of min and max values for each
            nutrient id as a namedtuple.

            Returns: Dictionary(Nutriend ID: Min and Max Value)
            ReturnType: {int:MinMax}
        '''
        min_max_values_dict = {}
        for k,v in passed_values_dict.items():
            if not v:
                continue              
            min_max_values_dict[int(k)] = self.MinMax(min(v), 
                                                 max(v))
            
        return min_max_values_dict
    
    def _add_query_results_to_dict(self, small_result):
            result = {}
            for row in small_result:
                print (row)
                food_code, food_name, nutrient_code, nutrient_name, nutrient_grams_per_100 = row
                if not food_code in result:
                    result[food_code] = {"name":food_name, 
                                         "nutrients":list()}
                nutrient_dict = { "code" : nutrient_code,
                                  "name" : nutrient_name,
                                  "nutrient_grams_per_100" : nutrient_grams_per_100}
                result[food_code]["nutrients"].append(nutrient_dict)
            
            return result

    def get(self):

        supported_nutrients_id = [203, 204, 205, 269]
        parser = reqparse.RequestParser()

        for cur_id in supported_nutrients_id:
            parser.add_argument(str(cur_id), type=int, action='append', default=list())
        input_dict = parser.parse_args()

        print (input_dict, "input dict")
        min_max_values_dict = self._get_min_max_dict(parser.parse_args())

        if not min_max_values_dict:
            print (db.session.query(Nutrient).join(Food, Food.code==Nutrient.food_id).group_by(Food.code)\
                   .values(Food.code, Food.name, Nutrient.code, Nutrient.name, Nutrient.grams_per_100))

        print (min_max_values_dict, "min max dict")
        #cond = and_(*[Team.users.any(User.username == p) for p in usernames])
        
        # view = db.session.query(Nutrient).filter\
        #        (or_(*[and_(Nutrient.code==k,\
        #                    Nutrient.grams_per_100>v.minval,\
        #                    Nutrient.grams_per_100<v.maxval)\
        #                    for k, v in min_max_values_dict.items()]))
        # print (view)
        '''
        dict = { 
                    food_code : {
                                name : "",
                                nutrients:  [ {nutrient_code : int,
                                              nutrient_name: "",
                                              nutrient_grams_per_100: int}
                                              ]

                            
                }
        }
        '''


        seleted_foods = set([food for food, in db.session.query(Food.code).all()])
        # print (seleted_foods)
        # Select Nutrients based on parameters
        for cur_nutrient, min_max in min_max_values_dict.items():
            small_result = db.session.query(Nutrient)\
                   .filter(Nutrient.code==cur_nutrient,\
                           Nutrient.grams_per_100 > min_max.minval,\
                           Nutrient.grams_per_100 < min_max.maxval)\
                   .join(Food, Food.code==Nutrient.food_id)\
                   .values(Food.code)
            # updated foods of interest
            cur_seleted_foods  = set([food for food, in small_result])
            print (cur_seleted_foods)
            seleted_foods  = seleted_foods.intersection(cur_seleted_foods)
        
        seleted_foods = list(seleted_foods)
        print (seleted_foods, "seleted_foods")
        # Select the foods of interest
        foods = list(db.session.query(Nutrient)\
                   .filter(Food.code.in_(seleted_foods))\
                   .join(Food, Nutrient.food_id==Food.code)\
                   .values(Food.code, Food.name, Nutrient.code, Nutrient.name, Nutrient.grams_per_100))

        print (foods, "foods")
        result = self._add_query_results_to_dict(foods)
        print (result, "results")

        #     print ("###############")
        #     print (view)
        # where = ""
        # for cur_nutrient, min_max in min_max_values_dict.items():
        #     where += "(Nutrient.code={} \
        #                 and Nutrient.grams_per_100>={} \
        #                 and Nutrient.grams_per_100<={}) \
        #                 OR ".format(cur_nutrient, min_max.minval, min_max.maxval)

        # where = where[:-3]
        # print (where)
        # result = db.engine.execute("SELECT Food.code Food.name \
        #                                    Nutrient.code Nutrient.name Nutrient.grams_per_10 \
        #                             From Food AS \
        #                             INNER JOIN \
        #                             (SELECT  Food.code, Food.name, Nutrient.code, Nutrient.name, Nutrient.grams_per_100\
        #                             From Nutrient WHERE {} ) \
        #                             on Food.code = Nutrient.food_id".format(where))
        # Join with Food tablel to get food info and get required values
        # result = view.join(Food, Food.code==Nutrient.food_id).group_by(Food.code)\
        #           .values(Food.code, Food.name, Nutrient.code, Nutrient.name, Nutrient.grams_per_100)
        # result = list(result)
        # a = Nutrient.query.filter_by(code='203',unit="g").first()
        #a = Nutrient.query.filter(Nutrient.grams_per_100 < int(d['203'])).filter(Nutrient.code=="203").first()
        
        
        return result

api.add_resource(GetFoods, '/api/foods')

@app.route("/")
def my_index():
    return render_template("index.html")

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    # print (Food.query.all())

    db.drop_all()
    db.create_all()
    update_database()
    app.debug = True
    app.run(host='0.0.0.0', port=8080)