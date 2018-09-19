import React, {Fragment} from 'react'
import Highlight from 'react-highlight'
import 'highlight.js/styles/atelier-heath-dark.css'

import WorkspaceDrop from './WorkspaceDrop'

const WorkspaceConfigInfos = ({config, type, handleDropStyleFile, handleChangeStyleFile}) => (
  <Fragment>
    <div className="uk-width-1-2 workspace__infos">
      <h2 className="workspace__info-title">{config.name}</h2>
      <ul uk-accordion="multiple: true;">
        <li>
          <a className="uk-accordion-title">Environnement</a>
          <div className="uk-accordion-content">
            <p>{config.url}</p>
          </div>
        </li>
        <li>
          <a className="uk-accordion-title">Pages</a>
          <div className="uk-accordion-content">
            <dl className="uk-description-list uk-description-list-divider">
              {config.pages.map((page, index) => (
                [
                  <dt key={`page-name-${index}`}>{page.name}</dt>,
                  <dd key={`page-url-${index}`}>{page.url}</dd>
                ]
              ))}
            </dl>
          </div>
        </li>
        <li>
          <a className="uk-accordion-title">Viewports</a>
          <div className="uk-accordion-content">
            <dl className="uk-description-list uk-description-list-divider">
              {config.viewports.map((viewport, index) => (
                [
                  <dt key={`viewport-name-${index}`}>{viewport.name}</dt>,
                  <dd key={`viewport-value-${index}`}>{viewport.width}x{viewport.height}</dd>
                ]
              ))}
            </dl>
          </div>
        </li>
        <li className="uk-open">
          <a className="uk-accordion-title">Import your CSS</a>
          <div className="uk-accordion-content">
            <WorkspaceDrop
              text="Drag and drop your CSS file or"
              type={type}
              handleDropFile={handleDropStyleFile}
              handleChangeFile={handleChangeStyleFile}
            />
          </div>
        </li>
      </ul>
      {/* <form onSubmit={e => handleFormSubmit(e)}>
        <input type="file" onChange={e => handleChangeStyleFile(e)} />
        <button type="submit">Importer le CSS</button>
      </form> */}
    </div>
    <div className="uk-width-1-2 workspace__highlight">
      <Highlight className="json">{JSON.stringify(config, null, '\t')}</Highlight>
    </div>
  </Fragment>
)

export default WorkspaceConfigInfos