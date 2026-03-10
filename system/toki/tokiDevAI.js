const axios = require("axios")
const { readBotCode } = require("./tokiCodeReader")

async function analyzeBug(error){

const code = readBotCode()

try{

const res = await axios.post(
"https://api.itsrose.rest/chatGPT/turbo",
{
prompt:`
Analisa bug berikut:

ERROR:
${error}

CODE:
${code}
`
})

return res.data.result

}catch{

return "Toki gagal menganalisa bug."

}

}

module.exports = { analyzeBug }
