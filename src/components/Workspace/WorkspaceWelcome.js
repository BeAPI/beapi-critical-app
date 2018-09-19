import React from 'react'

const WorkspaceWelcome = ({handleClickStep}) => (
  <div className="workspace__welcome">
    <button onClick={e => handleClickStep(e, 'new')} className="workspace__path uk-button uk-button-link" type="button">
      <span className="workspace__icon" uk-icon="icon: file; ratio: 3.5;"></span> Generate Critical CSS from scratch
    </button>
    <hr className="uk-divider-icon" />
    <button onClick={e => handleClickStep(e, 'open')} className="workspace__path uk-button uk-button-link" type="button">
      <span className="workspace__icon" uk-icon="icon: upload; ratio: 3.5"></span> Generate Critical CSS from an existing configuration JSON file
    </button>
  </div>
)

export default WorkspaceWelcome