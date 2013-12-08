class MoviesController < ApplicationController
  def search
    title = URI.encode(params[:title])
    search_url = "http://www.omdbapi.com/?s=#{title}"

    res = JSON(HTTParty.get(search_url))
    search_results = res["Search"]

    movies = []

    search_results.each do |movie|
      url = imdb_id_url(movie["imdbID"])
      movies << JSON(HTTParty.get(url))
    end

    movies.each do |movie_hash|
      movie_hash.delete_if {|k,v| !["Title","Plot", "Poster"].include?(k)}
    end

    render json: movies
  end

  private

  def imdb_id_url(imdb_id)
    "http://www.omdbapi.com/?i=#{imdb_id}&plot=full"
  end
end
