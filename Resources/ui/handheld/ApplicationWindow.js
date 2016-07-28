//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var Cloud = require('ti.cloud');
	var POP = require("guy.mcdooooo.tipop");
	
	
	/*
	 * Views 
	 * 
	 */
	var WS = require('com.bottomfeeders.websocket');
	var HMACSHA256= require('ui/common/hmac-sha256');
	//var shaD = HMACSHA256(encThis,'899df492f106b93059f8');
	var WSView = WS.createView({top:0,left:0,width:0,height:0});
	var pKey2 = "80a8ae7243383c3a15dc";
	var uri = 'wss://wss.pusherapp.com:443/app/'+pKey2+'?client=js&version=3.1&protocol=5';
	var ExampleView = require('ui/common/iphone/ExamplesView');
//	var MainView = require('ui/common/iPhone/MainScreen/MainPage');
	
	var hit = 0;
	var TestMessage = {
		"message":"yo yo yo ",
		"from":"Aaron Downing",
	};
	var socketData;
	var response;
	var signature;
	var socketID;
	var encThis;
	var Selection; 
	
	var encThis;
	var Selection; 
	//construsct UI
	var exView = new ExampleView();
	//var mainView = new MainView();
	
	
	
	var self = Ti.UI.createWindow({
		//backgroundColor:'#E6E7E8',
		height:'100%',
		width:'100%',
		statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
	});
	
	exView.startConnection = function(e){
		WSView.startConnection(uri);
		
	};
	
	exView.subscribeToPrivateChannel = function(channel){
			encThis  = socketID+":"+channel;
			
			var signature = HMACSHA256(encThis,'899df492f106b93059f8');
			Ti.API.info("encoding....."+ encThis+"with sig "+signature);
			signature = pKey2 +":"+signature;
			 WSView.subscribeToPrivateChannel({"auth":signature+"","channel":channel+""});
		
		
	};
	
	
	exView.sendTestMessage = function(e) {
		var sendingNsg = {'fName':'SimulatorTest','message':(e+'')};
		WSView.sendMessage({"channel":"private-channel1","event":"client-NewsFeed","data":sendingNsg});
		
	};
	
	
	exView.addChannelEventListener = function(cName){
		
		Ti.API.info('channel name will be '+cName);
	WSView.addEventListener(cName,function(e){
		if(e.data != null){
			//mainScreen.newMessage({name:e.data.name,content:e.data.message,time:"WIP....",likes:0});
			Ti.API.info('got message news'+ e.data);
			var messOb = JSON.parse(e.data);
			var messOb2 = JSON.parse(messOb.data);
			var messOb3 = messOb2.data;
			exView.updateLog("Incoming Message!");
			exView.updateLogNo(JSON.stringify(messOb3));
			
			//mainView.newMessage({name:messOb3.fName,time:"seconds ago",content:messOb3.message,likes:0});
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
	
	};
	
	WSView.addEventListener('open',function(e){
		Ti.API.info('Connected');
		//var sendME = WSView.send("uri");
	});
	
	WSView.addEventListener('connected',function(e){
		//authentication string is socketID:channelName<--hmac signature of this
		if(e.data != null){
			Ti.API.info('got message and  Pusher Connected with info:'+ e.data);
			response = JSON.parse(e.data);
			var rd = JSON.parse(response.data);
			socketID = parseFloat(rd.socket_id);
			exView.updateLog("Socket OPENED!");
			exView.updateLog("Socket INFO!:");
			exView.updateLogNo("SocketID = "+socketID);
			exView.updateLogNo("Please join a channel now....");
			exView.enableCreateButton();
			//Ti.API.info(privateDefaults.auth);
			//parseFloat()
			
			
			
		
		}else{
			Ti.API.info("doesnt exist dude");
		}
		
	});
	
	WSView.addEventListener('channelSubscriptionSuccess',function(e){
		if(e.data != null){
			Ti.API.info('got message and  Pusher Connected with info:'+ e.data);
			response = JSON.parse(e.data);
			var sd = JSON.parse(response.data);
			exView.updateLog("Channel JOINED!:");
			exView.updateLogNo(e.data);
			exView.changeButtonAndLabel();
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
	
	

	
	self.add(exView);
   self.add(WSView);
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
