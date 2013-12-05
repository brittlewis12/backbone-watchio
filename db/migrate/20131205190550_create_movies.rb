class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string  :title,       null: false
      t.string  :poster_url,  null: false
      t.text    :plot,        null: false

      t.timestamps
    end
  end
end
