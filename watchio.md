# Watch.io

To tie together everything we've been learning about Backbone in class and integrate it with Rails, I'm going to build an app to help keep track of what movies we want to watch.

### USER STORIES
* as a user, I want to be able to do everything for the app on a single page, because changing pages is confusing
* ..., I want to be able to search for a movie so I can add it to my watchlist
* ..., I want to be able to add a movie to my watchlist so I can remember to watch it later
* ..., I want my watchlist to persist beyond refresh so I can come back to my watchlist
* ..., I want to mark a movie as seen, so I can keep track of which movies I still need to see
* ..., I want to rate a movie so I can remember which movies I liked and which I didn't
    * ..., I only want to rate movies I've seen, because I don't know if it's good if I haven't seen it!
* ..., I want to delete a movie so I can keep an organized watch list

### MODELS -- MVP
* movie
    * string    : title
    * string    : poster_url
    * text      : description

* watchlist
    * reference : movie_id
    * boolean   : seen
    * integer   : rating

### BEHAVIOR

* movies#search
* watchlist#delete_movie
* watchlist#rate_movie(rating)
* watchlist#toggle_seen
