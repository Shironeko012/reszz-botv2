const events = [

"Seekor naga muncul di gunung utara.",
"Harta karun ditemukan di hutan.",
"Dungeon misterius terbuka.",
"Monster langka muncul."

]

function randomEvent(){

return events[Math.floor(Math.random()*events.length)]

}

module.exports = { randomEvent }
