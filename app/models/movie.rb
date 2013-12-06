class Movie < ActiveRecord::Base
  validates :title, :poster_url, :plot, presence: true
  validates :seen, inclusion: {in: [true, false]}
end
