import React from 'react'

import WorkspaceWelcome from './WorkspaceWelcome'
import WorkspaceForm from './WorkspaceForm'
import WorkspaceLoading from './WorkspaceLoading'

const Index = ({
  handleFormScreen,
  handleDropConfigFile,
  handleChangeConfigFile,
  handleChangeStyleFile,
  handleFormSubmit,
  handleSave,
  handleProjectName,
  handleEnv,
  addNewPage,
  addNewViewport,
  removeRow,
  handleRow,
  generateCritical,
  step,
  config,
  configValidity,
  compiledElements,
  loadingText,
  stylePath
}) => (
  <div className="workspace">
    <div className="uk-flex uk-flex-middle uk-flex-between">
      {/* Screen 0 */}
      {step === 0 && <WorkspaceWelcome
        text="Drag and drop your JSON configuration file or"
        acceptedExtension=".json"
        handleFormScreen={handleFormScreen}
        handleDropFile={handleDropConfigFile}
        handleChangeFile={handleChangeConfigFile}
      />}
      {/* Screen 1 */}
      {step === 1 && <WorkspaceForm
        config={config}
        configValidity={configValidity}
        handleDropConfigFile={handleDropConfigFile}
        handleChangeConfigFile={handleChangeConfigFile}
        handleChangeStyleFile={handleChangeStyleFile}
        handleFormSubmit={handleFormSubmit}
        handleSave={handleSave}
        handleProjectName={handleProjectName}
        handleEnv={handleEnv}
        addNewPage={addNewPage}
        addNewViewport={addNewViewport}
        removeRow={removeRow}
        handleRow={handleRow}
        generateCritical={generateCritical}
        stylePath={stylePath}
      />}
      {/* Screen 2 */}
      {(step === 2 && compiledElements.length > 0) && <WorkspaceLoading loadingText={loadingText} compiledElements={compiledElements} />}
      {/* {(step === 3 && !compiledElements) && <div>Loaded !</div>} */}
    </div>
  </div>
)

export default Index;
