const tiers = {
common:1,
rare:2,
epic:3,
legendary:4
}

function getTierValue(tier){
return tiers[tier] || 0
}

module.exports = { getTierValue }