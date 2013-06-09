/**
 * @author Richard Bezemer
 */
define([
  'ember', 
  'application' 
  ],
  function(Ember, PMApp) {
    PMApp.ApplicationController = Ember.Controller.extend({
      init:function(){
        this._super();
      }
     });
    
    return PMApp.ApplicationController;
  });
  