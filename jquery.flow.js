/*

jquery.flow...

*/

(function($){
  
  var ctx = this,
      doc = $(document), 
      show = false,
      fullLog = "",
      docs,
      bar = "====================================",
      
      flow = $.flow = function(context){
        
        ctx = context;
        flow.log("registered " + currContext());
        
        return flow;
      };
  
  function currContext(){
    return flow.getObjectName(ctx);
  };
  
  flow.getObjectName = function(context){
    var objectName = context.constructor.toString().match(/function (.*?)\(/);
    return (objectName.length > 1) ? "\"" + objectName[1] + "\"" : "Unknown Sender : " + objectName;
    
  };
  
  
  flow.show = function(mode, documentation){
    show = mode;
    
    flow.log(bar, true)
      .log("Begin Flow Session : " + new Date(), true)
      .log(bar, true);
    
    if (documentation && mode){
      $.getJSON(documentation, function(data){
        docs = data;
        flow.log("docs loaded");
      });
    }
    
    return flow;
  };
  
  flow.logDocs = function(){
    
    var checkDocsLoaded = setInterval(function(){
      if (docs){
        console.log(bar);
        console.log(docs.title);
        console.log(bar);
        for (var i in docs.flowEvents){
          console.log(i , ":", docs.flowEvents[i]);
        }
        clearInterval(checkDocsLoaded);
        console.log(bar);
      }
    }, 100);
    
  };
  
  flow.log = function(message, noLabel){
    var label = "Flow : ";
    if (noLabel) label = "";
    if (!show) return;
      console.log(label + message);
    
    fullLog += label + message + "\n";
    return flow;
  };
  
  flow.fullLog = function(){
    return fullLog; 
  };
  
  
  flow.send = function(name, data){
    flow.log(currContext() + " sent event \"" + name + "\"");
    $.event.trigger(name, data);
    return flow;
  };
  
  flow.received = function(e){
    flow.log(flow.getObjectName(this) + " recieved \"" + e.type  + "\"");
    return flow;
  };
  
  flow.receivedOnce = function(e){
    flow.log(flow.getObjectName(this) + " recieved one time event : \"" + e.type + "\"");
    return flow;
  };
  
  flow.once = function(name, method){
    
    doc.one(name, $.proxy(method, ctx));
    doc.one(name, $.proxy(flow.receivedOnce, ctx));
    return flow;
  };
  
  flow.receive = function(name, method){
    
    doc.on(name, $.proxy(flow.received, ctx));
    doc.on(name, $.proxy(method, ctx));
    return flow;
    
  };
  
  flow.unreceive = function(name, method){
    console.log("hi");
    if (!method){
      doc.off(name); 
    }else{
      doc.off(name, method); 
      doc.off(name, flow.received);
    }
    flow.log("unrecieve called... results:")
      .log(" - stop recieving \"" + name  + "\"");
    return flow;
  };
  
  $.fn.unreceive = function(name){
    this.trigger.apply(this, arguments);
    flow.log("unrecieve called... results:")
      .log(" - stop recieving \"" + name  + "\"");
  };
  
  $.fn.once = function(name, method, data){
    
    if (!data) data = {};
    this.one(name, $.proxy(flow.receivedOnce, ctx));
    this.one(name, $.proxy(method, ctx));
    
    return this;
  };
  
  $.fn.recieve = function(name, method, data){
    if (!data) data = {};
    this.on(name, $.proxy(method, ctx, data));
    return this;
  };
 
})(jQuery);