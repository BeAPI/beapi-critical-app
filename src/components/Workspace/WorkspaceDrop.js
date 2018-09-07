import React from 'react'

import FileDrop from 'react-file-drop'

const WorkspaceDrop = ({handleDrop}) => (
  <FileDrop className="workspace__drop" onDrop={(files, e) => handleDrop(files, e)}></FileDrop>
)

export default WorkspaceDrop