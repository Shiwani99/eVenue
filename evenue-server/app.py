from flask import Flask, request, jsonify, render_template, flash, redirect, url_for, session, make_response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo,MongoClient
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from datetime import datetime, timedelta
from bson import ObjectId
import jwt
import os, requests
#from flask_session import Session
from twilio.rest import Client
import random


app = Flask(__name__)
CORS(app,origins="*", supports_credentials=True)


app.secret_key = os.environ.get("SECRET_KEY")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD")



mail = Mail(app)

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
collection = mongo.db.venues
collection1 = mongo.db.users
collection2 = mongo.db.organize_events
collectionp = mongo.db.players

# Replace with your own API credentials from Twilio
account_sid = os.environ.get("ACCOUNT_SID")
auth_token = os.environ.get("AUTH_TOKEN")
client = Client(account_sid, auth_token)



# @app.route('/home', methods = ["GET"])
# def home():
#     # sess = request.json.get("session")
#     # print(sess)
#     print(session)
#     if session:
#         if 'firstname' in session:
#             firstname = session['firstname']
#             email = session['email']
#     else:
#         firstname = ""
#         email = ""
#     print(email)
#     response = {
#         "session": session,
#         "firstname": firstname,
#         "email": email
#     }
#     return response

@app.route('/voprofile',methods= ['GET'])
def voprofile():
    vo_email = session['email']
    print(vo_email)

    #docs = list(mongo.db.voevent.find())

    docs = list(mongo.db.venues.find())

    for doc in docs:
        doc['_id'] = str(doc['_id'])

    # for d in docs:
    #     print(docs)

    # for d in docs:
    #     d.pop('_id', None)
    #     print(d)

   

    

    print("Breaker.........................................................................."+"\n")
    #print(docs)

    filtered_data = [d for d in docs if d.get('owner') == vo_email]

    filtered_events = [event for event in filtered_data if event['eventStatus'] == 'true']

    # Print filtered data
    print(filtered_data)

    print("Breaker.............................................................................\n")

    print(filtered_events)




    json_data = jsonify(filtered_events)

    return json_data



@app.route("/voprofile/<string:event_id>", methods=["PUT"])
def update_venue_status(event_id):
    #events = mongo.db.voevent 
    events = mongo.db.venues
    print("eventId: ", event_id)
    # Get the updated eventStatus from the request
    event_status = request.json.get("eventStatus")
    print("event Stats: ", event_status)

    # Convert event_id to ObjectId
    event_id = ObjectId(event_id)

    # Update the eventStatus in the MongoDB document
    events.update_one(
        {"_id": event_id},
        {"$set": {"eventStatus": 'event_status'}}
    )

    return jsonify({"message": "Event status updated successfully"})



@app.route('/voview', methods =['POST'])  
def voview():

    print(session['email']+" "+"Why is this not printingggg")
    owner_email = session['email']
    client = MongoClient('localhost',8080)

    db = client['test']

    #collection = db['voevent']
    collection = db['venues']

    # collectionList = mongo.db.list_collection_names()
    # if "voevent" not in collectionList:
    #    collection = db['voevent']
    # else:
    #     print("Ignore this collection already present in db...")

    
    schema = {
        "venuename": {"type": "string"},
        "location": {"type": "string"},
        "time": {"type": "string"},
        "date": {"type": "string"},
        "eventStatus": {"type": "string"},
        "owner": {"type": "string"}
    }

        # Insert document with schema
    venuename = request.json.get("venuename")
    location = request.json.get("location")
    time = request.json.get("time")
    date = request.json.get("date")
    eventStatus = request.json.get("eventStatus")
    owner_email = session['email']
    city = request.json.get("city")
    state = request.json.get("state")
    image = request.json.get("image")


    document = {
        "venuename": venuename,
        "location": location,
        "time": time,
        "date": date,
        "eventStatus": eventStatus,
        "owner": owner_email,
        "city":city,
        "state":state,
        "image":image
    }

    print("Voview details: " + venuename + ' ' + location+' '+ time + ' '+date + ' '+eventStatus + ' '+ owner_email)

    #mongo.db.voevent.insert_one(document)

    mongo.db.venues.insert_one(document)

    response = {
        "message": "Stored new event"
    }

    return response

@app.route('/login', methods=["POST"])
def login():
    # Find out what URL to hit for Google login
    # google_provider_cfg = get_google_provider_cfg()
    # authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # # Use library to construct the request for Google login and provide
    # # scopes that let you retrieve user's profile from Google
    # request_uri = client.prepare_request_uri(
    #     authorization_endpoint,
    #     redirect_uri=request.base_url + "/callback",
    #     scope=["openid", "email", "profile"],
    # )
    # return redirect(request_uri)

    usertype = request.json.get("usertype")

    if usertype == '2':

        email = request.json.get('email')
        password = request.json.get('password')
        response = {
            "email": email,
            "password": password,
            "usertype": '2',
            "message": "Received Details"
        }   

        found_user = mongo.db.venueowner.find_one({"email": email})
        if found_user:
            if bcrypt.check_password_hash(found_user['password'], password):
                
                session['email'] = found_user['email']
                

                # Generate a random 6-digit code and send it via SMS
                verification_code = str(random.randint(100000, 999999))

                session['2fa_code'] = verification_code

                client.messages.create(
                body=f'Your Evenue verification code is {verification_code}',
                from_='+16206341310',
                to=found_user["phone"]
                )

                response = {
                    "email": email,
                    "password": password,
                    "message": "Login Successful"
                }   

                # return redirect('https://evenuee.herokuapp.com/voview')
                # return jsonify({'redirect_url':'/voview'})
            
            else:
                response = {
                "message": "Wrong Password. Try Again."
                }
        else:

            response = {
                "message": "User not found"
            }

        #commenting session as I think it's being run for every venue creation
        #print(session)
        #response.redirect_uri("http://localhost:8080/voview")

      


    elif usertype == '1':





        email = request.json.get('email')
        password = request.json.get('password')
        response = {
            "email": email,
            "password": password,
            "usertype":'1',
            "message": "Received Details"
        }   

        found_user = mongo.db.users.find_one({"email": email})
        if found_user:
            if bcrypt.check_password_hash(found_user['password'], password):

                # Generate a random 6-digit code and send it via SMS
                verification_code = str(random.randint(100000, 999999))

                client.messages.create(
                body=f'Your Evenue verification code is {verification_code}',
                from_='+16206341310',
                to=found_user["phone"]
                )

                session['email'] = found_user['email']
                session['_id'] = str(found_user['_id'])
                session['2fa_code'] = verification_code

                response = {
                    "email": email,
                    "password": "98",
                    "message": "Login Successful"
                }


                requests.get('https://api.chatengine.io/users/me/', 
                headers={ 
                "Project-ID": os.environ.get("PROJECT_ID"),
                "Private-Key": os.environ.get("PRIVATE_KEY"),
                "User-Name": email,
                "User-Secret": os.environ.get("USER_SECRET"),
                
                }
            )   
            
            else:
                response = {
                "message": "Wrong Password. Try Again."
                }
        else:

            response = {
                "message": "User not found"
            }

        #Commenting session as I think it's running for every voview request 

        #print(session)

        return response

    else:
        response = {
            "message": "Invalid User type, Select one among user or venue Owner"
        }

        return response 

@app.route('/verify_code', methods=["POST"])
def verify_code():
    code=request.json.get("code")

    if(code==session['2fa_code']):
        return jsonify({"message":"Authenticated Successfully"})
    
    return jsonify({"message":"Authentication not successful"})


@app.route('/register', methods=["POST"])
def register():
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    phone = request.json.get("phone")
    email = request.json.get("email")
    password = request.json.get("password")
    usertype = request.json.get("usertype")
    organize = request.json.get("organized_events")
    events_booked = request.json.get("events_booked")
    venues_booked = request.json.get("venues_booked")

    userfind=collection1.find_one({"email":email})
    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    if usertype == '2':
        client = MongoClient('localhost', 8080)
        db = client['test']
        collection = db['venueowner']
        collectionList = mongo.db.list_collection_names()
        if "venueowner" not in collectionList:
            collection = db['venueowner']
        else:
            print("Ignore this vo collection already present in db")
        
        phone = "+1" + phone

        mongo.db.venueowner.insert_one({
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "usertype": usertype,
            "email": email,
            "password": hash_pass,
        })

        response = {
            "name": firstname + lastname,
            "message": "RECEIVED CREDS"
        }

        return response

    else:
    
        if(userfind==None):
            print("USER DEETS: " + firstname + ' ' + lastname)
            phone = "+1" + phone

            mongo.db.users.insert_one({
                "firstname": firstname,
                "lastname": lastname,
                "phone": phone,
                "usertype": usertype,
                "email": email,
                "password": hash_pass,
                "organized_events":organize,
                "events_booked":events_booked,
                "venues_booked":venues_booked
            })
            
            response = {
                "name": firstname + lastname,
                "message": "Registration successful"
            }

            requests.post('https://api.chatengine.io/users/', 
                data={
                    "username":email,
                    "secret": "98",
                    "email": email,
                    "first_name": firstname,
                    "last_name": lastname,
                },
                headers={ "Private-Key": os.environ.get("PRIVATE_KEY") }
            )
        else:
            response = {
                "message": "User already exists"
            }

    return response

   
@app.route('/logout')
def logout():
    session.clear()

    return {
        "message": "Logout successful"
    }



@app.route("/data")
def get_documents():

    name=request.args.get('venueName',default=None)
    #location=request.args.get('location',default=None)
    #capacity=request.args.get('capacity',default=None)
    location=request.args.get('location',default=None)
    city=request.args.get('city',default=None)
    state=request.args.get('state',default=None)
    search_query=request.args.get('search_query',default=None)
  
    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'venuename': regex },{ 'city': regex },{ 'state': regex },{ 'location': regex }]}
    if name:
        sports_list = name.split(',')
        query["venuename"]={"$in": sports_list}
    if city:
        sports_list = city.split(',')
        query["city"]={"$in": sports_list}
    if state:
        sports_list = state.split(',')
        query["state"]={"$in": sports_list}
    if location:
        query["location"]=location

    
    """
    if capacity:
        sports_list = capacity.split(',')
        int_list = list(map(int, sports_list))
        query["capacity"]={"$in": int_list}
    """

    print(query)
    
    documents = list(collection.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)


    return jsonify(json_docs)

@app.route("/dataa")
def get_adocuments():
    age_range=request.args.get('age_range',default=None)
    activityName=request.args.get('event_type',default=None)
    cost=request.args.get('cost',default=None)
    city=request.args.get('city',default=None)
    state=request.args.get('state',default=None)
    search_query=request.args.get('search_query',default=None)

    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'age_range': regex },{ 'event_type': regex },{ 'cost_type': regex },{ 'city': regex },{ 'state': regex }]}
    if age_range:
        sports_list = age_range.split(',')
        query["age_range"]={"$in": sports_list}
    if activityName:
        sports_list = activityName.split(',')
        query["event_type"]={"$in": sports_list}
    if cost:
        sports_list = cost.split(',')
        if("paid" not in sports_list):
            query["cost_type"]="free"
        elif("free" not in sports_list):
            query["cost_type"]="paid"
    if city:
        sports_list = city.split(',')
        query["city"]={"$in": sports_list}
    if state:
        sports_list = state.split(',')
        query["state"]={"$in": sports_list}

    print(query)
    
    documents = list(collection2.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    return jsonify(json_docs)


@app.route("/datap")
def get_pdocuments():

    #name=request.args.get('name',default=None)
    age_range=request.args.get('age_range',default=None)
    interest=request.args.get('interest',default=None)
    gender=request.args.get('gender',default=None)
    skill_level=request.args.get('skill_level',default=None)
    search_query=request.args.get('search_query',default=None)

    #print(type_activity or name or location or city or capacity)

    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'age_range': regex },{ 'interest': regex },{ 'gender': regex },{ 'skill_level': regex }]}
    if age_range:
        sports_list = age_range.split(',')
        if len(sports_list)==1:
            if "18 and above" in sports_list:
                query["age"]={"$gte":18}
            elif "under 18" in sports_list:
                query["age"]={"$lt":18}
    if interest:
        sports_list = interest.split(',')
        query["sports"]={"$in": sports_list}
    if gender:
        sports_list = gender.split(',')
        query["gender"]={"$in": sports_list}
    if skill_level:
        sports_list = skill_level.split(',')
        query["skill_level"]={"$in": sports_list}

    print(query)
    
    documents = list(collection1.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)
    return jsonify(json_docs)


@app.route('/forgot password',methods=["POST"])
def forgot_password():
    email=request.json.get('email')
    userfind=collection1.find_one({"email":email})

    if(userfind!=None):
        user=str(userfind["_id"])
        EXPIRATION_TIME = 5 * 60

        payload = {
                'email': email,
                'exp': datetime.utcnow() + timedelta(seconds=EXPIRATION_TIME)
        }
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        text="Reset Password Link"
        msg = Message(text,
                    sender=os.environ.get("MAIL_USERNAME"),
                    recipients=[email])
        msg.body="This link will be only valid for 5 mins http://localhost:3000/resetpassword/"+user+"/"+token
        mail.send(msg)
    else:
        return "User does not exist"
    
    return 'Email sent'

@app.route("/resetpassword",methods=["POST"])
def reset_password():
    id=request.json.get("_id")
    password=request.json.get("password")

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    collection1.find_one_and_update(
            { "_id": ObjectId(id) },
            {"$set": {"password": hash_pass}}
        )
    return "Password updated successfully"


@app.route('/profile')
def profile():


    if 'email' in session:
        document=list(collection1.find({"email":session["email"]}))

    
        json_docs = []
        for doc in document:
            json_doc = {}
            for key, value in doc.items():
                json_doc[key] = str(value)
            json_docs.append(json_doc)
        return {
            "session_email": session['email'],
            "user_details": json_doc
        }
    else:
        document={}
        json_docs=[]
        return {
            "session_email": "",
            "user_details": json_docs
        }


@app.route('/getbooked')
def get_avails():
    docs = list(mongo.db.booked.find())
    # print(docs)

    json_docs = []
    for doc in docs:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)

    return jsonify(json_docs)



@app.route('/book_venue', methods=["POST"])
def book_venue():
    name = request.json.get("name")
    location = request.json.get("location")
    date = request.json.get('date')
    start_time = request.json.get("start_time")
    end_time = request.json.get("end_time")
    booked_by = request.json.get('booked_by')
    owner = request.json.get("owner")

    if 'email' not in session:
        return {
            "message": "No user found"
        }

    docs = mongo.db.booked.find()
    for doc in docs:
        if doc["name"] == name and doc["location"] == location:
            if doc["start_time"] == start_time or doc["start_time"] < start_time < doc["end_time"]:
                if doc["booked_by"] == session["email"]:
                    return{
                        "message": "Already booked. Check mail."
                    }
                else:
                    return {
                        "message": "Not available. Try a different slot."
                    }
            
    try: 
        mongo.db.booked.insert_one({
            "name": name,
            "location": location,
            "date": date,
            "start_time": start_time,
            "end_time": end_time,
            "booked_by": session['email'],
            "owner": owner
        })

    except Exception as e:
        print(e)

    response = {
        "message": "Booking successful"
    }

    return redirect(url_for('send_mail', name=name, location=location, start_time=start_time, end_time=end_time, date=date, bookingtype='venue'))


@app.route('/book_event', methods=['POST'])
def book_event():
    name = request.json.get("name")
    address = request.json.get("address")
    date = request.json.get('date')
    booked_by = request.json.get('booked_by')
    organizer = request.json.get("organizer")
    _id = request.json.get("id")
    starttime = request.json.get("starttime")
    endtime = request.json.get("endtime")
    print("in book_event")

    if 'email' not in session:
        return {
            "message": "No user found"
        }

    docs = mongo.db.booked.find()
    print("agaya hu")
    for doc in docs:
        if "organizer" in doc:
            if doc["name"] == name and doc["address"] == address:
                if doc["date"] == date:
                    if doc["booked_by"] == session["email"]:
                        return{
                            "message": "Already booked. Check mail."
                        }

    try: 
        mongo.db.booked.insert_one({
            "name": name,
            "address": address,
            "date": date,
            "start_time": starttime,
            "booked_by": session['email '],
            "organizer": organizer
        })

        print("DONE")

    except Exception as e:
        print(e)

    response = {
        "message": "Booking successful"
    }

    endtime = " "

    return redirect(url_for('send_mail', name=name, location=address, start_time=starttime, end_time=endtime, date=date, bookingtype='event')), response

@app.route('/send_mail/<name>/<location>/<start_time>/<end_time>/<date>/<bookingtype>')
def send_mail(name, location, start_time, end_time, date, bookingtype):
    name1 = name
    location1 = location
    start = start_time
    end = end_time
    date1 = date
    typeof = bookingtype
    if bookingtype == 'venue':
        print("venue")
        html_content = f'<div> Hello! </div> <div> Here are the details of your booking: </div> </br> <ul> <li> Venue: {name1} </li> <li> Location: {location1} </li> <li> Date: {date1} </li> <li> Time: {start} to {end} </li> </ul>'
        msg = mail.send_message(
            subject='Venue booking confirmation!',
            sender=os.environ.get("MAIL_USERNAME"),
            recipients=[session['email']],
            html=html_content
        )

    elif bookingtype == 'event':
        print("event")
        html_content = f'<div> Hello! </div> <div> Here are the details of your event booking: </div> </br> <ul> <li> Event: {name1} </li> <li> Address: {location1} </li> <li> Date: {date1} </li> <li> Time: {start} </li> </ul>'
        msg = mail.send_message(
            subject='Event booking confirmation!',
            sender=os.environ.get("MAIL_USERNAME"),
            recipients=[session['email']],
            html=html_content
        )
    # mail.send(msg)

    response = {
        "message": "Booking Successful!"
    }
    return response

@app.route('/profile_data')
def profile_data():
    #id=ObjectId(session['_id'])
    find_email=session["email"]
    userfind=collection1.find_one({"email":find_email})
    userfind['_id'] = str(userfind['_id'])


    document2 = [oid for oid in userfind["organized_events"] if oid is not None]

    document=[]
    for oid in document2:
        doc=collection2.find_one({
                "_id":oid
            })
        if(doc is not None):
            doc["_id"] = str(doc["_id"])
            document.append(doc)

    
    document1={}
    document1["_id"]=userfind["_id"]
    document1["firstname"]=userfind["firstname"]
    document1["lastname"]=userfind["lastname"]
    document1["email"]=userfind["email"]
    document1["organized_events"]=document
    if("age" in userfind):
        document1["age"]=userfind["age"]
    if("gender" in userfind):
        document1["gender"]=userfind["gender"]
    if("city" in userfind):
        document1["city"]=userfind["city"]
    if("state" in userfind):
        document1["state"]=userfind["state"]
    if("skill_level" in userfind):
        document1["skill_level"]=userfind["skill_level"]
    if("availability" in userfind):
        document1["availability"]=userfind["availability"]
    if("sports" in userfind):
        document1["sports"]=userfind["sports"]
    
    return jsonify(document1)

@app.route('/update_user_details',methods=["POST"])
def update_user():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    age = request.json.get('age')
    gender = request.json.get('gender')
    city = request.json.get('city')
    state = request.json.get('state')
    skill_level = request.json.get('skill_level')
    availability = request.json.get('availability')
    sports = request.json.get('sports')

    #id=ObjectId(session['_id'])

    document={}

    if(first_name!=None and first_name!="" and first_name.isspace()==False):
        document["firstname"]=first_name

    if(last_name!=None and last_name!="" and last_name.isspace()==False):
        document["lastname"]=last_name

    if(age!=None and age!="" and age.isspace()==False):
        document["age"]=int(age)

    if(gender!=None and gender!="" and gender.isspace()==False):
        document["gender"]=gender

    if(city!=None and city!="" and city.isspace()==False):
        document["city"]=city.lower()

    if(state!=None and state!="" and state.isspace()==False):
        document["state"]=state.lower()

    if(skill_level!=None and skill_level!="" and skill_level.isspace()==False):
        document["skill_level"]=skill_level
    
    if(availability!=None and availability!="" and availability.isspace()==False):
        document["availability"]=availability

    if(sports!=None and sports!="" and len(sports)>0):
        document["sports"]=sports

    collection1.find_one_and_update(
            { "email": session["email"] },
            {"$set": document}
        )

    return "user details updated successfully"


@app.route('/create_events',methods=["POST"])
def create_events():
    name = request.json.get('name')
    event_type = request.json.get("event_type")
    description=request.json.get("description")
    age_range=request.json.get("age_range")
    address=request.json.get("address")
    state=request.json.get("state")
    city=request.json.get("city")
    date=request.json.get("date")
    starttime=request.json.get("start_time")
    endtime=request.json.get("end_time")
    capacity=int(request.json.get("capacity"))
    cost=int(request.json.get("cost"))
    image=request.json.get("image")
    organizer=request.json.get("organizer")
    cost_type="free"
    participants=[]

    if(cost>0):
        cost_type="paid"

    collection2.insert_one({"name":name,
                            "event_type":event_type,
                            "description":description,
                            "age_range":age_range,
                            "address":address,
                            "city":city,
                            "state":state,
                            "date":date,
                            "starttime":starttime,
                            "endtime":endtime,
                            "capacity":capacity,
                            "cost":cost,
                            "organizer":organizer,
                            "event_status":"open",
                            "cost_type":cost_type,
                            "image":image,
                            "participants":participants
                            })
    
    document = collection2.find_one(sort=[('_id', -1)])


    collection1.find_one_and_update(
        {"email": session["email"]},
        {"$push": {"organized_events": ObjectId(document["_id"])}}
        )
    
    return "event created successfully"

@app.route("/cancel_event",methods=["POST"])
def close_event():
    id=ObjectId(request.json.get("eid"))

    collection2.find_one_and_update(
        {"_id":id},
        {"$set":{"event_status":"closed"}}
        )
    
    """"
    mail_users_array=["rajagopalanshiwani@gmail.com","srajago@iu.edu"]
    for email in mail_users_array:
        text=":("+" "+"Event Cancelled"
        url="http://localhost:3000"
        msg = Message(text,
                    sender="evenueproject@gmail.com",
                    recipients=[email])
        msg.body="We're extremely sorry :( this event has been cancelled by the organizer. Please contact the organizer for more details or visit our website"+" "+url+" "+"to book another event or venue"
        mail.send(msg)
    """
    

    result=collection1.update_one(
    {"_id": ObjectId(session["_id"])},
    {"$pull": {"organized_events": {"$eq":id}}}
    )

    if result.modified_count > 0:
        return jsonify({'message': 'Record deleted successfully'}), 200
    
    return jsonify({'message': 'Record not found'}), 404

@app.route('/get_event_details')
def get_event_details():
    id=request.args.get("_id")
    e_id=request.args.get("e_id")

    document=collection2.find_one(
        {'_id': ObjectId(e_id)})
    
    document["_id"]=str(document["_id"])
    return jsonify(document)

@app.route('/print_event_details')
def print_event_details():
    event_ids=request.args.get("event_ids")
    result=[]

    for eid in event_ids:
        document=collection2.find({"_id":ObjectId(eid)})
        result.append(document)
    
    return jsonify(result)

@app.route('/update_event_details',methods=["POST"])
def update_event_details():
    userid=request.json.get("_id")
    e_id=request.json.get("e_id")

    name=request.json.get("name")
    event_type=request.json.get("event_type")
    description=request.json.get("description")
    age_range=request.json.get("age_range")
    address=request.json.get("address")
    location=request.json.get("location")
    date=request.json.get("date")
    start_time=request.json.get("start_time")
    end_time=request.json.get("end_time")
    capacity=request.json.get("capacity")
    image=request.json.get("image")
    cost=request.json.get("cost")

    document1={}

    if(name!=None):
        document1["name"]=name
    
    if(event_type!=None):
        document1["event_type"]=event_type
    
    if(description!=None):
        document1["description"]=description

    if(age_range!=None):
        document1["age_range"]=age_range
    
    if(address!=None):
        document1["address"]=address

    if(location!=None):
        document1["location"]=location

    if(date!=None):
        document1["date"]=date
    
    if(start_time!=None):
        document1["starttime"]=start_time
    
    if(end_time!=None):
        document1["endtime"]=end_time
    
    if(capacity!=None):
        document1["capacity"]=capacity
    
    if(image!=None):
        document1["image"]=image

    if(cost!=None):
        document1["cost"]=cost

    collection2.find_one_and_update(
       {"_id":ObjectId(e_id)},
        {'$set':document1}
    )

    

    return "update was successful"

@app.route("/chat_authentication")
def get_chats():
    return jsonify({"email":session["email"],"password":os.environ.get("USER_SECRET")})

@app.route("/after_book_event",methods=["POST"])
def after_book_event():
    eid=request.json.get("eid")
    user_email=request.json.get("email")
    
    result = collection2.find_one({'_id': ObjectId(eid)})
    length = len(result['participants'])

    
    if(length+1==int(result['capacity'])):
        collection2.update_one(
    {'_id': ObjectId(eid)},
    {'$set': {'event_status': 'closed'}, '$push': {'participants': user_email}},
    upsert=False
    )

    elif(length+1<int(result['capacity'])):
        collection2.update_one(
            {'_id': ObjectId(eid)},
            {'$push': {'participants': user_email}},
            upsert=False
        )
    return jsonify({"message":"success"})

@app.route("/get_participants")
def get_participants():
    eid = request.args.get("eid")
    document = collection2.find_one({"_id": ObjectId(eid)})
    participants = document["participants"]
    return jsonify(participants)
    
    
    


if __name__ == '__name__':
    #app.run(debug = True)
    app.run(host="0.0.0.0",port=8080,debug=True)
