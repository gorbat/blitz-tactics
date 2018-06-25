import $ from 'jquery'

// require('jquery-ui')
// require('jquery-ui/ui/widgets/draggable')
// require('jquery-ui/ui/widgets/droppable')

const interact = require('interactjs')

export function makeDraggable(pieceEl) {
  let dragStarted = false
  let initialOffset = {
    x: 0,
    y: 0
  }
  interact(pieceEl).draggable({
    maxPerElement: Infinity
  })
  .on('mousedown', () => dragStarted = false)
  .on('click', e => {
    if (dragStarted) {
      e.stopImmediatePropagation()
    }
  })
  .on('dragstart', e => {
    dragStarted = true
    const rect = interact.getElementRect(e.target)
    const startPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
    initialOffset.x = e.x0 - startPos.x
    initialOffset.y = e.y0 - startPos.y
  })
  .on('dragmove', e => {
    const dx = e.clientX - e.clientX0 + initialOffset.x
    const dy = e.clientY - e.clientY0 + initialOffset.y
    const styles = [
      `transform: translate3d(${dx}px, ${dy}px, 0)`,
      `z-index: 5`
    ]
    e.currentTarget.style = styles.join(`;`)
  })
  .on('dragend', e => {
    e.currentTarget.style = `transform: translate3d(0, 0, 0); z-index: 1`
  })

  /*
  $(pieceEl).draggable({
    stack: `.piece`,
    distance: 10,
    revert: true,
    revertDuration: 0,
    containment: `body`,
    scroll: false
  })
  */
}

export function makeDroppable(squareEl, onDrop) {
  interact(squareEl).dropzone({
    accept: '.piece',
    ondrop: event => {
      const $piece = $(event.draggable.target)
      const move = {
        from: event.draggable.target.parentNode.dataset.square,
        to: event.target.dataset.square
      }
      onDrop($piece, move)
    }
  })

  /*
  $(squareEl).droppable({
    accept: `.piece`,
    tolerance: `pointer`,
    drop: (event, ui) => {
      const $piece = $(ui.draggable)
      const move = {
        from: $piece.parents(`.square`).data(`square`),
        to: $(event.target).data(`square`)
      }
      onDrop($piece, move)
    }
  })
  */
}
