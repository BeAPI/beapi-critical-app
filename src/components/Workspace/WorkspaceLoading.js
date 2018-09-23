import React from 'react'

const WorkspaceLoading = ({compiledElements, loadingText}) => (
  <div className="workspace__loading">
    <table className="uk-table uk-table-responsive uk-table-divider">
      <thead>
        <tr>
          <th>Page</th>
          <th>Viewport</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {compiledElements.map((compiledElement, index) => (
        <tr className={`${compiledElement.status === 'loaded' ? 'success' : ''}`} key={`item-${index}`}>
          <td>{compiledElement.page}</td>
          <td>{compiledElement.viewport}</td>
          <td>
            {compiledElement.status === 'loading' && <span><div uk-spinner="ratio: .6" /> Generating</span>}
            {compiledElement.status === 'loaded' && <span><span uk-icon="icon: check" /> Generated</span>}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
)

export default WorkspaceLoading