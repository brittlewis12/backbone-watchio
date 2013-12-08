console.log("loaded");

/*

$$$$$$$\   $$$$$$\  $$\   $$\ $$$$$$$$\ $$$$$$$$\ $$$$$$$\
$$  __$$\ $$  __$$\ $$ |  $$ |\__$$  __|$$  _____|$$  __$$\
$$ |  $$ |$$ /  $$ |$$ |  $$ |   $$ |   $$ |      $$ |  $$ |
$$$$$$$  |$$ |  $$ |$$ |  $$ |   $$ |   $$$$$\    $$$$$$$  |
$$  __$$< $$ |  $$ |$$ |  $$ |   $$ |   $$  __|   $$  __$$<
$$ |  $$ |$$ |  $$ |$$ |  $$ |   $$ |   $$ |      $$ |  $$ |
$$ |  $$ | $$$$$$  |\$$$$$$  |   $$ |   $$$$$$$$\ $$ |  $$ |
\__|  \__| \______/  \______/    \__|   \________|\__|  \__|

*/

var WatchioRouter = Backbone.Router.extend({
  routes: {
    "": "index"
    "movies/search/:title": "searchMovies"
  },

  index: function() {
    // instantiates the search form view?
    // maybe just does nothing
  },

  searchMovies: function(title) {
    new SearchResultsView({collection: searchResults, searchedTitle: title});
  }
});

/*

$$\      $$\  $$$$$$\  $$$$$$$\  $$$$$$$$\ $$\       $$$$$$\
$$$\    $$$ |$$  __$$\ $$  __$$\ $$  _____|$$ |     $$  __$$\
$$$$\  $$$$ |$$ /  $$ |$$ |  $$ |$$ |      $$ |     $$ /  \__|
$$\$$\$$ $$ |$$ |  $$ |$$ |  $$ |$$$$$\    $$ |     \$$$$$$\
$$ \$$$  $$ |$$ |  $$ |$$ |  $$ |$$  __|   $$ |      \____$$\
$$ |\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |      $$ |     $$\   $$ |
$$ | \_/ $$ | $$$$$$  |$$$$$$$  |$$$$$$$$\ $$$$$$$$\\$$$$$$  |
\__|     \__| \______/ \_______/ \________|\________|\______/

*/

var Movie = Backbone.Model.extend({
  defaults: {
    seen: false
  },

  addToWatchlist: function() {
    myWatchlist.add(this);
  }
});

/*

 $$$$$$\   $$$$$$\  $$\       $$\       $$$$$$$$\  $$$$$$\
$$  __$$\ $$  __$$\ $$ |      $$ |      $$  _____|$$  __$$\
$$ /  \__|$$ /  $$ |$$ |      $$ |      $$ |      $$ /  \__|
$$ |      $$ |  $$ |$$ |      $$ |      $$$$$\    $$ |     $$$$$$\
$$ |      $$ |  $$ |$$ |      $$ |      $$  __|   $$ |     \______|
$$ |  $$\ $$ |  $$ |$$ |      $$ |      $$ |      $$ |  $$\
\$$$$$$  | $$$$$$  |$$$$$$$$\ $$$$$$$$\ $$$$$$$$\ \$$$$$$  |
 \______/  \______/ \________|\________|\________| \______/



$$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\  $$$$$$\
\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |$$  __$$\
   $$ |     $$ |  $$ /  $$ |$$$$\ $$ |$$ /  \__|
   $$ |     $$ |  $$ |  $$ |$$ $$\$$ |\$$$$$$\
   $$ |     $$ |  $$ |  $$ |$$ \$$$$ | \____$$\
   $$ |     $$ |  $$ |  $$ |$$ |\$$$ |$$\   $$ |
   $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |\$$$$$$  |
   \__|   \______| \______/ \__|  \__| \______/

*/

var SearchResults = Backbone.Collection.extend({
  model: Movie,
  url: "/movies/search/"
});

var Watchlist = Backbone.Collection.extend({
  model: Movie,
  url: "/movies"
});

/*

$$\    $$\ $$$$$$\ $$$$$$$$\ $$\      $$\  $$$$$$\
$$ |   $$ |\_$$  _|$$  _____|$$ | $\  $$ |$$  __$$\
$$ |   $$ |  $$ |  $$ |      $$ |$$$\ $$ |$$ /  \__|
\$$\  $$  |  $$ |  $$$$$\    $$ $$ $$\$$ |\$$$$$$\
 \$$\$$  /   $$ |  $$  __|   $$$$  _$$$$ | \____$$\
  \$$$  /    $$ |  $$ |      $$$  / \$$$ |$$\   $$ |
   \$  /   $$$$$$\ $$$$$$$$\ $$  /   \$$ |\$$$$$$  |
    \_/    \______|\________|\__/     \__| \______/

*/

var FormView = Backbone.View.extend({
  el: "form.search",

  events: {
    "submit": "searchMovies"
  },

  searchMovies: function(e) {
    e.preventDefault();
    var title = this.$el.find("input[name='title']").val();
    Backbone.history.navigate("movies/search/" + title, {trigger: true});
  }
});

var SearchResultsView = Backbone.View.extend({
  tagName: "div",
  className: "search",

  template: _.template($("script#search").html()),

  initialize: function(options) {
    this.searchedTitle = options.searchedTitle;
    this.$el.appendTo($("body"));
    this.collection.fetch({
      data: {title: this.searchedTitle},
      success: this.listResults,
      reset: true
    });
    this.render();
  },

  render: function() {
    var compiledTemplate = this.template();
    this.$el.html(compiledTemplate);
  },

  listResults: function(movies) {
    _.each(movies.models, function(movie) {
      var movieObj = new MovieView({model: new Movie(movie.attributes)});
    });
  }
});

var MovieView = Backbone.View.extend({
  tagName: "div",
  className: "movie-result",

  events: {
    "click button.add": "addToWatchlist"
  },

  template: _.template($("script#movie").html()),

  initialize: function() {
    this.$el.appendTo($("div.search"));
    this.render();
  },

  render: function() {
    var compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
  },

  addToWatchlist: function() {
    this.model.addToWatchlist();
  }
})

// Something should listen to myWatchlist for "add" events and
// Backbone.history.navigate to a watchlist path that instantiates
// and renders a WatchlistView, which will ping the server for
// all movies

/*
$$$$$$$\  $$\   $$\ $$\   $$\           $$$$$$$\   $$$$$$\  $$$$$$$\ $$\     $$\
$$  __$$\ $$ |  $$ |$$$\  $$ |          $$  __$$\ $$  __$$\ $$  __$$\\$$\   $$  |
$$ |  $$ |$$ |  $$ |$$$$\ $$ |          $$ |  $$ |$$ /  $$ |$$ |  $$ |\$$\ $$  /
$$$$$$$  |$$ |  $$ |$$ $$\$$ |          $$$$$$$\ |$$$$$$$$ |$$$$$$$\ | \$$$$  /
$$  __$$< $$ |  $$ |$$ \$$$$ |          $$  __$$\ $$  __$$ |$$  __$$\   \$$  /
$$ |  $$ |$$ |  $$ |$$ |\$$$ |          $$ |  $$ |$$ |  $$ |$$ |  $$ |   $$ |
$$ |  $$ |\$$$$$$  |$$ | \$$ |$$\       $$$$$$$  |$$ |  $$ |$$$$$$$  |   $$ |
\__|  \__| \______/ \__|  \__|$  |      \_______/ \__|  \__|\_______/    \__|
                              \_/
*/

new WatchioRouter();

Backbone.history.start();

var searchResults = new SearchResults();
var myWatchlist = new Watchlist();

var form = new FormView();
