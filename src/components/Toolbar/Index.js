import React from 'react'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)

const Index = ({handleClickNew}) => {
  return (
    <div className="toolbar">
      <nav className="uk-navbar" uk-navbar="mode: click">
          <div className="uk-navbar-center">
              <ul className="uk-navbar-nav">
                  <li>
                    <button onClick={e => handleClickNew(e, 0)} className="uk-button" uk-icon="file" uk-tooltip="title: New; pos: bottom-center;" />
                  </li>
                  <li>
                    <button className="uk-button" uk-icon="file-edit" uk-tooltip="title: Create config file; pos: bottom-center;" />
                  </li>
                  <li>
                    <button className="uk-button" uk-icon="upload" uk-tooltip="title: Import config file; pos: bottom-center;" />
                  </li>
                  <li>
                    <button className="uk-button" uk-icon="download" uk-tooltip="title: Export styles; pos: bottom-center;" disabled />
                  </li>
                  <li>
                    <button className="uk-button" uk-icon="settings" uk-tooltip="title: Export styles; pos: bottom-center;" disabled />
                  </li>
              </ul>
          </div>
      </nav>
    </div>
  )
}

export default Index