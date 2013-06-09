/**
 * @author Richard Bezemer
 */
define(['utils/utils',
        'ember', 
        'application',
        'ember_data',
        'data/store'
    ],
  function (Utils, Ember, SLWorkspaces, DS ) {
  

  SLWorkspaces.Features = DS.Model.extend({
    smartwdk : DS.attr('boolean'),
    filloutsidepanel: DS.attr('boolean')
  });

  SLWorkspaces.Features.FIXTURES = [
    {
      id:0,
      smartwdk:false,
      filloutsidepanel:false
    }
  ];
  SLWorkspaces.checkForFeaturesFromQueryString = function(){
    var url = Utils.getCurrentURL();
    var params = Utils.getAllParamsFromURL(url);
    Object.keys(params).forEach(function(key) {
       SLWorkspaces.Features.FIXTURES[0][key] = (params[key]==='true');
    });
  };
  SLWorkspaces.checkForFeaturesFromQueryString();
  
  return SLWorkspaces.Features;
});
  
