#Backbone
###[Backbone Tutorial](http://www.jamesyu.org/2011/01/27/cloudedit-a-backbone-js-tutorial-by-example/)
* a bit outdated (routers renamed, mvc puts more logic in backbone models, views and less in router itself)
* great general ideas:
    * create a basic App object whose init function (called onload) has two responsibilities:
        * instantiating Router
        * starting Backbone.history
    * good folder structure for RESTful architecture
        * four nested js directories: routers, models, collections, views
* separation of concerns:
    * Backbone.Router responsibilities
        * get data from server to populate the models
        * process that data for the views
        * instantiate the views
    * Model & Collection responsibilities
        * maintain data
    * View
        * Shares controller-like responsibility with Router
* Break up Render functions:
    * like this:

    ```js
    render: function() {
      this
        .renderInput()
        .renderLabel()
        .renderClasses()
        .renderStates();
      return this.trigger('render', this);
    }
    ```
    * benefits to this approach:
        * listenTo functions can re-render ONLY the data that has changed
        * performance (at large scales) && readability improvements
        * more modular code == more maintainable code

###Testing with Jasmine

#Foundation (zurb-foundation)
* Class Names
* SASS
    * Sass for Web Designers (A Book Apart)
    * Compass
