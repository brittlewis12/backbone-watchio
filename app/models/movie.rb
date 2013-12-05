class Movie < ActiveRecord::Base
  validates :title, :poster_url, :plot, presence: true
end
