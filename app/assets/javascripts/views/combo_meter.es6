{

  const comboSizeForNextLevel = 100

  // Indicates # of successful moves in a row
  //
  class ComboMeter extends Backbone.View {

    get el() {
      return $(".combo-meter")
    }

    initialize() {
      this.$counter = this.$(".counter")
      this.pzCounter = 0    // Number of puzzles in a row
      this.counter = 0      // Number of moves in a row
      this.listenForEvents()
    }

    listenForEvents() {
      this.listenTo(d, "move:success", () => {
        this.counter += 1
        this.$el.removeClass("invisible")
        this.$counter.text(this.counter)
      })
      this.listenTo(d, "puzzles:next", () => {
        this.pzCounter += 1
        if (this.nextStageUnlocked()) {
          d.trigger("puzzle_sets:next")
        }
      })
      this.listenTo(d, "move:fail", () => {
        this.counter = 0
        this.pzCounter = 0
        this.$el.addClass("invisible")
        d.trigger("progress:update", 0)
      })
      this.listenTo(d, "move:too_slow", () => {
        this.counter = 0
        this.pzCounter = 0
        this.$el.addClass("invisible")
        d.trigger("progress:update", 0)
      })
    }

    checkProgress() {
      let progress = ~~( 100 * this.counter / comboSizeForNextLevel )
      if (progress > 100) {
        progress = 100
      }
      d.trigger("progress:update", progress)
      console.log(progress)
      return progress
    }

    nextStageUnlocked() {
      return this.checkProgress() == 100
    }

  }


  Views.ComboMeter = ComboMeter

}
