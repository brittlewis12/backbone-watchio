class Watchlist < ActiveRecord::Base
  validates :seen, inclusion: {in: [true, false]}
end
