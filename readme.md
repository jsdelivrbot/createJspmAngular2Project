1 create folder:
        mkdir firstDemo
        cd fireDome

2     set up your project:    jspm init

3  jspm install angular2 reflect-metadata zone.js es6-shim

transpiler: "typescript",
  typescriptOptions: {
    "module": "commonjs",
    "emitDecoratorMetadata": true
  },
	paths: {
    		"github:*": "jspm_packages/github/*",
    		"npm:*": "jspm_packages/npm/*",
    		"app": "src"
  	},
  	packages: {
    		"app": {
     	 "main": "boot",
      	"defaultExtension": 'js'
    		}
  	},


4 jspm install crypto typescript

5 create boot.js file and add two import at first two line of boot.js

import 'zone.js';
import 'reflect-metadata';

import { bootstrap} from 'angular2/platform/browser';

bootstrap(firstcomponent);

6 create first component.js

import { Component, Injectable} from 'angular2/core';

@Component({
     selector:’myapp-test’
	template:`<h1>hello angular2</h1>`
})
export class Firstcomponent{}

7, create index.html file and add tag <myapp-test></myapp-test>

<html>
<head>
    <title>Hello ng2</title>
    <!-- systemJS loader and config -->
    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
</head>
<body>
    <!-- our angular2 component -->
    <myapp-test> loading custom ng2 tag ….</myapp-test>

    <!-- import and run our app -->
    <script>
      System.import(‘src/boot’);
    </script>
</body>
</html>


8. run http-server

http-server -p 3001
//open http://localhost:3001