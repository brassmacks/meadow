const fortuneCookies = ["Conquer your fears or they will conquer you.",
  "Rivers need springs.", "Do not fear what you don't know.", "You will have a pleasant surprise.",
  "Whenever possible, keep it simple",
  "Those who do not remember the past, are condemned to repeat it", "A leader is powerful to the degree that he empowers others."]

  exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
  }