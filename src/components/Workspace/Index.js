import React, { Component } from 'react';

import WorkspaceDrop from './WorkspaceDrop'
import WorkspaceConfigInfos from './WorkspaceConfigInfos'
import Critical from './../../critical'

// https://github.com/electron/electron/issues/7300
const fs = window.require('fs')

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: [],
      configPath: false,
      stylePath: false,
      styleFilename: undefined,
    }
  }

  handleDropConfig(files, e) {
    e.preventDefault()

    const file = files[0]

    if (file.type !== 'application/json') {
      console.log('Not a json file')
    } else {
      this.setState({
        config: JSON.parse(fs.readFileSync(file.path)),
        configPath: file.path,
      })
    }
  }
  handleFormSubmit(e) {
    const {configPath, stylePath, styleFilename} = this.state
    e.preventDefault()

    new Critical(configPath, stylePath, styleFilename).init()
  }
  handleChange(e) {
    const file = e.target.files[0]

    if (file.type !== 'text/css') {
      console.log('Not a css file')
    } else {
      this.setState({
        stylePath: file.path,
        styleFilename: file.name,
      })
    }
  }
  render() {
    const {config, configPath} = this.state
    return (
      <div className="workspace">
        {!configPath && <WorkspaceDrop type="application/json" handleDrop={this.handleDropConfig.bind(this)} />}
        {configPath && <WorkspaceConfigInfos config={config} handleChange={this.handleChange.bind(this)} handleFormSubmit={this.handleFormSubmit.bind(this)} />}
      </div>
    );
  }
}

export default Index;
