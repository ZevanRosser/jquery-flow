window.NoteApp = $.flow.app();


$(NoteApp.init = function(){
  
  $.flow.show(true, "json/docs.json");

  var dataLoader = new NoteApp.DataLoader("json/copy.json");
  
  
  
  
  NoteApp.Views = function(){
    
  };
  
  NoteApp.NoteView = function(){
    
  };
  
  NoteApp.FormView = function(){
    
  };
  
});

(function(){
  
  NoteApp(function DataLoader(url){
    var f = $.flow(this)
             .flow("getJSON", url, this.onDataLoaded);
 
    
  });
  
  NoteApp.DataLoader.prototype.onDataLoaded = function(data){
    console.log(data, this);
  }; 
  
})();



