import React from 'react'

import WorkspaceWelcome from './WorkspaceWelcome'
import WorkspaceDrop from './WorkspaceDrop'
import WorkspaceForm from './WorkspaceForm'
import WorkspaceConfigInfos from './WorkspaceConfigInfos'
import WorkspaceLoading from './WorkspaceLoading'

const Index = ({
  handleClickStep,
  handleDropConfigFile,
  handleChangeConfigFile,
  handleChangeStyleFile,
  handleFormSubmit,
  handleSave,
  path,
  step,
  config,
  configPath,
  compiledElements,
  loadingText
}) => (
  <div className="workspace">
    <div className="uk-flex uk-flex-middle uk-flex-between">
      {/* Screen 0 */}
      {step === 0 && <WorkspaceWelcome handleClickStep={handleClickStep} />}
      {/* Screen 1 */}
      {(step === 1 && path === 'open') && <WorkspaceDrop
        text="Drag and drop your JSON configuration file or"
        acceptedExtension=".json"
        handleDropFile={handleDropConfigFile}
        handleChangeFile={handleChangeConfigFile}
      />}
      {(step === 1 && path === 'new') && <WorkspaceForm
        handleSave={handleSave}
      />}
      {/* Screen 2 */}
      {(step === 2 && configPath) && <WorkspaceConfigInfos
        config={config}
        handleDropConfigFile={handleDropConfigFile}
        handleChangeConfigFile={handleChangeConfigFile}
        handleChangeStyleFile={handleChangeStyleFile}
        handleFormSubmit={handleFormSubmit}
      />}
      {/* Screen 3 */}
      {(step === 3 && compiledElements.length > 0) && <WorkspaceLoading loadingText={loadingText} compiledElements={compiledElements} />}
      {(step === 3 && !compiledElements) && <div>Loaded !</div>}
    </div>
  </div>
)

export default Index;
