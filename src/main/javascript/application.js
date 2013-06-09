/**
 * @author Richard Bezemer
 */
define(['jquery', 
    'handlebars', 
    'ember'], function($, hb, Ember){
     
        
    window.PMMage = Ember.Application.create({
      rootElement: '#portalmage',
      LOG_TRANSITIONS: true
    });
    //tells it to wait to initialize everything.
    PMMage.deferReadiness();
    return window.PMMage;
});