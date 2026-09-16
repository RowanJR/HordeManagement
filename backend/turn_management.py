from pymongo import MongoClient
import json
import random

def AdvanceQuarter(db, currentevents):

    #calculate new events
    draw = random.randint(2, 4)

    cursor = db.events.aggregate( [ {"$sample" : {"size" : draw} } ] )

    currentevents[:] = list(cursor).copy()

    #adjust all stock prices
    modifierdict = {}
    for event in currentevents:
        for modifier in event["modifiers"]:
            if modifier["id"] in modifierdict:
                modifierdict[modifier["id"]] += modifier["value"]
            else:
                modifierdict[modifier["id"]] = modifier["value"]
    
    for id, value in modifierdict.items():
        company = db.companies.find_one({ "id" : id })

        deviation = company["deviation"]
        background = random.uniform(-deviation, deviation)
        adjvalue = max(value + background, -0.95)

        db.companies.update_one({"id": id}, {"$set" : {"price" : company["price"] * (1 + adjvalue)}})

    #calculate dividends
    goldgain = 0

    for shares in db.players.find_one()["portfolio"]:
        if(shares["owned"] > 0):
            company = db.companies.find_one({ "id" : shares["id"] })

            goldgain += company['price'] * company['dividend'] * shares["owned"]
    
    db.players.update_one({}, {"$set" : {"gold" : db.players.find_one()["gold"] + goldgain}})

    return