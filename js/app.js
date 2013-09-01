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
    this.route("new");
    this.route("edit", {path: ":_id"});
  });
});

App.User = DS.Model.extend({
  email: DS.attr("string"),
  name: DS.attr("string"),
  password: DS.attr("string"),
  login_attempts: DS.attr("number")
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    return App.User.find();
  },
});

App.UsersEditRoute = Ember.Route.extend({
  model: function(params) {
    return App.User.find(params._id);
  },
  setupController: function(controller, model){
    controller.set("isNew", false);
    controller.set("model", model);
  }
});

/**
 * 'New User' Route, says that we want the same template as edit route
 */
App.UsersNewRoute = Ember.Route.extend({
  setupController: function(controller, model){
    var controller = this.controllerFor("users.edit");
    controller.set("model", App.User.createRecord());
    controller.set("isNew", true);
  },
  renderTemplate: function(){
    this.render("users/edit");
  }
});

App.UsersEditController = Ember.ObjectController.extend({
  isNew: false,
  actions: {
    save: function(user){
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
