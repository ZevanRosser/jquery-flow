window.NoteApp = $.flow.app();


$(NoteApp.init = function(){
  
  $.flow.show(true, "json/docs.json");
  
  NoteApp.body = $("body");
  
  NoteApp.mainViewTemplate = Mustache.compile($("#main-view").html());
  NoteApp.formViewTemplate = Mustache.compile($("#form-view").html());
  NoteApp.noteViewTemplate = Mustache.compile($("#note-view").html());

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
    
    
  });
 
  NoteApp.MainView.prototype.onDataLoaded = function(e, data){
    NoteApp.body.append(NoteApp.mainViewTemplate(data.copy));
  };
  
  NoteApp(function FormView(){
    $.flow(this)
     .receive("DataLoaded", this.onDataLoaded);
    
    this.el;
     
  });
  
  NoteApp.FormView.prototype.onDataLoaded = function(e, data){
    this.el = NoteApp.body.append(NoteApp.formViewTemplate(data.copy));
    this.notes = this.el.find(".notes");
    this.init();
  }; 
  NoteApp.FormView.prototype.init = function(){
    //this.el.find(".form").
  };
  
  
  NoteApp(function NoteView(data){
    this.el = NoteApp.noteViewTemplate(data);
  });
  
 
  
  
  
})();



