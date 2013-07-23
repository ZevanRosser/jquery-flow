window.NoteApp = $.flow.app();


$(NoteApp.init = function(){
  
  $.flow.show(true, "json/docs.json");
  
  NoteApp.body = $("body");

  var dataLoader = new NoteApp.DataLoader("json/copy.json"), 
      mainView = new NoteApp.MainView(),
      formView = new NoteApp.FormView();
  
});

(function(){
  
  NoteApp(function DataLoader(url){
    $.flow(this)
     .flow("getJSON", url, this.onDataLoaded);
 
    
  });
  
  NoteApp.DataLoader.prototype.onDataLoaded = function(data){
    $.flow.send("DataLoaded", {copy:data});
  }; 

  NoteApp(function MainView(){
    $.flow(this)
     .receive("DataLoaded", this.onDataLoaded);
    
    this.tmpl = Mustache.compile($("#main-view").html());
  });
 
  NoteApp.MainView.prototype.onDataLoaded = function(e, data){
    NoteApp.body.append(this.tmpl(data.copy));
  };
  
  NoteApp(function FormView(){
    $.flow(this)
     .receive("DataLoaded", this.onDataLoaded);
    this.tmpl = Mustache.compile($("#form-view").html());
  });
  
  NoteApp.FormView.prototype.onDataLoaded = function(e, data){
    NoteApp.body.append(this.tmpl(data.copy));
  }; 
  
  
  NoteApp(function NoteView(){
    
  });
  
 
  
  
  
})();



