import React from 'react'
import WorkspaceDrop from './WorkspaceDrop';

const WorkspaceWelcome = ({acceptedExtension, text, handleFormScreen, handleDropFile, handleChangeFile, openFile}) => (
  <div className="workspace__welcome">
    <h2>BeAPI Critical CSS</h2>

    <div className="uk-flex">
      <div className="uk-width-1-2">
        <dl className="uk-description-list">
          <dt>New</dt>
          <dd>
            <button onClick={() => handleFormScreen()} className="uk-button uk-button-small uk-button-link" type="button">Create a new configuration file</button>
          </dd>
        </dl>
      </div>
      <div className="uk-width-1-2">
        <dl className="uk-description-list">
          <dt>Open</dt>
          <dd>
            {JSON.parse(window.localStorage.getItem('recentOpenedFiles')).map((filepath, index) => (
              <button key={`filepath-${index}`} type="button" onClick={() => openFile(filepath)} className="uk-button uk-button-small uk-button-link">{filepath}</button>
            ))}
            <WorkspaceDrop acceptedExtension={acceptedExtension} text={text} handleDropFile={handleDropFile} handleChangeFile={handleChangeFile} />
          </dd>
        </dl>
      </div>
    </div>
  </div>
)

export default WorkspaceWelcome