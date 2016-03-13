class LevelGenerator

  LEVEL_SIZE = 20


  def initialize
  end

  def puzzle_source
    LichessPuzzle.rating_lt(1700).vote_gt(50).white_to_move.shuffle
  end

  def build_levels!
    puzzle_source.each_slice(LEVEL_SIZE).each_with_index do |level_puzzles, id|
      puzzle_ids = level_puzzles.sort_by(&:rating).map(&:id)
      slug = level_slug(id)
      Level.create!({ :slug => slug, :puzzle_ids => puzzle_ids })
      puts "Created #{slug}"
    end
  end

  def rebuild_levels!
    Level.destroy_all
    build_levels!
  end

  def level_slug(id)
    "level-#{id}"
  end

end