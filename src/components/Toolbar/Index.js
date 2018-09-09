import React from 'react'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)

const Index = () => {
  return (
    <div className="toolbar">
      <nav className="uk-navbar uk-margin" uk-navbar="mode: click">
          <div className="uk-navbar-center">
              <ul className="uk-navbar-nav">
                  <li>
                    <button className="uk-button" uk-icon="file" uk-tooltip="title: Hello World; pos: top-left" />
                  </li>
                  <li>
                    <button className="uk-button" uk-icon="folder" uk-tooltip="title: Hello World; pos: top-left" />
                  </li>
              </ul>
          </div>
      </nav>
    </div>
  )
}

export default Index