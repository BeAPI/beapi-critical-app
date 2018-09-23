const penthouse = window.require('penthouse')
const path = window.require('path')
const fs = window.require('fs')
const shell = window.require('shelljs')

class Critical {
  constructor(url, page, viewportName, viewportWidth, viewportHeight, stylePath, styleFilename) {
    this.url = url
    this.page = page
    this.viewportName = viewportName
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
    this.stylePath = stylePath
    this.styleFilename = styleFilename
  }
  init() {
    return penthouse({
      url: this.url,
      css: path.join(this.stylePath),
      propertiesToRemove: ['src'],
      width: this.viewportWidth, // viewport width
      height: this.viewportHeight, // viewport height
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

      fs.writeFileSync(__dirname + criticalFolder + this.page + '-' + this.viewportName + '.css', criticalCss)

      return {
        page: this.page,
        viewport: this.viewportName
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export default Critical
