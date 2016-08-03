pipe-socket
======

###Titanium SDK5+ Websocket  
####Built with 5.2.2.GA
IOS Module that enables Websocket communication with remote servers, allowing "Real-Time" Communication between devices. If you want to see how this works the video is available here:

<a href="https://www.youtube.com/watch?v=TcZ_qSrfK1k" target="_blank"><img src="https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/20/08/57974cd0e46da10a78009a4b/final_original.jpg" 
alt="IMAGE ALT TEXT HERE" width="600" height="350" border="10" /></a>


###Pusher Integration
"pipe-socket" utilizes a Pusher based "Real-Time" Management System. In this System we will devices will send messages to all other devices connected on a specific "channel". Pusher made it mandatory that the private channels implement some type of encyption/authentication over the communication.  

###Amazon/Zapier Webhook Integration 
Now Real-Time Communication is fun but what happens when you want to log all the communication that is being had over the channels(including objects,photos,etc, etc). With Pusher, setting a webhook url will also  forward data  as a "POST" request to a assigned location.  

In "pipe-socket" we use Amazon webhook services to set up a "webhook" and create an URL that accepts 'POST' request and forwards the data to our APPCELERATOR ARROW  Servers with the usage of Python requests. 

##Why did i make this? 

"pipe-socket" was encouraged when i was in the need for Real-Time Notifications while building an inventory system.   So i had to do some homework and understand what it was excatly happening and i kinda created a miniature Static Socket Rocket Library(based off Facebooks Socket Rocket Library) and imported it into this module and just used that to create the same effect, then using the documentation from Pusher I was able to fine tune it to make it "Module" Friendly for lack of a better words!


##Installation 
Git-cloning the repository, unzip the `com.bottomfeeders.websocket-1.0.0.zip` package and put in your module folder `usesr/[profilename]/Application Support/Titanium/modules/iphone/` to make globally accessible or just use Appcelerators "Install Mobile Module" option. After opening Appcelerator go to `Help---->Install Mobile Module` Then select the Zip and your good to go! 



##Usage
###1.Accessing Websocket
To access this module from JavaScript, you would do the following:
```javascript
var WS = require("com.bottomfeeders.websocket");
```
The `WS` variable is a reference to the Module object.

###2.Accessing the Module
To access this module from JavaScript, you would do the following:
```javascript
var WS = require("com.bottomfeeders.websocket");
```
The `WS` variable is a reference to the Module object, while `WSVIEW` becomes a proxy object that you will perform methods and add EventListeners to recieve incoming data. 

###2.Connecting to Pusher Services 
For the sake of this project I used Pusher for purposes of this demonstration on connecting to a remote server with a URL. However, any URL of your choice can be used here.
**YOU** must go on to Pusher and create an account in order to get your APP KEYS (APP KEY, SECRETE KEY, AND APP ID )
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
    WS.startConnection(url);
var WSView = WS.createView({top:0,left:0,width:0,height:0});
```
####Side Note!
There was an issue in Titaniums Proxy Object and I believe i found it had something to do, with hows views are handled and the communication between the module and actual native side. Therefore In order to get listeners working I had to create a View and View proxy. **For More information on this just send me a message**

###3.Receiving Successful and Error Events when establishing a Connection 
Once Connected typically a server will send a response letting you know if the connection was successfull or not. We can listen for this through the `"connected"` and `"error"` . Once recieved you are able to store the SocketID you recieve like so upon a successful connection or display the error message recieved.

##Sucessful  & Error Events
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var defaults = {
		"channel1":channel1Events,
		"channel2":channel2Events,
	};
    WSView.startConnection(url);
    WSView.subscribeToChannels(defaults);
    
   WSView.addEventListener('connected',function(e){
		//authentication string is socketID:channelName<--hmac signature of this
		if(e.data != null){
			Ti.API.info('got message and  Pusher Connected with info:'+ e.data);
			response = JSON.parse(e.data);
			var rd = JSON.parse(response.data);
			socketID = parseFloat(rd.socket_id);
		Ti.API.info('your Socket ID is as follows:'+ socketID);
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
	
	WSView.addEventListener('error',function(e){
		if(e.data != null){
			
			Ti.API.info('connection failed with info:'+ e);
			
		}else{
			
			Ti.API.info("doesnt exist dude");
		}
		
	});
```

###3.Subscribing to Channels through Pusher
There are two types of Channels through Pusher. Public and Private. However, The challenge seen here becomes that through there public channels devices can only recieve events and cannot send events through the websockets. I will show how to add public Channels, **but** in order to send events through the websocket you must join a `Private` Channel! Otherwise you will have to submit POST request via the API in order to fire an event from the phone.

####Connecting To Public Channels **.subscribeToChannels([channel Names])**
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var defaults = {
		"channel1":channel1Events,
		"channel2":channel2Events,
	};
    WSView.startConnection(url);
    WSView.subscribeToChannels(defaults);
```


####Connecting To Private Channels **.subscribeToPrivateChannel({auth:[signature],channel:[channelName]})**
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var channel = "private-channel1";
    WSView.startConnection(url);
   	encThis  = socketID+":"+channel;
			
			var signature = HMACSHA256(encThis,'899df492f106b93059f8');
			Ti.API.info("encoding....."+ encThis+"with sig "+signature);
			signature = pKey2 +":"+signature;
			WSView.subscribeToPrivateChannel({"auth":signature+"","channel":channel+""});
		
```
#####Side NOTE:
 PLEASE do Private Channels one channel at a time. IF yopu have multiple channels you would like to do create an array and loop through the array of channels. Sadly for version 1 it does not support bulk subscription for the private channels like the public channels. Also another thing we should cover is that authentication for Private channels are normally done through a remote server of your choosing. Typically you would send the SocketID you required from a successful connection and send that to a server that would give you your signature or I like to think of it as your password in order for you to successfully join the channel. For the purpose of this example it was quicker to just perform the signing of the Signature with a `HMAC256HEX` of `SocketID:(Name of the Channel)`. 

##3.Receiving Successful and Error Events when connecting to Channels
When Connecting to a channel, typically a server will send a response letting you know if the connection was successfull or not. We can listen for this through the `"channelSubscriptionSuccess"` and `"channelSubscriptionError"` . Once recieved you are able to store the SocketID you recieve like so upon a successful connection or display the error message recieved.

```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var defaults = {
		"channel1":channel1Events,
		"channel2":channel2Events,
	};
    WSView.startConnection(url);
    WSView.subscribeToChannels(defaults);
    
    WSView.addEventListener('channelSubscriptionSuccess',function(e){
		if(e.data != null){
			Ti.API.info('got message and  Pusher Connected with info:'+ e.data);
			response = JSON.parse(e.data);
			var sd = JSON.parse(response.data);
			//do what you want with JSON DAta here not too much information included
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
	
	WSView.addEventListener('channelSubscriptionError',function(e){
		if(e.data != null){
			
			Ti.API.info('got message and failed with info:'+ e);
			
		}else{
			
			Ti.API.info("doesnt exist dude");
		}
		
	});
    
    
    
```

###3.Listening and receiving Channel Events once you have successfully Subscribed
Once you are connected to a channel, whenever the module receives any incoming data from the server it will send it will fire an event based on the channel the message is from. For example since we named our `Private` channel `private-channel1`, the event listener we will have to add will be named the same thing. 

```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var channel = "private-channel1";
    WSView.startConnection(url);
   	encThis  = socketID+":"+channel;
			
			var signature = HMACSHA256(encThis,'[APP SECRET KEY]');
			Ti.API.info("encoding....."+ encThis+"with sig "+signature);
			signature = pKey2 +":"+signature;
			WSView.subscribeToPrivateChannel({"auth":signature+"","channel":channel+""});
		
		   WSView.addEventListener('private-channel1',function(e){
		if(e.data != null){
			Ti.API.info('got message news'+ e.data);
			var messOb = JSON.parse(e.data);
			var messOb2 = JSON.parse(messOb.data);
			var messOb3 = messOb2.data;
			Ti.API.info('got message news'+ messOb3;
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
		
		
		
```

###3.Sending events trhough private channels - **`.sendMessage({object})`**
The Sending of events through private channels is quite simple and done through the `.sendMessage()`. This method has the ability to take in an object. To send a pusher message your object must contain a `channel`, `event`, and `data` paramter. (also remeber that Pusher only allows the sending data over the WebSocket on Private channels) 

####Side Note
This must done on two devices or you must have the Pusher Management Console opened to verify the Message was dispersed over the channel, for messages do not get "echoed" back to the receiver, and vice-versa you can send test data from Pusher to verify your phone is receiving events! ^_^

```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
var channel = "private-channel1";
    WSView.startConnection(url);
   	encThis  = socketID+":"+channel;
			
			var signature = HMACSHA256(encThis,'[APP SECRET KEY]');
			Ti.API.info("encoding....."+ encThis+"with sig "+signature);
			signature = pKey2 +":"+signature;
			WSView.subscribeToPrivateChannel({"auth":signature+"","channel":channel+""});
		
		   WSView.addEventListener('private-channel1',function(e){
		if(e.data != null){
			Ti.API.info('got message news'+ e.data);
			var messOb = JSON.parse(e.data);
			var messOb2 = JSON.parse(messOb.data);
			var messOb3 = messOb2.data;
			Ti.API.info('got message news'+ messOb3;
			var sendingMsg = {'fName':'SimulatorTest','message':('This a test Messsage')};
			WSView.sendMessage({"channel":"private-channel1","event":"client-NewsFeed","data":sendingMsg});
		
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
		
		
		
```

##What About logging??!!
So the issue that comes into play when playing with Real time Notifications is how do we store data, so that we may review or display History? Typically one would Post a request to a server that Would process the request, store to database, and forward the request on to Pusher to disperse to the connected devices. If you decide to use Pusher I suggest using their "Webhook URL"  feature that will also forward incoming events to a URL you input. For this project I used a Amazon Webhook. 


<img src="https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/cd/df/57999f96183041092c28c849/Screen%20Shot%202016-07-28%20at%201.59.32%20AM_original.png" 
alt="Pusher URL" width="100%" height="180" border="10" />
[alt text][logo]
[logo]:https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/cd/df/57999f96183041092c28c849/Screen%20Shot%202016-07-28%20at%201.59.32%20AM_original.png

###Amazon WebHook Overview
I will provide PDF with more Amazon Webhook Information. But to quickly go do a Overwview I used the `postData.py` script on my webhook to take in data from the Pusher requests and forward it to the **APPCELERATOR ARROWCLOUD DATABASE** To create your own webhook refer to
amazon site [here](https://zapier.com/zapbook/amazon-s3/webhook/).




#Dont Forget, Please Support Bottom Feeders![alt text][logo]
[logo]:https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/69/3e/5796c632df26e0092710df29/GIThub_original.jpg
If you like it Share, Support! This is kinda our first public posting, so let us know what you guys think. Im starting a Bottom-Feeder movement, where around the clock support for fellow developers, will be available at any time to assist others with projects they have. I sometimes have found it difficult to reach out and get support when i need it, so Im striving to eliminate the feeling for fellow developers. if your an experienced developer and wish to become a Captain to aid in supporting others, please do not hesitate to contact me! ^_^ 
We also Started a shirt Campaign to help raise some funds to aid in some start-up costs were facing and you can purchase a shirt [here](https://booster.com/bottom-feeders) and become a official Bottom Feeder! :) 

##Relase Skeleton with succcess of Shirt Campaign
IF we can succeed our goal with getting Shirts sold we will make a how-to along with the skeleton of this module so that you may even tailor it to another servers specifications for your own personal use! ^_^
