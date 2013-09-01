App = Ember.Application.create();
App.UsersRESTAdapter = DS.RESTAdapter.extend({
    url: "http://localhost:3000",
    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
    })
});

App.Store = DS.Store.extend({
  adapter: App.UsersRESTAdapter
});

App.Router.map(function() {
  this.resource("users", function(){
    this.resource("user", {path: ":_id"});
    this.route("add");
  });
});

App.User = DS.Model.extend({
  email: DS.attr("string"),
  password: DS.attr("string"),
  created_at: DS.attr("date"),
  login_attempts: DS.attr("number")
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    return App.User.find();
  },
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.find(params._id);
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
