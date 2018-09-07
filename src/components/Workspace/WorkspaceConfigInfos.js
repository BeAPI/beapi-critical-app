import React from 'react'

const WorkspaceConfigInfos = ({config, handleChange, handleFormSubmit}) => (
  <div className="workspace__infos">
    <div className="workspace__info">
      <h2 className="workspace__info-title">{config.name}</h2>
      <ul>
      {config.envUrl.map((url, index) => (
        <li key={`url-${index}`}><strong>Environement : </strong>{url}</li>
      ))}
      </ul>
    </div>
    <div className="workspace__info">
      <h2 className="workspace__info-title">Pages</h2>
      <ul>
      {config.pages.map((page, index) => (
        <li key={`page-${index}`}><strong>{page.name} : </strong>{page.url}</li>
      ))}
      </ul>
    </div>
    <div className="workspace__info">
      <h2 className="workspace__info-title">Viewports</h2>
      <ul>
      {config.viewports.map((viewport, index) => (
        <li key={`viewport-${index}`}><strong>{viewport.name} : </strong>{viewport.width}x{viewport.height}</li>
      ))}
      </ul>
    </div>
    <form onSubmit={e => handleFormSubmit(e)}>
      <input type="file" onChange={e => handleChange(e)} />
      <button type="submit">Importer le CSS</button>
    </form>
  </div>
)

export default WorkspaceConfigInfos