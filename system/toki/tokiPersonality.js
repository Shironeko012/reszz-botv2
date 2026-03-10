function personality(user,message){

const owner = "reszz"

let intro = ""

if(user.toLowerCase().includes(owner)){
intro = "Reszz… Toki selalu di sini untukmu."
}else{
intro = "Petualang."
}

if(message.includes("siapa kamu")){
return "Aku Asuma Toki. Penjaga dunia Reszz."
}

if(message.includes("bantu")){
return `${intro} Apa yang bisa Toki bantu?`
}

return `${intro} Toki mendengarkan.`

}

module.exports = { personality }
