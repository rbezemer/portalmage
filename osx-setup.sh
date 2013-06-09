#this script requires that macports in installed
#http://www.macports.org/install.php
#For Mountain Lion : https://distfiles.macports.org/MacPorts/MacPorts-2.1.3-10.8-MountainLion.pkg

#build tool dependancies
sudo port install nodejs
sudo port install npm
sudo port install phantomjs
sudo port install wget

rm -Rf downloaded_tools
mkdir downloaded_tools

#get selenium
wget --output-document=downloaded_tools/selenium-server.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.32.0.jar

#get jscover
wget --trust-server-name --output-document=downloaded_tools/jscover.zip "http://downloads.sourceforge.net/project/jscover/JSCover-0.2.7.zip?r=http%3A%2F%2Ftntim96.github.io%2FJSCover%2F&ts=1366915691&use_mirror=hivelocity"
mkdir downloaded_tools/jscover
unzip -d downloaded_tools/jscover downloaded_tools/jscover.zip

#update npm
sudo npm install -g npm
#install grunt
sudo npm install -g grunt-cli
#install all grunt build tools
npm install
#add jscover reporting to the Jasmine Phantom Reporter
cp -f tools/PhantomReporter.js node_modules/grunt-contrib-jasmine/tasks/jasmine/reporters/PhantomReporter.js

#Add a firewall rule to forward requests to port 80 to port 8000
#(Mac issues)
sudo ipfw add 100 fwd 127.0.0.1,8000 tcp from any to any 80 in

#grunt