import React, {Component, Fragment} from 'react'

import Highlight from 'react-highlight'
import 'highlight.js/styles/atelier-heath-dark.css'

import WorkspaceFormPage from './WorkspaceFormPage'
import WorkspaceFormViewport from './WorkspaceFormViewport'

class WorkspaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      configuration: {
        name: 'Untitled Project',
        url: '',
        pages: [{name: '', path: ''}],
        viewports: [{name: '', width: '', height: ''}],
      },
      highlight: true
    }

    this.addNewPage = this.addNewPage.bind(this)
    this.addNewViewport = this.addNewViewport.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.handleRow = this.handleRow.bind(this)
  }
  handleHightlightDisplay(e) {
    this.setState({
      highlight: !this.state.highlight
    })
  }
  handleProjectName(e) {
    const {configuration} = this.state
    let value = e.target.value

    if (value.length === 0) {
      value = 'Untitled Project'
    }

    this.setState({
      configuration: {
        name: value,
        url: configuration.url,
        pages: configuration.pages,
        viewports: configuration.viewports,
      }
    })
  }
  handleEnv(e) {
    const {configuration} = this.state
    let value = e.target.value

    if (value.match(/(https?:\/\/[^\s]+)/g)) {
      e.target.classList.remove('uk-form-danger')

      this.setState({
        configuration: {
          name: configuration.name,
          url: value,
          pages: configuration.pages,
          viewports: configuration.viewports,
        }
      })
    } else {
      if (value.length) {
        e.target.classList.add('uk-form-danger')
      }

      this.setState({
        configuration: {
          name: configuration.name,
          url: '',
          pages: configuration.pages,
          viewports: configuration.viewports,
        }
      })
    }
  }
  addNewPage() {
    const {configuration} = this.state

    this.setState({
      configuration: {
        name: configuration.name,
        url: configuration.url,
        pages: [...configuration.pages, {name: '', path: ''}],
        viewports: configuration.viewports,
      }
    })
  }
  addNewViewport() {
    const {configuration} = this.state

    this.setState({
      configuration: {
        name: configuration.name,
        url: configuration.url,
        pages: configuration.pages,
        viewports: [...configuration.viewports, {name: '', width: '', height: ''}],
      }
    })
  }
  removeRow(e, index, type) {
    const {configuration} = this.state

    switch (type) {
      case 'page':
        const newPages = configuration.pages.splice(index, 1)

        this.setState({
          name: configuration.name,
          url: configuration.url,
          pages: newPages,
          viewports: configuration.viewports,
        })
        break

      case 'viewport':
        const newViewports = configuration.viewports.splice(index, 1)

        this.setState({
          name: configuration.name,
          url: configuration.url,
          pages: configuration.pages,
          viewports: newViewports,
        })
        break

      default:
        return false
    }
  }
  handleRow(e, index, key) {
    const {configuration} = this.state
    const {pages, viewports} = configuration
    const value = e.target.value

    switch (key) {
      case 'page-name':
        pages[index].name = value
        break
      case 'page-path':
        pages[index].path = value.toLowerCase()
        break
      case 'viewport-name':
        viewports[index].name = value
        break
      case 'viewport-width':
        viewports[index].width = value
        break
      case 'viewport-height':
        viewports[index].height = value
        break
      default:
        return false
    }

    this.setState({
      configuration: {
        name: configuration.name,
        url: configuration.url,
        pages: configuration.pages,
        viewports: configuration.viewports,
      }
    })
  }
  render() {
    const {configuration, highlight} = this.state
    const {handleSave} = this.props

    return (
      <Fragment>
        <div className={`${highlight ? 'uk-width-1-2' : 'uk-width-1-1'} workspace__infos`}>
          <button className="trigger-code" onClick={this.handleHightlightDisplay.bind(this)} uk-icon="icon: code" uk-tooltip={`title: ${highlight ? 'Hide JSON Object' : 'See JSON Object'}; pos: bottom-center;`} />
          <div className="uk-inline">
            <button className="uk-form-icon uk-form-icon-flip" uk-icon="icon: pencil" onClick={e => {e.target.closest('.uk-inline').querySelector('.uk-input').focus()}} />
            <input className="uk-input uk-form-blank uk-form-large uk-form-width-large" onChange={this.handleProjectName.bind(this)} type="text" placeholder="Project Name" />
          </div>

          <hr className="uk-divider-icon" />

          <fieldset className="uk-fieldset">
            <legend className="uk-legend"><span className="uk-margin-small-right" uk-icon="link" /> Environment</legend>

            <input className="uk-input" onChange={this.handleEnv.bind(this)} type="url" placeholder="https://beapi.fr" />
          </fieldset>

          <hr className="uk-divider-icon" />

          <fieldset className="uk-fieldset">
            <legend className="uk-legend"><span className="uk-margin-small-right" uk-icon="copy" /> Pages</legend>

            {configuration.pages.map((page, i) => (
              <WorkspaceFormPage key={`page-row-${i}`} index={i} disabledRemoveButton={configuration.pages.length === 1} page={configuration.pages[i]} handleRow={this.handleRow} removeRow={this.removeRow} />
            ))}

            <button type="button" className="uk-text-center" uk-tooltip="title: Add a new page; pos: right-center;" onClick={this.addNewPage} uk-icon="plus-circle" />
          </fieldset>

          <hr className="uk-divider-icon" />

          <fieldset className="uk-fieldset">
            <legend className="uk-legend"><span className="uk-margin-small-right" uk-icon="laptop" /> Viewports</legend>

            {configuration.viewports.map((viewport, i) => (
              <WorkspaceFormViewport key={`viewport-row-${i}`} index={i} disabledRemoveButton={configuration.viewports.length === 1} viewport={configuration.viewports[i]} handleRow={this.handleRow} removeRow={this.removeRow} />
            ))}

            <button type="button" className="uk-text-center" uk-tooltip="title: Add a new viewport; pos: right-center;" onClick={this.addNewViewport} uk-icon="plus-circle" />
          </fieldset>

          <hr className="uk-divider-icon" />
          <button type="button" onClick={() => handleSave(configuration)} className="uk-button uk-button-default">Save as...</button>
        </div>
        <div className={`${highlight ? 'uk-width-1-2' : 'uk-width-0'} workspace__highlight`}>
          <Highlight className="json">{JSON.stringify(configuration, null, '\t')}</Highlight>
        </div>
      </Fragment>
    )
  }
}

export default WorkspaceForm