import React, { Component } from 'react';
import UIkit from 'uikit'

import Toolbar from './Toolbar/Index'
import Workspace from './Workspace/Index'
import Critical from './../critical'

// https://github.com/electron/electron/issues/7300
const electron = window.require('electron')
const fs = electron.remote.require('fs')

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
      compiling: false,
    }
  }
  /**
   * Click handler to display first screen
   * @param {Object} e Click Event
   * @param {Number} step The step of the user path
   */
  handleClickNew(e, step) {
    this.setState({step})
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
   * Get file dropped
   * @param {Object} files Object that contains files informations
   * @param {Object} e Drop Event
   */
  handleDropConfigFile(files, e) {
    e.preventDefault()

    const file = files[0]

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

          const critical = new Critical(configPath, stylePath, styleFilename).init()

          critical.map(item => {
            item.then(function(e) {
              console.log(e)
            })
          })
        })
      }
    }
  }
  render() {
    const {step, path, config, configPath, stylePath, styleFilename, compiling} = this.state

    return (
      <div className="app">
        <Toolbar handleClickNew={this.handleClickNew.bind(this)} />
        <Workspace
          step={step}
          path={path}
          config={config}
          configPath={configPath}
          stylePath={stylePath}
          compiling={compiling}
          styleFilename={styleFilename}
          handleClickStep={this.handleClickStep.bind(this)}
          handleDropConfigFile={this.handleDropConfigFile.bind(this)}
          handleChangeConfigFile={this.handleChangeConfigFile.bind(this)}
          handleChangeStyleFile={this.handleChangeStyleFile.bind(this)}
        />
      </div>
    );
  }
}

export default App;
