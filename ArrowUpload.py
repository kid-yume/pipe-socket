import requests
import json
#solidify the urls here 
url = 'https://api.cloud.appcelerator.com/v1/users/login.json?key=2z3eJoxl6dkzfWOPxoRgiw8SXC3ko0II&pretty_json=true'
postUrl = 'https://api.cloud.appcelerator.com/v1/objects/cars/create.json?key=2z3eJoxl6dkzfWOPxoRgiw8SXC3ko0II&pretty_json=true'
#Once done we are now creating the login form needed to login into the app as a user
files = {'login':'bob@hotmail.com', 'password':'testing123'}
files2 = {'login': (None, 'bob@hotmail.com'), 'password': (None, 'testing123')}
cookieR = requests.post(url,files=files2)
print(cookieR.text)
print(cookieR.status_code)
print(cookieR.cookies)
#Once logged in all the info is printed, haven't put a catch error
#Now apply sample JSON data
fields = {
    'make': 'nissan',
   "color": "blue",
  "year": 2005,
  "purchased_at": "2011-11-02 17:07:37 -0700",
  "used": "false"
}
jsonData = { 
'fields': json.dumps(fields)

}
#pRequest = requests.post(postUrl,cookies=cookieR.cookies,json=jsonData)
pRequest = requests.post(postUrl,cookies=cookieR.cookies,data=jsonData)
pRequest.json()
print(pRequest.json())