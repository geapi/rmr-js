Repository for the workshop on javascript testing at Rocky Mountain Ruby in 2013
======

These are the examples from the RMR JS workshop. Beware of branches described below.

- All the code with jasmine specs is on master.
- The intro-specs branch has our version of the KVStore with tests while master has the solution we came up with in the workshop.
- The rails sample app with jasmine-gem set up is also on master.
- The branch __teaspoon-specs__ contains the rails app with teaspoon set up for javascript testing.
- The working examples for ajax testing are in the __store__ and __storeSpec__ files.

## Jasmine

All the tests are written using [jasmine](https://github.com/pivotal/jasmine).


### Jasmine runner

- The jasmine testing framework comes with its own runner, it's the specRunner.html file.
- There is a [gem version](https://github.com/pivotal/jasmine-gem).
- The  specs in the rails app can be run with `rake jasmine`. Which shows the specRunner screen at __http://localhost:8888/__
- Running `rake jasmine:ci` runs it on the comand line and reports there.
- We've also included [jasmine-ajax](https://github.com/pivotal/jasmine-ajax) for simple ajax testing.

### Teaspoon

- We installed [teaspoon](https://github.com/modeset/teaspoon) as another example of a spec runner.
It has support for multiple frameworks including mocha and jasmine out of the box. It also plays nicely with require.js.
- The jasmine specs can be run in the teaspoon runner via `teaspoon`.
- Or, when the rails server is running they can be accessed via '/teaspoon'

### Disclaimer

The todo-app example comes from [todmvc.com](http://todomvc.com).
Specifically from [here](https://github.com/tastejs/todomvc/tree/gh-pages/vanilla-examples/vanillajs).

-----

Copyright (c) 2013 Georg Apitz and Zac Clark. This software is licensed under the MIT License.