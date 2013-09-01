App = Ember.Application.create();

App.Router.map(function() {
  this.resource("users", function(){
    this.resource("user", {path: ":_id"});
  });
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    // getJSON returns a promise
    return $.getJSON("http://localhost:3000/users").then(function(data){
      return data.map(function(user){
        user.id = user._id;
        return user;
      });
    });
  },
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    var url = "http://localhost:3000/users?_id="+params._id;
    return $.getJSON(url).then(function(data){
      if( data.length ){
        var user = data[0];
        user.id = user._id;
        return user;
      }
    });
  }
});

App.UserController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    toggleEdit: function(){
      this.set("isEditing", !this.isEditing);
    },
    save: function(){
      this.set("isEditing", false);
    }
  }
});

Ember.Handlebars.helper("format-date", function(date){
  return moment(date).format('YYYY-MM-DD, HH:mm:ss');
});
