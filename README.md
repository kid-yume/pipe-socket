pipe-socket
======

###Titanium SDK5+ Websocket  

IOS Module that enables Websocket communication with remote servers, allowing "Real-Time" Communication between devices. 


###Pusher Integration
"pipe-socket" utilizes a Pusher based "Real-Time" Management System. In this System we will devices will send messages to all other devices connected on a specific "channel". Pusher made it mandatory that the private channels implement some type of encyption/authentication over the communication.  

###Amazon/Zapier Webhook Integration 
Now Real-Time Communication is fun but what happens when you want to log all the communication that is being had over the channels(including objects,photos,etc, etc). With Pusher, setting a webhook url will also  forward data  as a "POST" request to a assigned location.  

In "pipe-socket" we use Amazon webhook services to set up a "webhook" and create an URL that accepts 'POST' request and forwards the data to our APPCELERATOR ARROW  Servers with the usage of Python requests. 

##Why did i make this? 

"pipe-socket" was encouraged from the Twis module however it was not 64-bit Compatible. So i had to do some homework and understand what it was excatly happening and i kinda created a miniature Static Socket Rocket Library(based off Facebooks Socket Rocket Library) and imported it into the module and just used that to create the same effect, then using the documentation from Pusher I was able to fine tune it to make it "Module" Friendly for lack of a better words!


Support Bottom Feeders 
                        ![alt text][logo]
[logo]:https://s3-us-west-1.amazonaws.com/storage-platform.cloud.appcelerator.com/pUWKoLkaVjoozttRq2KmEKV96SDzeidL/photos/aa/09/5796c4b32dcaff0920115119/GIThub_original.jpg
If you like it Share, Support! This is kinda my first public posting, so let me know what you think. Im starting a bottom-feeder movement as well kind of thing. Its my own Comapny I started encouraging Software Development for the masses. So please purchase a shirt and support! Become a Bottom-Feeder today!  ^_^
