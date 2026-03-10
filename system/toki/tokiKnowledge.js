const fs = require("fs")
const path = require("path")

function listCommands(){

const dir = path.join(process.cwd(),"commands")

const files = fs.readdirSync(dir)

return "Command bot:\n\n"+files.join("\n")

}

module.exports = { listCommands }
