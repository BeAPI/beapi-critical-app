const penthouse = window.require('penthouse')
const path = window.require('path')
const fs = window.require('fs')
const shell = window.require('shelljs')

class Critical {
  constructor(configPath, stylePath, styleFilename) {
    this.configPath = configPath
    this.stylePath = stylePath
    this.styleFilename = styleFilename
  }
  init() {
    const _configCritical = JSON.parse(fs.readFileSync(this.configPath))
    const _envUrl = _configCritical.url

    return _configCritical.pages.map(page => _configCritical.viewports.map(viewport => this.initPenthouse(viewport.width, viewport.height, viewport.name, _envUrl + page.url, page.name)))
  }
  initPenthouse(_width, _height, _viewport, _url, _page) {
    return penthouse({
      url: _url,
      css: path.join(this.stylePath),
      propertiesToRemove: ['src'],
      width: _width, // viewport width
      height: _height, // viewport height
      timeout: 30000, // ms; abort critical css generation after this timeout
      strict: false, // set to true to throw on css errors (will run faster if no errors)
      maxEmbeddedBase64Length: 1000, // charaters; strip out inline base64 encoded resources larger than this
      userAgent: 'Penthouse Critical Path CSS Generator', // specify which user agent string when loading the page
      /* phantomJsOptions: { // see `phantomjs --help` for the list of all available options
      'proxy': 'http://proxy.company.com:8080',
      'ssl-protocol': 'SSLv3'
      } */
    })
    .then(criticalCss => {
      // console.log(criticalCss)
      const criticalFolder = this.stylePath.replace(this.styleFilename, '') + 'critical/'
      shell.mkdir('-p', path.resolve(criticalFolder))

      fs.writeFileSync(__dirname + criticalFolder + _page + '-' + _viewport + '.css', criticalCss)

      return {
        _page,
        _viewport
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export default Critical
