watch.io
===

rails application, using backbone.js

to tie together everything we've been learning about backbone in class and integrate it with rails, I'm going to build an app to help keep track of movies I want to watch.

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
    * string    : title,        null: false
    * string    : poster_url,   null: false
    * text      : description,  null: false

* watchlist
    * reference : movie_id
    * boolean   : seen,       default: false
    * integer   : rating

### BEHAVIOR

* movies#search
* watchlist#delete_movie
* watchlist#rate_movie rating
* watchlist#toggle_seen

====

### ADDITIONAL FUNCTIONALITY

##### I want to have an account to log in to, so I don't have to host my own server to keep a watchlist

model

* user
    * string    : username
    * string    : password
    * reference : watchlist_id
