/**
 * @author Richard Bezemer
 */
define(['utils/utils', 
        'application', 
        'views/application.view', 
        'controllers/application.controller'
        ], function (Utils, PMApp) {

  PMApp.Router.reopen({
    //location: 'none'
  });

  PMApp.IndexRoute = Ember.Route.extend({
    /*setupController: function(controller, model) {
      this.controllerFor('features').set('model', SLWorkspaces.Features.find(0));
      this.controllerFor('participants').set('model', SLWorkspaces.Participants.find());
    },*/
    renderTemplate: function() {
      this.render('titlebar', { outlet: 'titlebar', controller: 'titlebar'});
      /*this.render('sidemenu', {outlet:'sideMenu', controller:'sidemenu'});
      this.render('toolmenu', {outlet:'toolMenu', controller:'toolmenu'});
      */
      
    },
    events: {
      /*gotoDashboard: function () {
        document.location.href = "http://www.smarttech.com/";
      }*/
    }
    
  });
  //By this point the application controller, view, and route 
  //are all loaded by require, so it's fine to do our initial display
  PMApp.advanceReadiness();
});
