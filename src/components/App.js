import React, { Component } from 'react'
import UIkit from 'uikit'

import FileDrop from 'react-file-drop'
import Toolbar from './Toolbar/Index'
import Workspace from './Workspace/Index'
import Critical from './../critical'

// https://github.com/electron/electron/issues/7300
const app = window.require('electron').remote
const dialog = app.dialog
const fs = app.require('fs')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      config: {
        name: 'Untitled Project',
        url: '',
        pages: [{name: '', path: ''}],
        viewports: [{name: '', width: '', height: ''}],
      },
      configPath: undefined,
      stylePath: undefined,
      styleFilename: undefined,
      compiledElements: [],
      loadingText: undefined
    }
  }
  componentDidMount() {
    if (!window.localStorage.getItem('recentOpenedFiles')) {
      window.localStorage.setItem('recentOpenedFiles', '[]')
    }
  }
  dragOver() {
    const $app = document.querySelector('.app')

    if (!$app.classList.contains('dragged')) {
      $app.classList.add('dragged')
    }
  }
  dragLeave() {
    const $app = document.querySelector('.app')

    if ($app.classList.contains('dragged')) {
      $app.classList.remove('dragged')
    }
  }
  handleFormScreen() {
    this.setState({
      step: 1
    })
  }
  /**
   * Click handler to display first screen
   * @param {Object} e Click Event
   * @param {Number} step The step of the user path
   */
  handleClickNew(e, step) {
    this.setState({
      step,
      config: {
        name: 'Untitled Project',
        url: '',
        pages: [{name: '', path: ''}],
        viewports: [{name: '', width: '', height: ''}],
      },
      configPath: undefined,
      stylePath: undefined,
      styleFilename: undefined,
      compiledElements: [],
      loadingText: undefined
    })
  }
  /**
   * Check if configuration object is valid
   * @param {Object} fileContent Configuration Object
   * @param {Boolean} notification Display UIKit notification
   */
  checkConfigValidity(fileContent, notification = false) {
    if (fileContent.url.length === 0 || !fileContent.url.match(/(https?:\/\/[^\s]+)/g)) {
      if (notification) {
        UIkit.notification({
          message: 'The url is missing or wrong',
          status: 'danger',
          pos: 'top-right',
        })
      }

      return false
    } else if (fileContent.pages[0].name.length === 0 || fileContent.pages[0].path.length === 0) {
      if (notification) {
        UIkit.notification({
          message: 'Pages are missing',
          status: 'danger',
          pos: 'top-right',
        })
      }

      return false
    } else if (fileContent.viewports[0].name.length === 0 || fileContent.viewports[0].width.length === 0 || fileContent.viewports[0].height.length === 0) {
      if (notification) {
        UIkit.notification({
          message: 'Viewports informations are wrong',
          status: 'danger',
          pos: 'top-right',
        })
      }

      return false
    } else {
      return true
    }
  }
  /**
   * Open content from a filepath
   * @param {String} filepath file path
   */
  openFile(filepath) {
    const file = {
      type: 'application/json',
      path: filepath
    }

    this.handleChangeConfigFile(file)
  }
  /**
   * Get file dropped
   * @param {Object} files Object that contains files informations
   * @param {Object} e Drop Event
   */
  handleDropConfigFile(files, e) {
    e.preventDefault()

    const $app = document.querySelector('.app')

    if ($app.classList.contains('dragged')) {
      $app.classList.remove('dragged')
    }

    this.handleChangeConfigFile(files[0])
  }
  /**
   * Get file uploaded
   * @param {Object} file Object that contains file informations
   */
  handleChangeConfigFile(file) {
    if (typeof file !== 'undefined') {
      if (file.type !== 'application/json') {
        UIkit.notification({
          message: 'Not a JSON file',
          status: 'danger',
          pos: 'top-right',
        })
      } else {
        if(!fs.existsSync(file.path)) {
          UIkit.notification({
            message: 'File not found',
            status: 'danger',
            pos: 'top-right',
          })
        } else {
          this.updateRecentOpenedFiles(file.path)

          this.setState({
            step: 1,
            config: JSON.parse(fs.readFileSync(file.path)),
            configPath: file.path,
          })
        }
      }
    }
  }
  /**
   * Update Recent Opened files
   * @param {String} filepath Path to file
   */
  updateRecentOpenedFiles(filepath) {
    const recentFiles = JSON.parse(window.localStorage.getItem('recentOpenedFiles'))
    if (!recentFiles.includes(filepath)) {
      recentFiles.unshift(filepath)
    }

    if (recentFiles.length > 5) {
      recentFiles.pop()
    }

    window.localStorage.setItem('recentOpenedFiles', JSON.stringify(recentFiles))
  }
  /**
   * Get CSS file from input file upload
   * @param {Object} file Object that contains file informations
   */
  handleChangeStyleFile(file) {
    if (typeof file !== 'undefined') {
      if (file.type !== 'text/css') {
        UIkit.notification({
          message: 'Not a CSS file',
          status: 'danger',
          pos: 'top-right',
        })
      } else {
        this.setState({
          stylePath: file.path,
          styleFilename: file.name,
        })
      }
    }
  }
  /**
   * Save Configuration file
   * @param {Object} configuration Configuration Object
   */
  handleSave(configuration) {
    let filename = configuration.name

    if (typeof filename === 'undefined') {
      filename = 'Untitled'
    }

    if (this.checkConfigValidity(configuration, true)) {
      dialog.showSaveDialog(window.require('electron').remote.getCurrentWindow(), {
        title: 'Save your configuration file',
        defaultPath: `~/${filename}.json`,
        filters: [
          {
            name: 'JSON',
            extensions: ['json']
          },
          {
            name: 'All Files',
            extensions: ['*']
          }
        ]
      }, filename => {
        if (filename === undefined) {
          return
        }

        fs.writeFile(filename, JSON.stringify(configuration, null, '\t'), err => {
          if (err) {
            UIkit.notification({
              message: err,
              status: 'danger',
              pos: 'top-right',
            })
          }

          UIkit.notification({
            message: 'Configuration file saved',
            status: 'success',
            pos: 'top-right',
          })
        })
      })
    }
  }
  /**
   * Update Project Name
   * @param {Object} e Change Event
   */
  handleProjectName(e) {
    const {config} = this.state
    let value = e.target.value

    if (value.length === 0) {
      value = 'Untitled Project'
    }

    this.setState({
      config: {
        name: value,
        url: config.url,
        pages: config.pages,
        viewports: config.viewports,
      }
    })
  }
  /**
   * Update Environment project
   * @param {Object} e Change Event
   */
  handleEnv(e) {
    const {config} = this.state
    let value = e.target.value

    if (value.match(/(https?:\/\/[^\s]+)/g)) {
      e.target.classList.remove('uk-form-danger')

      this.setState({
        config: {
          name: config.name,
          url: value,
          pages: config.pages,
          viewports: config.viewports,
        }
      })
    } else {
      if (value.length) {
        e.target.classList.add('uk-form-danger')
      }

      this.setState({
        config: {
          name: config.name,
          url: '',
          pages: config.pages,
          viewports: config.viewports,
        }
      })
    }
  }
  /**
   * Add a new blank page field
   */
  addNewPage() {
    const {config} = this.state

    this.setState({
      config: {
        name: config.name,
        url: config.url,
        pages: [...config.pages, {name: '', path: ''}],
        viewports: config.viewports,
      }
    })
  }
  /**
   * Add a new blank viewport field
   */
  addNewViewport() {
    const {config} = this.state

    this.setState({
      config: {
        name: config.name,
        url: config.url,
        pages: config.pages,
        viewports: [...config.viewports, {name: '', width: '', height: ''}],
      }
    })
  }
  /**
   * Remove a row field
   */
  removeRow(e, index, type) {
    const {config} = this.state

    switch (type) {
      case 'page':
        const newPages = config.pages.splice(index, 1)

        this.setState({
          name: config.name,
          url: config.url,
          pages: newPages,
          viewports: config.viewports,
        })
        break

      case 'viewport':
        const newViewports = config.viewports.splice(index, 1)

        this.setState({
          name: config.name,
          url: config.url,
          pages: config.pages,
          viewports: newViewports,
        })
        break

      default:
        return false
    }
  }
  /**
   * Update page or viewports
   */
  handleRow(e, index, key) {
    const {config} = this.state
    const {pages, viewports} = config
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
      config: {
        name: config.name,
        url: config.url,
        pages: config.pages,
        viewports: config.viewports,
      }
    })
  }
  /**
   * Generate Critical CSS
   */
  generateCritical() {
    this.setState({
      step: 2,
      compiling: true,
    }, function () {
      const {configPath, stylePath, styleFilename} = this.state
      let compiledElements = this.state.compiledElements

      const _configCritical = JSON.parse(fs.readFileSync(configPath))
      const _envUrl = _configCritical.url

      _configCritical.pages.map(page => {
        _configCritical.viewports.map(viewport => {
          compiledElements.push({
            page: page.name,
            viewport: viewport.name,
            status: 'loading'
          })

          const critical = new Critical(
            _envUrl + page.path,
            page.name,
            viewport.name,
            viewport.width,
            viewport.height,
            stylePath,
            styleFilename
          ).init()

          critical.then(data => {
            this.setState({
              compiledElements: this.state.compiledElements
                .map(compiledElement =>
                  (compiledElement.page === data.page && compiledElement.viewport === data.viewport)
                  ? Object.assign({}, compiledElement, { status: 'loaded' })
                  : compiledElement
                )
            })
          })
        })
      })

      this.setState({
        compiledElements
      })
    })
  }
  render() {
    const {
      step,
      config,
      configPath,
      stylePath,
      styleFilename,
      compiledElements,
      loadingText
    } = this.state

    return (
      <FileDrop className="app" onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={(files, e) => this.handleDropConfigFile(files, e)}>
        <Toolbar
          handleClickNew={this.handleClickNew.bind(this)}
          handleChangeConfigFile={this.handleChangeConfigFile.bind(this)}
        />
        <Workspace
          step={step}
          config={config}
          configValidity={this.checkConfigValidity(config)}
          configPath={configPath}
          stylePath={stylePath}
          compiledElements={compiledElements}
          loadingText={loadingText}
          styleFilename={styleFilename}
          handleFormScreen={this.handleFormScreen.bind(this)}
          handleDropConfigFile={this.handleDropConfigFile.bind(this)}
          handleChangeConfigFile={this.handleChangeConfigFile.bind(this)}
          handleChangeStyleFile={this.handleChangeStyleFile.bind(this)}
          handleSave={this.handleSave.bind(this)}
          handleProjectName={this.handleProjectName.bind(this)}
          handleEnv={this.handleEnv.bind(this)}
          addNewPage={this.addNewPage.bind(this)}
          addNewViewport={this.addNewViewport.bind(this)}
          removeRow={this.removeRow.bind(this)}
          handleRow={this.handleRow.bind(this)}
          generateCritical={this.generateCritical.bind(this)}
          openFile={this.openFile.bind(this)}
        />
      </FileDrop>
    )
  }
}

export default App
