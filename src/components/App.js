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
      path: undefined,
      config: [],
      configPath: false,
      stylePath: false,
      styleFilename: undefined,
      compiledElements: [],
      loadingText: undefined
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
  /**
   * Click handler to display first screen
   * @param {Object} e Click Event
   * @param {Number} step The step of the user path
   */
  handleClickNew(e, step) {
    if (step === 0) {
      this.setState({
        step,
        path: undefined,
        config: [],
        configPath: false,
        stylePath: false,
        styleFilename: undefined,
        compiledElements: [],
        loadingText: undefined
      })
    } else {
      this.setState({step})
    }
  }
  /**
   * Define the path "New" or "Open"
   * @param {Object} e Click Event
   * @param {String} path The user path "New" or "Open" state
   */
  handleClickStep(e, path) {
    this.setState({
      path,
      step: 1
    })
  }
  /**
   * Check if configuration object is valid
   */
  checkConfigValidity(fileContent) {
    if (fileContent.url.length === 0 || !fileContent.url.match(/(https?:\/\/[^\s]+)/g)) {
      UIkit.notification({
        message: 'The url is missing or wrong',
        status: 'danger',
        pos: 'top-right',
      })

      return false
    } else if (fileContent.pages[0].name.length === 0 || fileContent.pages[0].path.length === 0) {
      UIkit.notification({
        message: 'Pages are missing',
        status: 'danger',
        pos: 'top-right',
      })

      return false
    } else if (fileContent.viewports[0].name.length === 0 || fileContent.viewports[0].width.length === 0 || fileContent.viewports[0].height.length === 0) {
      UIkit.notification({
        message: 'Viewports informations are wrong',
        status: 'danger',
        pos: 'top-right',
      })

      return false
    } else {
      return true
    }
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

    const file = files[0]

    if (typeof file !== 'undefined') {
      if (file.type !== 'application/json') {
        UIkit.notification({
          message: 'Not a JSON file',
          status: 'danger',
          pos: 'top-right',
        })
      } else {
        const fileContent = JSON.parse(fs.readFileSync(file.path))

        if (this.checkConfigValidity(fileContent)) {
          this.setState({
            step: 2,
            config: fileContent,
            configPath: file.path,
          })
        }
      }
    }
  }
  /**
   * Get file uploaded
   * @param {Object} e Event that contains file informations
   */
  handleChangeConfigFile(e) {
    const file = e.target.files[0]

    if (typeof file !== 'undefined') {
      if (file.type !== 'application/json') {
        UIkit.notification({
          message: 'Not a JSON file',
          status: 'danger',
          pos: 'top-right',
        })
      } else {
        this.setState({
          step: 2,
          config: JSON.parse(fs.readFileSync(file.path)),
          configPath: file.path,
        })
      }
    }
  }
  /**
   * Get CSS file from input file upload and get Critical CSS
   * @param {Object} e Change Event
   */
  handleChangeStyleFile(e) {
    const file = e.target.files[0]

    if (typeof file !== 'undefined') {
      if (file.type !== 'text/css') {
        UIkit.notification({
          message: 'Not a CSS file',
          status: 'danger',
          pos: 'top-right',
        })
      } else {
        this.setState({
          step: 3,
          compiling: true,
          stylePath: file.path,
          styleFilename: file.name,
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
    }
  }
  /**
   * Save Method
   */
  handleSave(configuration) {
    console.log(configuration)
    let formatedConfiguration = configuration
    const filename = formatedConfiguration.name

    // Remove empty pages array
    formatedConfiguration.pages.forEach((page, i) => {
      if(page.name.length === 0 || page.path.length === 0) {
        formatedConfiguration.pages.splice(i, 1)
      }
    })

    // Remove empty viewports array
    formatedConfiguration.viewports.forEach((viewport, i) => {
      if(viewport.name.length === 0 || viewport.width.length === 0 || viewport.height.length === 0) {
        formatedConfiguration.viewports.splice(i, 1)
      }
    })

    if (this.checkConfigValidity(configuration)) {
      dialog.showSaveDialog({
        title: 'Save your configuration file',
        filters: [{
          name: filename,
          extensions: ['json']
        }]
      }, filename => {
        if (filename === undefined) {
          return
        }

        fs.writeFile(filename, JSON.stringify(formatedConfiguration), err => {
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
  render() {
    const {step, path, config, configPath, stylePath, styleFilename, compiledElements, loadingText} = this.state

    return (
      <FileDrop className="app" onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={(files, e) => this.handleDropConfigFile(files, e)}>
        <Toolbar
          handleClickNew={this.handleClickNew.bind(this)}
          handleClickStep={this.handleClickStep.bind(this)}
          handleChangeConfigFile={this.handleChangeConfigFile.bind(this)}
        />
        <Workspace
          step={step}
          path={path}
          config={config}
          configPath={configPath}
          stylePath={stylePath}
          compiledElements={compiledElements}
          loadingText={loadingText}
          styleFilename={styleFilename}
          handleClickStep={this.handleClickStep.bind(this)}
          handleDropConfigFile={this.handleDropConfigFile.bind(this)}
          handleChangeConfigFile={this.handleChangeConfigFile.bind(this)}
          handleChangeStyleFile={this.handleChangeStyleFile.bind(this)}
          handleSave={this.handleSave.bind(this)}
        />
      </FileDrop>
    )
  }
}

export default App
