class CreateWatchlists < ActiveRecord::Migration
  def change
    create_table :watchlists do |t|
      t.references  :movie
      t.boolean     :seen,    default: false
      t.integer     :rating

      t.timestamps
    end

    reversible do |dir|
      dir.up do
        #add a foreign key
        execute <<-SQL
          ALTER TABLE watchlists
            ADD CONSTRAINT fk_watchlists_movies
            FOREIGN KEY (movie_id)
            REFERENCES movies(id)
        SQL
      end
    end
  end
end
