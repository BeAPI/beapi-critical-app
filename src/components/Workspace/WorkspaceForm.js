import React, {Component, Fragment} from 'react'

import Highlight from 'react-highlight'
import 'highlight.js/styles/atelier-heath-dark.css'

import WorkspaceFormPage from './WorkspaceFormPage'
import WorkspaceFormViewport from './WorkspaceFormViewport'
import WorkspaceDrop from './WorkspaceDrop'

class WorkspaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlight: true
    }
  }
  handleHightlightDisplay(e) {
    this.setState({
      highlight: !this.state.highlight
    })
  }
  render() {
    const {highlight} = this.state
    const {
      config,
      configValidity,
      stylePath,
      handleSave,
      handleDropStyleFile,
      handleChangeStyleFile,
      handleProjectName,
      handleEnv,
      addNewPage,
      addNewViewport,
      removeRow,
      handleRow,
      generateCritical,
    } = this.props

    return (
      <Fragment>
        <div className={`${highlight ? 'uk-width-1-2' : 'uk-width-1-1'} workspace__infos`}>
          <ul className="uk-iconnav">
            <li><button type="button" onClick={() => handleSave(config)} uk-icon="download" uk-tooltip="title: Save; pos: bottom-center;" /></li>
            <li><button className="trigger-code" onClick={this.handleHightlightDisplay.bind(this)} uk-icon="icon: code" uk-tooltip={`title: ${highlight ? 'Hide JSON Object' : 'See JSON Object'}; pos: bottom-center;`} /></li>
          </ul>

          <div className="uk-inline">
            <button className="uk-form-icon uk-form-icon-flip" uk-icon="icon: pencil" onClick={e => {e.target.closest('.uk-inline').querySelector('.uk-input').focus()}} />
            <input className="uk-input uk-form-blank uk-form-large uk-form-width-large" onChange={e => handleProjectName(e)} type="text" placeholder="Untitled Project" value={(typeof config.name !== 'undefined' && config.name.length > 0 )? config.name : ''} />
          </div>

          <ul uk-accordion="multiple: true;">
            <li>
              <a className="uk-accordion-title"><span className="uk-margin-small-right" uk-icon="link" /> Environment</a>
              <div className="uk-accordion-content">
                <input className="uk-input" onChange={e => handleEnv(e)} type="url" placeholder="https://beapi.fr" value={(typeof config.url !== 'undefined' && config.url.length > 0) ? config.url : ''} />
              </div>
            </li>
            <li>
              <a className="uk-accordion-title"><span className="uk-margin-small-right" uk-icon="copy" /> Pages</a>
              <div className="uk-accordion-content">
                {config.pages.map((page, i) => (
                  <WorkspaceFormPage key={`page-row-${i}`} index={i} disabledRemoveButton={config.pages.length === 1} page={config.pages[i]} handleRow={handleRow} removeRow={removeRow} />
                ))}

                <button type="button" className="uk-text-center" uk-tooltip="title: Add a new page; pos: right-center;" onClick={() => addNewPage()} uk-icon="plus-circle" />
              </div>
            </li>
            <li>
              <a className="uk-accordion-title"><span className="uk-margin-small-right" uk-icon="laptop" /> Viewports</a>
              <div className="uk-accordion-content">
                {config.viewports.map((viewport, i) => (
                  <WorkspaceFormViewport key={`viewport-row-${i}`} index={i} disabledRemoveButton={config.viewports.length === 1} viewport={config.viewports[i]} handleRow={handleRow} removeRow={removeRow} />
                ))}

                <button type="button" className="uk-text-center" uk-tooltip="title: Add a new viewport; pos: right-center;" onClick={() => addNewViewport()} uk-icon="plus-circle" />
              </div>
            </li>
          </ul>

          <hr className="uk-divider-icon" />

          {typeof stylePath === 'undefined' && <WorkspaceDrop
              text="Drag and drop your CSS file or"
              acceptedExtension=".css"
              handleDropFile={handleDropStyleFile}
              handleChangeFile={handleChangeStyleFile}
            />
          }

          {typeof stylePath !== 'undefined' &&
            <Fragment>
              <div className="uk-margin">
                <dl className="uk-description-list">
                  <dt>Import your CSS</dt>
                  <dd>
                    <div uk-form-custom="target: true">
                      <input type="file" onChange={e => handleChangeStyleFile(e)} />
                      <button className="uk-form-icon uk-form-icon-flip" uk-icon="icon: pencil" onClick={e => {e.target.closest('.uk-inline').querySelector('.uk-input').focus()}} />
                      <input className="uk-input uk-form-blank uk-form-width-large" onChange={e => handleProjectName(e)} type="text" value={stylePath} />
                    </div>
                  </dd>
                </dl>
              </div>

              {configValidity && <button className="uk-button uk-button-secondary uk-width-1-1 uk-margin-small-bottom" onClick={() => generateCritical()}>Generate Critial CSS</button>}
            </Fragment>
          }
        </div>
        <div className={`${highlight ? 'uk-width-1-2' : 'uk-width-0'} workspace__highlight`}>
          <Highlight className="json">{JSON.stringify(config, null, '\t')}</Highlight>
        </div>
      </Fragment>
    )
  }
}

export default WorkspaceForm