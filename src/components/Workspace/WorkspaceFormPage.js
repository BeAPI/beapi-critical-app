import React from 'react'

const WorkspaceFormPage = ({index, disabledRemoveButton, page, handleRow, removeRow}) => (
  <div className="row">
    <div className="uk-grid-small" uk-grid="">
      <div className="uk-width-1-3@s">
        <input className="uk-input" type="text" onChange={e => handleRow(e, index, 'page-name')} placeholder="Page name" value={page.name.length > 0 ? page.name : ''} />
      </div>
      <div className="uk-width-1-2@s">
        <input className="uk-input" type="text" onChange={e => handleRow(e, index, 'page-path')} placeholder="Page path" value={page.path.length > 0 ? page.path : ''} />
      </div>
      <div className="uk-width-1-6@s row__actions">
        {disabledRemoveButton && <button uk-icon="icon: trash" disabled onClick={e => removeRow(e, index, 'page')} />}
        {!disabledRemoveButton && <button uk-icon="icon: trash" uk-tooltip="title: Remove; pos: right-center;" onClick={e => removeRow(e, index, 'page')} />}
      </div>
    </div>
  </div>
)

export default WorkspaceFormPage
