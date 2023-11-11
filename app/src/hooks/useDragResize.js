export const useDragResize = (onStartDragResizing, onDragResizing, onStopDragResizing) => {
  
  const startDragResizing = (mouseDownEvent) => {

    const delta = (mouseEvent) => {
      return {deltaX: mouseEvent.clientX - startX, deltaY: mouseEvent.clientY - startY};
    }

    const doDrag = (mouseMoveEvent) => {
      mouseMoveEvent.preventDefault();
      mouseMoveEvent.stopPropagation();
      onDragResizing(delta(mouseMoveEvent));
    };

    const stopDragging = (mouseEvent) => {
        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();
        window.removeEventListener('mousemove', doDrag);
        window.removeEventListener('mouseup', stopDragging);
        onStopDragResizing(delta(mouseEvent));
    };

    mouseDownEvent.preventDefault();
    mouseDownEvent.stopPropagation();
    onStartDragResizing();

    const startX = mouseDownEvent.clientX;
    const startY = mouseDownEvent.clientY;
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDragging);
  }

  return startDragResizing;
}