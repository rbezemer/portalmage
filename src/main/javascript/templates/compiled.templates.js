define(['application'],function (PMApp) {
  this.PMApp = PMApp;

this["PMApp"] = this["PMApp"] || {};
this["PMApp"]["TEMPLATES"] = this["PMApp"]["TEMPLATES"] || {};

this["PMApp"]["TEMPLATES"]["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("Hello and welcome to portal mage!!\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "titlebar", options) : helperMissing.call(depth0, "outlet", "titlebar", options))));
  data.buffer.push("\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "sideMenu", options) : helperMissing.call(depth0, "outlet", "sideMenu", options))));
  return buffer;
  
});
});
