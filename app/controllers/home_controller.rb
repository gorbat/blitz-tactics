class HomeController < ApplicationController
  def index
    if current_user
      @infinity_puzzle = current_user.next_infinity_puzzle
    else
      @infinity_puzzle = InfinityLevel.find_by(difficulty: 'easy').first_puzzle
    end
    @level = current_user&.highest_level_unlocked || Level.first
  end
end
