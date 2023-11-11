export const useDragResize = (onDragResizing, onStopDragResizing) => {
  
  const startDragResizing = (mouseDownEvent) => {

    const delta = (mouseEvent) => {
      return {deltaX: mouseEvent.clientX - startX, deltaY: mouseEvent.clientY - startY};
    }

    const doDrag = (mouseMoveEvent) => {
      onDragResizing(delta(mouseMoveEvent));
    };

    const stopDragging = (mouseEvent) => {
        window.removeEventListener('mousemove', doDrag);
        window.removeEventListener('mouseup', stopDragging);
        onStopDragResizing(delta(mouseEvent));
    };

    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();
    document.body.style.cursor = 'move';

    const startX = mouseDownEvent.clientX;
    const startY = mouseDownEvent.clientY;
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDragging);
  }

  return [ startDragResizing ];
}