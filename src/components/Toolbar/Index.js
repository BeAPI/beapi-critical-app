import React from 'react'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)

const Index = ({handleClickNew, handleChangeConfigFile}) => {
  return (
    <div className="toolbar">
      <nav className="uk-navbar" uk-navbar="mode: click">
        <div className="uk-navbar-left">
          <ul className="uk-iconnav">
            <li>
              <button onClick={e => handleClickNew(e, 0)} className="uk-button" uk-icon="file" uk-tooltip="title: New; pos: bottom-center;" />
            </li>
            <li>
              <button onClick={e => handleClickNew(e, 1)} className="uk-button" uk-icon="file-edit" uk-tooltip="title: New configuration file; pos: bottom-center;" />
            </li>
            <li>
              <div className="uk-form-custom">
                <input type="file" accept=".json" onChange={e => handleChangeConfigFile(e)} uk-tooltip="title: Open; pos: bottom-center;" />
                <button className="uk-button" uk-icon="folder" />
              </div>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-iconnav">
            <li>
              <button className="uk-button" uk-icon="settings" uk-tooltip="title: Settings; pos: bottom-center;" disabled />
            </li>
            <li>
              <button className="uk-button" uk-icon="info" uk-tooltip="title: About; pos: bottom-center;" disabled />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Index