App = Ember.Application.create();

App.Router.map(function() {
  this.resource("users", function(){
    this.resource("user", {path: ":_id"});
  });
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    var users = App.User.find();
    return users;
  },
});


App.User = DS.Model.extend({
  email: DS.attr("string"),
  password: DS.attr("string"),
  created_at: DS.attr("string")
});

DS.RESTAdapter.map('App.User', {
  primaryKey: "_id"
});

App.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.create({
    url: "http://localhost:3000"
  })
});


App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.find(params._id);
  }
});

App.UsersController = Ember.ArrayController.extend({
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
