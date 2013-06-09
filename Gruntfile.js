/*global module:false*/
/*jslint node: true */
module.exports = function (grunt) {
  'use strict';
  var buildNumber = 'DEBUG';
  var majorVersionNumber = '1';
  var sprintVersionNumber = '0';
  var port80 = '8000';
  var jsCoverUnitPort = 8989;
  var jsCoverIntPort = 8787;
  var jsCoverFuncPort = 8585;
  var javaHome="";
  var fullVersionString = "";
  var openCMD = "open";
  var browser = "firefox";
  
  var requirePaths  ={
                'jquery'    :'lib/jquery/jquery-1.9.1.min',
                'jqueryui': 'lib/jqueryui/jquery-ui-1.10.0.custom.min',
                'bootstrap' :'lib/bootstrap/js/bootstrap',
                'modernizr' :'lib/modernizr-2.6.2.min',
                'zip'       :'lib/zip/zip',
                handlebars:'lib/ember/handlebars-1.0.0-rc.3',
                ember:'lib/ember/ember-1.0.0-rc.3.min',
                ember_data:'lib/ember/ember-data-0.13',
                templates:'templates/compiled.templates',
                lodash: "lib/underscore/lodash.min",
                //unit test helpers
                'Squire': 'lib/require/Squire'
          };
          
  var requireShims={
    'handlebars':{
      deps:['jquery'],
      exports:'Handlebars'
    },
    'ember':{
        deps:[ 'jquery', 'handlebars'],
        exports:'Ember'
    },
    'ember_data':{
        deps:[ 'ember'],
        exports:'DS'
    },
    'templates':{
      deps:['ember', 'application'],
      exports:'PMApp'
    },
    'modernizr':{
      deps:[],
      exports:"Modernizr"
    }
  };
  
  if (grunt.option('browser')) {
    browser = grunt.option('browser');
  }
  if(process.platform.toLowerCase().indexOf('win32')==0){
    openCMD = "start";
    port80 = '80';
  }
  if (process.env.BUILD_NUMBER) {
    buildNumber = process.env.BUILD_NUMBER;
  }
  if (process.env.MAJOR_VERSION_NUMBER) {
    majorVersionNumber = process.env.MAJOR_VERSION_NUMBER;
  }
  if (process.env.SPRINT_VERSION_NUMBER) {
    sprintVersionNumber = process.env.SPRINT_VERSION_NUMBER;
  }
  if(process.env.JSCOVER_PORT){
    jsCoverPort = process.env.JSCOVER_PORT;
  }
  fullVersionString = majorVersionNumber+'.'+sprintVersionNumber+'.' + buildNumber;
  
  if(process.env.JAVA_HOME) {
  	javaHome = '"'+process.env.JAVA_HOME+'/bin/"';
  }
  
    // Project configuration.
  grunt.initConfig({
    meta            :{
      version        : fullVersionString,
      banner         :'/*! Portal Mage - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://www.softwarebyrichard.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Bezemer Consulting Inc */\n' +
        'var CURRENT_VERSION_NUM = "<%= meta.version %>";\n' +
        'var GOOGLE_ANALYTICS_ID = "UA-XXXXXXX-1";\n'
    },
    
    linter: { // configure the task
      files     :[
        'src/main/javascript/**/*.js',
        'src/tests/**/*.js'],
      exclude   :[
        'src/main/javascript/lib/**',
        'src/main/javascript/templates/compiled.templates.js',
        'src/tests/lib/**'
        ],
        directives: { // example directives
            browser: true
        },
        globals: {
          'navigator':true
        },
        options: {
            junit: 'build/lintreport/jslint-junit.xml', // write the output to a JUnit XML
            log: 'build/lintreport/js-lint.log'
        }
    },
    csslint: {
      all: {
        options: {
          import: false,
          ids:false,
          important:false,
          'box-model':false,
          formatters: [
            {id: 'junit-xml', dest: 'build/lintreport/csslint_junit.xml'},
            {id: 'csslint-xml', dest: 'build/lintreport/csslint.xml'}
          ],
        },
        src: ['src/main/css/*.css', '!**/normalize.css', '!**/moz.hacks.css', '!**/platform.overrides.css']
      }
    },
    shell           :{
      create_build_dir   :{
        command    :'mkdir -p build',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      cleanup_jscover:{
        command    :'rm -f stop',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      clean              :{
        command    :'rm -Rf build',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      debug_android              :{
        command    :'adb forward tcp:9222 localabstract:chrome_devtools_remote',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      debug_functional_tests              :{
        command    :'pybot -v webenv:grunt -v BROWSER:'+browser+' --include dev --outputdir results/local src/functionalTest/tests',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      all_functional_tests              :{
        command    :'pybot -v webenv:grunt -v BROWSER:'+browser+' --outputdir results/local src/functionalTest/tests',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      coverage_functional_tests              :{
        command    :'pybot -v webenv:coverage -v BROWSER:firefox --exclude nocoverage --exclude developing --exclude broken --exclude manual --outputdir results/local src/functionalTest/tests',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      
      openUnitTestsInBrowser              :{
        command    :openCMD+' http://localhost:'+jsCoverUnitPort+'/_SpecRunner.html',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      openIntTestsInBrowser              :{
        command    :openCMD+' http://localhost:'+jsCoverIntPort+'/_SpecRunner.html',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      },
      openCoverageTestsInBrowser              :{
        command    :openCMD+' http://localhost:'+jsCoverUnitPort+'/jscoverage.html?_SpecRunner.html',
        options: {
          stdout     :true,
          stderr     :true,
          failOnError:true
        }
      }
     
    },
    bgShell: {
      defaults:{
        stdout     :true,
        stderr     :true,
      },
      start_jscover_for_unit_tests: {
        cmd    :javaHome+'java -jar downloaded_tools/jscover/target/dist/JSCover-all.jar -ws --document-root=. --report-dir=build/coverage/unit --no-instrument=src/main/javascript/lib --no-instrument=src/tests  --no-instrument=src/main/javascript/templates/compiled.templates.js --no-instrument=.grunt --port='+jsCoverUnitPort+' && sleep 3',
        bg: true
      },
      start_jscover_for_integration_tests: {
        cmd    :javaHome+'java -jar downloaded_tools/jscover/target/dist/JSCover-all.jar -ws --document-root=. --report-dir=build/coverage/integration --no-instrument=src/main/javascript/lib --no-instrument=src/tests  --no-instrument=src/main/javascript/templates/compiled.templates.js --no-instrument=.grunt --port='+jsCoverIntPort+' && sleep 3',
        bg: true
      },
      start_jscover_for_functional_tests: {
        cmd    :javaHome+'java -jar downloaded_tools/jscover/target/dist/JSCover-all.jar -ws --document-root=./src/main --report-dir=build/coverage/functional --no-instrument=javascript/lib --no-instrument=javascript/templates/compiled.templates.js --port='+jsCoverFuncPort+' && sleep 3',
        bg: true
      },
      
      stop_jscover_unit:{
        cmd    :'wget http://localhost:'+jsCoverUnitPort+"/stop && sleep 2",
        bg: false
      },
      stop_jscover_int:{
        cmd    :'wget http://localhost:'+jsCoverIntPort+"/stop && sleep 2",
        bg: false
      },
       stop_jscover_functional:{
        cmd    :'wget http://localhost:'+jsCoverFuncPort+"/stop && sleep 2",
        bg: false
      },
      convert_jscover_unit_report_to_cobertura:{
        cmd : "java -cp downloaded_tools/jscover/target/dist/JSCover-all.jar jscover.report.Main --format=COBERTURAXML build/coverage/unit/ .",
        bg:false
      },
      convert_jscover_integration_report_to_cobertura:{
        cmd : "java -cp downloaded_tools/jscover/target/dist/JSCover-all.jar jscover.report.Main --format=COBERTURAXML build/coverage/integration/ .",
        bg:false
      },
      convert_jscover_functional_report_to_cobertura:{
        cmd : "java -cp downloaded_tools/jscover/target/dist/JSCover-all.jar jscover.report.Main --format=COBERTURAXML build/coverage/functional/ .",
        bg:false
      }
    },
    jasmine         :{
      unit_tests:{
        src       :[
        ],
       options:{
         specs     :[
            './src/tests/unit/**/*.spec.js',
           './src/tests/unit/**/*-spec.js'
          ],
          helpers   :[
            './src/tests/lib/sinon-1.6.0.js',
            './src/tests/lib/jasmine-sinon.js',
            './src/tests/lib/jasmine.async.min.js'
          ],
          timeout: 50000,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              version:'2.1.2',
              baseUrl: './src/main/javascript/',
              paths  :requirePaths,
              shim:requireShims
            }
          },
          build:true,
          host : 'http://localhost:'+jsCoverUnitPort+'/',
          junit     :{
            path:'build/test-results/unit/'
          }
       }
      },
      integration_tests:{
        src       :[
        
        ],
       options:{
         specs     :[
            './src/tests/integration/**/*.spec.js',
            './src/tests/integration/**/*-spec.js'
          ],
          helpers   :[
            './src/tests/lib/sinon-1.6.0.js',
            './src/tests/lib/jasmine-sinon.js',
            './src/tests/lib/jasmine.async.min.js',
            
            
          ],
          timeout: 100000,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              version:'2.1.2',
              baseUrl: './src/main/javascript/',
              paths  :requirePaths,
              shim:requireShims
            }
          },
          build:true,
          host : 'http://localhost:'+jsCoverIntPort+'/',
          junit     :{
            path:'build/test-results/integration/'
          }
       }
      
      }
    },
    concat          :{
      release              :{
        src :[
        'src/main/javascript/lib/require/almond.min.js',
        'build/temp/main/javascript/portalmage.js'],
        dest:'build/release/javascript/portalmage.release.js',
        options:{
          banner:'<%=meta.banner%>'
        }
      },
      templates :{
        src:['tools/helperjs/template_start.js', 
        'src/main/javascript/templates/compiled.templates.js',
        'tools/helperjs/template_end.js'],
        dest:'src/main/javascript/templates/compiled.templates.js'
      }
    },
    requirejs       :{
      workspaces :{
        options: {
          dir                       :'build/temp',
          appDir                    :'src',
          baseUrl                   :'main/javascript',
          wrap: {
            start: "(function() {",
            end: "}());"
            },
          paths  :requirePaths,
          shim:requireShims,
          modules                   :[
            {
              name   :"portalmage",
              include:['portalmage']
            }
          ],
          pragmas                   :{
            doExclude:true
          },
          optimize:'uglify2',          
          skipModuleInsertion       :false,
          optimizeAllPluginResources:false,
          findNestedDependencies    :true,
          generateSourceMaps: true,
          preserveLicenseComments:false,
          
          uglify2: {
            //Example of a specialized config. If you are fine
            //with the default options, no need to specify
            //any of these properties.
            banner:'<%=meta.banner%>',
            /*output: {
                beautify: true
            },
            compress: {
                sequences: false,
                global_defs: {
                    DEBUG: false
                }
            },
            warnings: true,
            mangle: false*/
        },
        }
      }
    },
    uglify             :{
      almond:{
        files:{
          'src/main/javascript/lib/require/almond.min.js':['src/main/javascript/lib/require/almond.js'],
        },
        options: {
          toplevel : false,
          compress:false,
          mangle:false
         }
      },
    },
    cssmin: {
      files: {
        dest:'build/release/css/portalmage.css',
        src: [
            'src/main/javascript/lib/bootstrap/css/bootstrap.min.css',
            'build/temp/main/css/fontawesome.css',
            'src/main/css/portalmage.css',
            ]
      },
      options:{
        report:'min'
      }
    },
    
    connect: {
      jasmine_unit: {
        options: {
          port: jsCoverUnitPort,
          base: '.'
        }
      },
      jasmine_integration: {
        options: {
          port: jsCoverIntPort,
          base: '.'
        }
      },
      debug: {
        options: {
          port: port80,
          base: './src/main'
        }
      },
      release: {
        options: {
          port: port80,
          base: './build/release'
        }
      },
      debug_functional_tests: {
        options: {
          port: jsCoverFuncPort,
          base: './src/main'
        }
      },
      release_functional_tests: {
        options: {
          port: jsCoverFuncPort,
          base: './build/release'
        }
      },
      functional_tests: {
        options: {
          port: jsCoverFuncPort,
          base: './build/release'
        }
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          namespace: "PMApp.TEMPLATES",
          processName: function(filePath) { // input:  templates/_header.hbs
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].split('.')[0]; // output: _header
          }
        },
        files: {
          "src/main/javascript/templates/compiled.templates.js": "src/main/templates/*.hbs"
        }
      }
    },
    copy            :{
      dist           :{
        files:[
          {
            expand:true,
            flatten:true, 
            filter: 'isFile',
            dest: "build/release/",
            src: ["src/main/*.html",
            "src/main/*.xml",
            "src/main/*.ico",
            "src/main/*.txt",
            "src/main/.htaccess"
            ],
          },
          {
            expand:true,
            filter: 'isFile',
            cwd: 'src/main/images/',
            dest:"build/release/images",
            src: [
            "**/*.png",
            "**/*.jpg",
            "**/*.gif"]
          },
          {
            expand:true,
            filter: 'isFile',
            cwd: 'src/main/css/',
            dest:"build/release/css",
            src: [
            "**/*.svg"]
          },
         
          {
            expand:true,
            filter: 'isFile',
            cwd: 'src/main/javascript/lib/bootstrap/fontawesome/font/',
            dest:"build/release/css/font",
            src: [
            "**/*.*"]
          },
          ]
      }
    },
    "string-replace":{
      dist:{
        files  :{
          "build/release/index.html"   :"src/main/index.html"
        },
        options:{
          replacements:[
            {
              pattern    :'<script data-main="javascript/workspaces" src="javascript/lib/require/require.js"></script>',
              replacement:'<script src="javascript/portalmage.release.js?<%= meta.version %>"></script>'
            },
            
           
            {
              pattern    :'<link href="css/portalmage.css" rel="stylesheet">',
              replacement:'<link href="css/portalmage.css?<%= meta.version %>" rel="stylesheet">'
            },
          ]
        }
      },
      fontawesome:{
        files:{
          "build/temp/main/css/fontawesome.css" : "src/main/javascript/lib/bootstrap/fontawesome/css/font-awesome.min.css"
        },
        options:{
          replacements:[
            {
              pattern:'../font/fontawesome-webfont.eot?v=3.0.1',
              replacement:'font/fontawesome-webfont.eot?v=3.0.1'
            },
            {
              pattern:'../font/fontawesome-webfont.eot?#iefix&v=3.0.1',
              replacement:'font/fontawesome-webfont.eot?#iefix&v=3.0.1'
            },
            {
              pattern:'../font/fontawesome-webfont.woff',
              replacement:'font/fontawesome-webfont.woff'
            },
            {
              pattern:'../font/fontawesome-webfont.ttf',
              replacement:'font/fontawesome-webfont.ttf'
            }
            
          ]
        }
      }
    },
    
    watch: {
      css:{
        files:['src/**/*.css'],
        tasks:['csslint']
      },
      templates:{
        files : [ 'src/main/templates/**/*.hbs' ],
        tasks : [ 'compile_templates' ]
      },
      src:{
        files : [ 'src/**/*.js', '!src/main/javascript/templates/compiled.templates.js'],
        tasks : [ 'linter',"connect:jasmine_unit", "jasmine:unit_tests", "connect:jasmine_integration", "jasmine:integration_tests" ]
      }
    
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-linter');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  
  //Code Verification
  grunt.registerTask('lint', ["linter","csslint"]);
  grunt.registerTask('unit_tests', ["compile_templates","connect:jasmine_unit", "jasmine:unit_tests"]);
  grunt.registerTask('integration_tests', ["compile_templates","connect:jasmine_int", "jasmine:integration_tests"]);
  grunt.registerTask('generate_coverage_reports',["compile_templates", "shell:cleanup_jscover", 'generate_unit_coverage_report', 'generate_integration_coverage_report'])
  
  grunt.registerTask('generate_unit_coverage_report', ["bgShell:start_jscover_for_unit_tests", "jasmine:unit_tests","bgShell:stop_jscover_unit", "shell:cleanup_jscover", "bgShell:convert_jscover_unit_report_to_cobertura"]);
  grunt.registerTask('generate_integration_coverage_report', ["bgShell:start_jscover_for_integration_tests", "jasmine:integration_tests","bgShell:stop_jscover_int", "shell:cleanup_jscover", "bgShell:convert_jscover_integration_report_to_cobertura"]);
  
  grunt.registerTask('debug_unit_tests', ["jasmine:unit_tests:build", "shell:openUnitTestsInBrowser", "connect:jasmine_unit:keepalive"]);
  grunt.registerTask('debug_integration_tests', ["jasmine:integration_tests:build", "shell:openIntTestsInBrowser", "connect:jasmine_int:keepalive"]);
  grunt.registerTask('debug_functional_tests', ['compile_templates', 'connect:debug_functional_tests', "shell:debug_functional_tests"]);
  grunt.registerTask('all_functional_tests', ['compile_templates', 'connect:debug_functional_tests', "shell:all_functional_tests"]);
  grunt.registerTask('release_functional_tests', ['compile_templates', 'connect:release_functional_tests', "shell:release_functional_tests"]);
  
  grunt.registerTask('coverage_functional_tests', ["compile_templates", "bgShell:start_jscover_for_functional_tests", "shell:teamcity_functional_tests", "bgShell:stop_jscover_functional"]);
 
  //packaging
  grunt.registerTask('package_css', ['string-replace:fontawesome', "cssmin"]);
  grunt.registerTask('package', ["compile_templates", "requirejs", "package_css", "concat:release","copy", "string-replace:dist"]);
  grunt.registerTask('compile_templates', ["ember_handlebars", "concat:templates"]);
  
  //servers
  grunt.registerTask('dev_server', ['connect:debug:keepalive']);
  grunt.registerTask('release_server', ['connect:release:keepalive']);
  grunt.registerTask('debug_android', ['shell:debug_android']);
  grunt.registerTask('default', ["shell:clean", "lint",  "compile_templates","generate_coverage_reports", "package"]);
  
  
};