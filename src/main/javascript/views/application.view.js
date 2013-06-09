/**
 * @author Richard Bezemer
 */
define(['application', 'ember', 'templates'],
  function (PMApp, Ember) {
    PMApp.ApplicationView = Ember.View.extend({
      templateName:"application",
      template: PMApp.TEMPLATES.application,
      classNames: ['preserve-height']
    });
    return PMApp.ApplicationView;
  });