import React from 'react'

const WorkspaceFormViewport = ({index, disabledRemoveButton, viewport, handleRow, removeRow}) => (
  <div className="row">
    <div className="uk-grid-small" uk-grid="">
      <div className="uk-width-1-3@s">
        <input className="uk-input" type="text" onChange={e => handleRow(e, index, 'viewport-name')} placeholder="Name" value={viewport.name.length > 0 ? viewport.name : ''} />
      </div>
      <div className="uk-width-1-4@s">
        <input className="uk-input" type="number" onChange={e => handleRow(e, index, 'viewport-width')} placeholder="Width" value={viewport.width.length > 0 ? viewport.width : ''} />
      </div>
      <div className="uk-width-1-4@s">
        <input className="uk-input" type="number" onChange={e => handleRow(e, index, 'viewport-height')} placeholder="Height" value={viewport.height.length > 0 ? viewport.height : ''} />
      </div>
      <div className="uk-width-1-6@s row__actions">
        {disabledRemoveButton && <button uk-icon="icon: trash" disabled onClick={e => removeRow(e, index, 'viewport')} />}
        {!disabledRemoveButton && <button uk-icon="icon: trash" uk-tooltip="title: Remove; pos: right-center;" onClick={e => removeRow(e, index, 'viewport')} />}
      </div>
    </div>
  </div>
)

export default WorkspaceFormViewport
