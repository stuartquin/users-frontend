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
    this.resource("user", {path: ":_id"}, function(){
      this.route("edit");
    });
    this.route("new");
  });
});

App.User = DS.Model.extend({
  email: DS.attr("string"),
  name: DS.attr("string"),
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

/**
 * 'New User' Route, says that we want the same template as edit route
 */
App.UsersNewRoute = Ember.Route.extend({
  setupController: function(controller, model){
    var controller = this.controllerFor("user.edit");
    controller.set("model",App.User.createRecord());
    controller.set("isNew", true);
  },
  renderTemplate: function(){
    this.render("user._edit");
  }
});

App.UserEditController = Ember.ObjectController.extend({
  isEditing: false,
  isNew: "TEST",
  actions: {
    toggleEdit: function(){
      this.set("isEditing", !this.isEditing);
    },
    save: function(user){
      this.set("isEditing", false);
      user.transaction.commit();
    }
  }
});

/**
 * UserController handles both editing and viewing of existing users
 */
App.UserController = Ember.ObjectController.extend({
  isEditing: false,
  isNew: "TEST",
  actions: {
    toggleEdit: function(){
      this.set("isEditing", !this.isEditing);
    },
    save: function(user){
      this.set("isEditing", false);
      user.transaction.commit();
    }
  }
});

Ember.Handlebars.helper("format-date", function(date){
  if (!date){
    return "";
  }
  return moment(date).format('YYYY-MM-DD, HH:mm:ss');
});
