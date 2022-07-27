const useSelectedObjectId = (): number | null => {
  const projectId = window.location.hash.replace('#', '')
  return projectId ? parseInt(projectId, 10) : null
}

export default useSelectedObjectId
