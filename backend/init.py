from pymongo import MongoClient
import json

def Initialize(db, currentevents):

    with open("stocks.json", "r") as file:
        stocks = json.load(file)
    
    db.companies.drop()
    db.companies.insert_many(stocks)

    with open("events.json", "r") as file:
        events = json.load(file)

    db.events.drop()
    db.events.insert_many(events)

    #right now there is only one player due to how time progression works in the game and because there is one data base for all stocks
    db.players.drop()
    db.players.insert_one({
        "gold": 1000,
        "portfolio": [ {"id": "FARM", "owned": 0}, {"id": "CRWN", "owned": 0} ]
    })

    return