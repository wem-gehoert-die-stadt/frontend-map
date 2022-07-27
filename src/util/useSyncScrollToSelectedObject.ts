import { RefObject, useEffect } from 'react'

const useSyncScrollToSelectedObject = (
  containerRef: RefObject<HTMLUListElement>,
  elementIdFromObjectId: (projectId: number) => string,
  selectedObjectId: null | number,
): void => {
  useEffect(() => {
    if (selectedObjectId === null) {
      return
    }

    const container = containerRef?.current
    if (!container) {
      return
    }
    const containerBoundingRect =
      container.parentElement.getBoundingClientRect()

    const objectElement = document.getElementById(
      elementIdFromObjectId(selectedObjectId),
    )
    const objectElementBoundingRect = objectElement.getBoundingClientRect()
    if (
      objectElementBoundingRect.y < containerBoundingRect.y ||
      objectElementBoundingRect.y + objectElementBoundingRect.height >
        containerBoundingRect.y + containerBoundingRect.height
    ) {
      container.parentElement.scrollBy({
        top:
          objectElementBoundingRect.top -
          containerBoundingRect.height / 2 +
          objectElementBoundingRect.height / 2,
        behavior: 'smooth',
      })
    }
  }, [containerRef, selectedObjectId, elementIdFromObjectId])
}

export default useSyncScrollToSelectedObject
