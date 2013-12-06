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
    "movies/search/:movieTitle": "searchMovies"
  },

  searchMovies: function(movieTitle) {
    new SearchResultsView({title: movieTitle});
  }
});

new WatchioRouter();

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

var Movie = Backbone.Model.extend({});

/*

 $$$$$$\   $$$$$$\  $$\       $$\       $$$$$$$$\  $$$$$$\
$$  __$$\ $$  __$$\ $$ |      $$ |      $$  _____|$$  __$$\
$$ /  \__|$$ /  $$ |$$ |      $$ |      $$ |      $$ /  \__|
$$ |      $$ |  $$ |$$ |      $$ |      $$$$$\    $$ |      $$$$$$\
$$ |      $$ |  $$ |$$ |      $$ |      $$  __|   $$ |      \______|
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

  url: // FIXME ?
})

var Watchlist = Backbone.Collection.extend({
  model: Movie,

  url: // FIXME ?
})

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
    Backbone.history.navigate("movies/search/" + title);
  }
});

var SearchResultsView = Backbone.View.extend({
  tagName: "div",

  template: _.template($("script#movie").html()),

  initialize: function(options) {
    this.title = options.movieTitle;
    this.$el.appendTo($("body"));
    this.fetchSearchResults();
  },

  render: function() {
    var compiledTemplate = this.template();
    this.$el.html(compiledTemplate);
  },

  fetchSearchResults: function() {
    $.ajax({
      method: "GET",
      url: "/movies/search?q=" + this.movieTitle,
      dataType: "json",
      success: this.listResults,
      context: this
    });
  },

  listResults: function(movies) {
    movies.each(function(movieJSON) {
      var movie = new MovieView({model: Movie});
    });
    this.render();
  }
});

var MovieView = Backbone.View.extend({
  tagName: "div",

  template: _.template($("script#movie").html()),

  initialize: function(options) {
    // may not need the below: pass model into this bad boy
    // this.title = options.title; // FIXME may be different
    // this.poster_url = options.poster_url; // FIXME may be different
    // this.plot = options.plot; // FIXME may be different
    this.render();
  }

  render: function() {
    var compiledTemplate = this.template(this.model.toJSON())
  }
})

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

Backbone.history.start();
