pipe-socket
======

###Titanium SDK5+ Websocket  
####Built with 5.2.2.GA
IOS Module that enables Websocket communication with remote servers, allowing "Real-Time" Communication between devices. 


###Pusher Integration
"pipe-socket" utilizes a Pusher based "Real-Time" Management System. In this System we will devices will send messages to all other devices connected on a specific "channel". Pusher made it mandatory that the private channels implement some type of encyption/authentication over the communication.  

###Amazon/Zapier Webhook Integration 
Now Real-Time Communication is fun but what happens when you want to log all the communication that is being had over the channels(including objects,photos,etc, etc). With Pusher, setting a webhook url will also  forward data  as a "POST" request to a assigned location.  

In "pipe-socket" we use Amazon webhook services to set up a "webhook" and create an URL that accepts 'POST' request and forwards the data to our APPCELERATOR ARROW  Servers with the usage of Python requests. 

##Why did i make this? 

"pipe-socket" was encouraged from the Twis module however it was not 64-bit Compatible. So i had to do some homework and understand what it was excatly happening and i kinda created a miniature Static Socket Rocket Library(based off Facebooks Socket Rocket Library) and imported it into the module and just used that to create the same effect, then using the documentation from Pusher I was able to fine tune it to make it "Module" Friendly for lack of a better words!


#Dont Forget Please Support Bottom Feeders! ^_^ ![alt text][logo]
[logo]:https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/69/3e/5796c632df26e0092710df29/GIThub_original.jpg
If you like it Share, Support! This is kinda my first public posting, so let me know what you think. Im starting a bottom-feeder movement as well kind of thing. Its my own Comapny I started encouraging Software Development for the masses. So please purchase a shirt and support here! Become a Bottom-Feeder today!  ^_^

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
The `WS` variable is a reference to the Module object.

###2.Connecting to Pusher Services 
For the sake of this project I used Pusher for purposes of this demonstration on connecting to a remote server with a URL. However, any URL of your choice can be used here.
**YOU** must go on to Pusher and create an account in order to get your APP KEYS (APP KEY, SECRETE KEY, AND APP ID )
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
    WS.startConnection(url);
```

###3.Subscribing to Channels through Pusher
There are two types of Channels through Pusher. Public and Private. Through Pusher
```javascript
var WS = require("com.bottomfeeders.websocket");
var url = 'wss://wss.pusherapp.com:443/app/'+APP_KEY+'?client=js&version=3.1&protocol=5';
    WS.startConnection(url);
```
