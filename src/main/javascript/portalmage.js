/**
 * @author Richard Bezemer
 */
  requirejs.config({
      //By default load any module IDs from js/lib
      baseUrl:'javascript',
      //except, if the module ID starts with "wbext",
      //load it from the js/wb-ext directory. paths
      //config is relative to the baseUrl, and
      //never includes a ".js" extension since
      //the paths config could be for a directory.
      paths:{
          'jquery': 'lib/jquery/jquery-1.9.1.min',
          'bootstrap':'lib/bootstrap/js/bootstrap',
          'modernizr': 'lib/modernizr-2.6.2.min',
          'zip': 'lib/zip/zip',
          handlebars:'lib/ember/handlebars-1.0.0-rc.3',
          ember:'lib/ember/ember-1.0.0-rc.3',
          ember_data:'lib/ember/ember-data-0.13',
          text:'lib/require/text',
          templates:'templates/compiled.templates',
          lodash: "lib/underscore/lodash.min"
          
      },
      shim:{
        'handlebars':{
                deps:['jquery'],
                exports:'Handlebars'
          },
          'bootstrap':{
            deps:['jquery'],
            exports: 'jQuery'
          },
          'ember':{
              deps:[ 'jquery', 'handlebars'],
              exports:'Ember'
          },
          'ember_data':{
              deps:['jquery', 'ember'],
              exports:'DS'
          },
          'templates':{
            deps:['jquery', 'ember', 'application'],
            exports:'SLWorkspaces'
          },
          'modernizr':{
            deps:[],
            exports:"Modernizr"
          }
      },
  
      waitSeconds:5
  });


require(['jquery', 
         'lib/require/domReady',
         'application',
         'routes/index.route'
         ], function($, domReady, PMApp){
  
  domReady(function() {
  });
});