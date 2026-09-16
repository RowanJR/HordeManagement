from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from init import Initialize

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

client = MongoClient("mongodb://db:27017/")
db = client["dragons_hoard"]

currentevents = []

Initialize(db, currentevents)

companies = db.companies
events = db.events
playerstates = db.players

@app.route("/api/test", methods=['GET'])
def testcall():
    print("hello, world! sending test message", flush=True)
    return jsonify({'message':"test message from backend. Hi :)"})

@app.route("/api/portfolio", methods=['GET'])
def portfolio():
    stockcursor = companies.find()
    
    stocks = list(stockcursor)

    owner = playerstates.find_one()

    finalportfolio = []

    for i in range(len(stocks)):
        #get all the basic attributes from the stock information
        finalportfolio.append({"id" : stocks[i]["id"]})
        finalportfolio[i]["stockname"] = stocks[i]["name"]
        finalportfolio[i]["description"] = stocks[i]["description"]
        finalportfolio[i]["price"] = stocks[i]["price"]
        finalportfolio[i]["deviation"] = stocks[i]["deviation"]
        finalportfolio[i]["dividend"] = stocks[i]["dividend"]

        #search through the player's owned stocks and add this to the stock in the portfolio we're returning. If we can't find the stock, none are owned.
        present = False
        for shares in owner["portfolio"]:
            if(shares["id"] == finalportfolio[i]["id"]):
                present = True
                finalportfolio[i]["owned"] = shares["owned"]
                break
        if(not present):
            finalportfolio[i]["owned"] = 0

    #return
    return jsonify(finalportfolio), 200

@app.route("/api/events", methods=['GET'])
def events():
    finalevents = []
    for i in range(len(currentevents)):
        finalevents.append({"name" : currentevents[i]["name"]})
        finalevents[i]["description"] = currentevents[i]["description"]
        finalevents[i]["modifiers"] = currentevents[i]["modifiers"]
    
    return jsonify(finalevents), 200

@app.route("/api/gold", methods=['GET'])
def gold():
    value = playerstates.find_one()["gold"]
    return jsonify({"amount" : value}), 200

@app.route("/api/buy", methods=['PUT', 'POST'])
def buy():
    data = request.get_json()

    stockid = data.get('id')

    print(f"buying {stockid}", flush=True)

    goldamt = playerstates.find_one()["gold"]
    stockcost = companies.find_one({ "id" : stockid })["price"]

    #case 1: not enough gold to buy
    if(goldamt < stockcost):
        return jsonify({"message" : "insufficient funds for purchase" , "success" : False}), 200
     
    #case 2: have enough gold to buy
    newvalues = {"$set" : {"gold" : goldamt - stockcost}}

    #update our gold
    result = playerstates.update_one({}, newvalues)

    #update our owned stocks
    alreadyowned = -1
    for shares in playerstates.find_one()["portfolio"]:
        if(shares["id"] == stockid):
            alreadyowned = shares["owned"]
            break
    #if stock not already in portfolio
    if(alreadyowned == -1):
        new_asset = {
            "id": stockid,
            "owned": 1
        }
        result = playerstates.update_one({}, {"$push" : {"portfolio" : new_asset}})

    #if stock is in portfolio
    else:
        result = playerstates.update_one({"portfolio.id": stockid}, {"$set" : {"portfolio.$.owned" : alreadyowned + 1}})
 
    return jsonify({"message" : "bought","success" : True}), 200

@app.route("/api/sell", methods=['PUT', 'POST'])
def sell():

    data = request.get_json()

    stockid = data.get('id')

    print(f"selling {stockid}", flush=True)

    goldamt = playerstates.find_one()["gold"]
    stockcost = companies.find_one({ "id" : stockid })["price"]

    alreadyowned = -1
    for shares in playerstates.find_one()["portfolio"]:
        if(shares["id"] == stockid):
            alreadyowned = shares["owned"]
            break

    #case 1: not enough stock to sell
    if(alreadyowned <= 0):
        return jsonify({"message" : "no stocks to sell", "success" : False}), 200
    
    #case 2: have enough stock to sell
    newvalues = {"$set" : {"gold" : goldamt + stockcost}}

    #update our gold
    result = playerstates.update_one({}, newvalues)

    #remove one stock
    result = playerstates.update_one({"portfolio.id": stockid}, {"$set" : {"portfolio.$.owned" : alreadyowned - 1}})
    
    return jsonify({"message" : "sold", "success" : True}), 200

@app.route("/api/quarter", methods=['GET'])
def quarter():
    


    return jsonify({"message" : "next quarter"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
  