function ExampleView() {	
	var MPHeight =  Ti.Platform.displayCaps.platformHeight;
	
	var exViewContainer = Ti.UI.createView({
		width:'100%',
		height:'100%',
		backgroundColor:'#FFF',
		//
	});
	
	
	var shoutScreenGrad = Titanium.UI.createView({
		width:'100%',
		height:'60%',
        top:0,
		 backgroundGradient: {
        type: 'linear',
        startPoint: { x: '0%', y: '0%' },
        endPoint: { x: '0%', y: '100%' },
        colors: [{ color: '#fff', offset: 0.0 },{ color: '#00FFFFFF', offset: 1.0} ],
   },
   opacity:1,
   backgroundColor:'transparent',
   touchEnabled: false,
	
	});
	
	
	
	
	
	var Channelnamefield = Ti.UI.createTextField({
		  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		  font:{fontSize:26},
		  hintText:'Channel Name',
		  backgroundColor:'transparent',
		  top:'60%',
		  color: '#999999',
		  height: '8.46%',
		  width:'73.665%',
		});	
	
	
	
	
	var textArea = Ti.UI.createTextArea({
		  color: '#000',
		  font: {fontSize:25, fontWeight:'bold'},
		  keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		  returnKeyType: Ti.UI.RETURNKEY_GO,
		  textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		  value: 'Please Connect Websocket to begin..',
		  top: '7%',
		  width:'100%', height :'40%'
		});

	textArea.add(shoutScreenGrad);

	var connectButton = Ti.UI.createView({
				width:'30.73%',
				height:'7.25%',
				backgroundColor:'#46abe0',
				top:'50%',
				left:'2.5%'
				
			});
			
			
			var connectLabel = Ti.UI.createLabel({
				text:'CONNECT',
				width:'62.35%',
				height:'49.93%',
				color:'#FFF',
				font:{fontSize:15},
				textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				backgroundColor:'transparent',
				
			});
			
	var createChannel = Ti.UI.createView({
				width:'30.73%',
				height:'7.25%',
				backgroundColor:'#d7d9d8',
				top:'50%',
				right:'2.5%'
				
			});
			
			
			var channelLabel = Ti.UI.createLabel({
				text:'CREATE CH.',
				width:'80.35%',
				height:'49.93%',
				color:'#FFF',
				font:{fontSize:15},
		  textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				backgroundColor:'transparent',
				
				
			});		
	
	
	createChannel.add(channelLabel);
	
	connectButton.add(connectLabel);
	
	
	exViewContainer.add(textArea);
	exViewContainer.add(connectButton);
	exViewContainer.add(createChannel);
	exViewContainer.add(Channelnamefield);
	
	
	
	
	createChannel.addEventListener('click',function(e){
		if(createChannel.backgroundColor == '#46abe0'){
			
			if(Channelnamefield.value != ''){
				
				var lowerCase = ((Channelnamefield.value).toLowerCase()+"");
				Ti.API.info(lowerCase);
				if((lowerCase.indexOf('private-')) != -1){
					exViewContainer.addChannelEventListener(lowerCase);
					exViewContainer.subscribeToPrivateChannel(lowerCase);
				}else{
					if(channelLabel.text == 'Send'){
						exViewContainer.sendTestMessage(lowerCase);
					}else{
								alert('for the purpose of this app please create a private channel, public channels do not allow you to send messages via the websocket with PUSHER! ^_^');

					}
					
					
							}
				
			}else{
				alert('please give your channel a name!');
			}
			
			
		}else{
			alert('please connect to valid websocket url please! ^_^');
		}
		
	});
	
	
	connectButton.addEventListener('click',function(e){
		updateLog("Opening Socket");
		exViewContainer.startConnection();
		
	});
	
	/*
	
	testMButton.addEventListener('click',function(e){
	
	  Ti.API.info("testing Message");
	  var test2 = WSView.subscribeToChannels(defaults);
	 // var testMessage = WSView.SendTestMessage(TestMessage);
	 // var testMessage2 = WSView.AnalyzeMe(TestMessage);
	 //  Ti.API.info(testMessage.data);
	
	});
	
	testButton.addEventListener('click',function(e){
	
	  Ti.API.info("testing"+ uri);
	  if(hit == 0){
	  	var test = WSView.startConnection(uri);
	  	hit++;
	  }else{
	  	var testMessage = WSView.SendTestMessage(TestMessage);
	  	
	  }
	 // WS.example(defaults);
	  
	  Ti.API.info(test);
	  
	//Ti.API.info(test2);
	
	
	
	});
	*/
	exViewContainer.addEventListener('postlayout',function(e){
		//e.source.setBorderRadius(e.source.rect.height/2);
		//Ti.API.info(signupButton.rect.x +' y:'+signupButton.rect.y);
		connectButton.setBorderRadius(connectButton.rect.height*.0563);
		createChannel.setBorderRadius(createChannel.rect.height*.0563);
	});
	
	exViewContainer.enableCreateButton = function(e){
		createChannel.backgroundColor = '#46abe0';
		
	};
	
	exViewContainer.updateLogNo = function(e){
		
		var newText3 = textArea.value;
	
			newText3+=('\n'+e);
			textArea.value = newText3;
	};
	
	exViewContainer.updateLog = function(e){
		
		var newText2 = textArea.value;
	
			newText2+=('\n****'+e+'*******');
			textArea.value = newText2;
	};
	
	exViewContainer.connectionError = function(e){
		createChannel.backgroundColor = '#d7d9d8';
		alert("error please refer to the log for more info and try to connect to the channel again!! ");
	};
	
	exViewContainer.changeButtonAndLabel = function(e){
		channelLabel.text = 'Send';
		channelLabel.textAlign =  Titanium.UI.TEXT_ALIGNMENT_CENTER;
		Channelnamefield.hintText = 'Send Test Message';
		Channelnamefield.value = '';
	};
	
	function updateLog(x){
		
		var newText = textArea.value;
		
			newText+=('\n****'+x+'*******');
			textArea.value = newText;
		
		
		
		
		
	}
	return exViewContainer;
}

module.exports = ExampleView;