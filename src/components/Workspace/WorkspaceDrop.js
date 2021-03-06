import React from 'react'

import FileDrop from 'react-file-drop'

const WorkspaceDrop = ({handleDropFile, handleChangeFile, text, acceptedExtension}) => (
  <div className="workspace__drop">
    <FileDrop className="js-upload uk-placeholder uk-text-center" onDrop={(files, e) => handleDropFile(files, e)}>
      <span className="uk-text-middle"> <span uk-icon="icon: cloud-upload" />{text}</span>
      <div uk-form-custom="">
        <input type="file" accept={acceptedExtension} onChange={e => handleChangeFile(e.target.files[0])} />
        <span className="uk-link">selecting one</span>
      </div>
    </FileDrop>
  </div>
)

export default WorkspaceDrop