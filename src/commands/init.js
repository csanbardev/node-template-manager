const path = require('path')
const fse = require('fs-extra')
const { execSync, exec } = require('child_process')
const { creator } = require('../utils/creator')

const init = (argv) => {
  const { template, projectPath } = argv
  console.log('Has elegido la plantilla ', template)

  try {
    // execute npm init
    execSync('npm init -y')

    const templatePath = path.join(__dirname, `../templates/${template}/${template}.json`)
    
    const templateData = readJSONFile(templatePath)

    // create files & folders
    creator(templateData.project, projectPath, template)
  } catch (error) {
    console.log('init function error: ',error)
  }
}

const readJSONFile = (path) => {
  try {
    const content = fse.readFileSync(path, 'utf-8')
    const data = JSON.parse(content)
    return data
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error.message);
    return null;
  }
}




module.exports = {
  init,
}