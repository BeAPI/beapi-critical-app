import React from 'react'

const WorkspaceLoading = ({loadingText}) => (
  <div className="workspace__loading">
    <div uk-spinner="ratio: 2" />
    <p>Critical CSS is being generated.</p>
    {loadingText && <p>{loadingText}</p>}
  </div>
)

export default WorkspaceLoading