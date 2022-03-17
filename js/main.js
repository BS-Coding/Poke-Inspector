const resultName = document.querySelector('#name')
const resultImage = document.querySelector('#image')
const resultType1 = document.querySelector('#type1')
const resultType2 = document.querySelector("#type2")
const resultAttack = document.querySelector("#attackType")
const resultDefence = document.querySelector("#defenceType")
const resultStrengths = document.querySelector("#strengths")
const resultWeaknesses = document.querySelector("#weaknesses")

document.querySelector('#searchButton').addEventListener('click', getFetch)
document.querySelector("#randomPoke").addEventListener('click', getFetchRandom)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomNumber(min,max){
  let x = Math.random() * (max-min) + min;
  return Math.round(x);
}

function getFetch(){
  const poke1 = document.querySelector('#poke1').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+poke1
  resultWeaknesses.innerText = ""
  resultName.innerText = ""
  resultImage.src = ""
  resultType1.innerText = ""
  resultType2.innerText = ""
  resultAttack.innerText = ""
  resultDefence.innerText = ""
  document.querySelector("#weaknessesLabel").classList.add("hidden")
  resultName.classList.remove("error");

  fetch(url)
      .then(res => {return res.json()} ) // parse response as JSON
      .then(data => {
        console.log(data);
        let sprite = data['sprites'];
        let type1 = data.types[0].type.name;

        resultName.innerText = capitalizeFirstLetter(data.name);
        resultImage.src = sprite.other["official-artwork"].front_default;
        document.querySelector("#image").classList.remove("hidden")
        resultType1.innerText = `Type 1: ${capitalizeFirstLetter(type1)}`;
        resultType2.innerText = 'Type 2: --'
        

        if(data.stats[1].base_stat > data.stats[3].base_stat){
          resultAttack.innerText = `Physical Attacker(${data.stats[1].base_stat})`
        } else if (data.stats[1].base_stat < data.stats[3].base_stat){
          resultAttack.innerText = `Special Attacker(${data.stats[3].base_stat})`
        } else {
          resultAttack.innerText = `Equal Attack Stats (${data.stats[3].base_stat})`
        }

        if(data.stats[2].base_stat > data.stats[4].base_stat){
          resultDefence.innerText = `Physical Defender(${data.stats[2].base_stat})`
        } else if (data.stats[2].base_stat < data.stats[4].base_stat){
          resultDefence.innerText = `Special Defender(${data.stats[4].base_stat})`
        } else {
          resultDefence.innerText = `Equal Defence Stats (${data.stats[4].base_stat})`
        }

        function weaknessCalculator(type1, type2){
          let typeMatches = {
            normal: 1, fire: 1, water: 1, grass: 1, electric: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dark: 1, dragon: 1, steel: 1, fairy: 1,
          }
          switch(type1){
            case 'normal':
              typeMatches.fighting *= 2;
              typeMatches.ghost *= 0;
              break;
            case 'fight':
              typeMatches.flying *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'flying':
              typeMatches.fighting *= 0.5;
              typeMatches.ground *= 0;
              typeMatches.rock *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 2;
              typeMatches.ice *= 2;
              break;
            case 'poison':
              typeMatches.fighting *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.fairy *= 0.5;
              break;
            case 'ground':
              typeMatches.poison *= 0.5;
              typeMatches.rock *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              typeMatches.electric *= 0;
              typeMatches.ice *= 2;
              break;
            case 'rock':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              break;
            case 'bug':
              typeMatches.fighting *= 0.5;
              typeMatches.flying *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.rock *= 2;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              break;
            case 'ghost':
              typeMatches.normal *= 0;
              typeMatches.fighting *= 0;
              typeMatches.poison *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.ghost *= 2;
              typeMatches.dark *= 2;
              break;
            case 'steel':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0;
              typeMatches.ground *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.dragon *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'fire':
              typeMatches.rock *= 2;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'water':
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 2;
              typeMatches.electric *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'grass':
              typeMatches.flying *= 2;
              typeMatches.poison *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.fire *= 2;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              typeMatches.ice *= 2;
              break;
            case 'electric':
              typeMatches.flying *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'psychic':
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 2;
              typeMatches.psychic *= 0.5;
              typeMatches.dark *= 2;
              break;
            case 'ice':
              typeMatches.fighting *= 2;
              typeMatches.rock *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'dragon':
              typeMatches.ice *= 2;
              typeMatches.dragon *= 2;
              typeMatches.fairy *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'dark':
              typeMatches.fighting *= 2;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 0.5;
              typeMatches.psychic *= 0;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'fairy':
              typeMatches.poison *= 2;
              typeMatches.steel *= 2;
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.dragon *= 0;
              typeMatches.dark *= 0.5;
              break;
          }

          switch(type2){
            case 'normal':
              typeMatches.fighting *= 2;
              typeMatches.ghost *= 0;
              break;
            case 'fight':
              typeMatches.flying *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'flying':
              typeMatches.fighting *= 0.5;
              typeMatches.ground *= 0;
              typeMatches.rock *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 2;
              typeMatches.ice *= 2;
              break;
            case 'poison':
              typeMatches.fighting *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.fairy *= 0.5;
              break;
            case 'ground':
              typeMatches.poison *= 0.5;
              typeMatches.rock *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              typeMatches.electric *= 0;
              typeMatches.ice *= 2;
              break;
            case 'rock':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              break;
            case 'bug':
              typeMatches.fighting *= 0.5;
              typeMatches.flying *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.rock *= 2;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              break;
            case 'ghost':
              typeMatches.normal *= 0;
              typeMatches.fighting *= 0;
              typeMatches.poison *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.ghost *= 2;
              typeMatches.dark *= 2;
              break;
            case 'steel':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0;
              typeMatches.ground *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.dragon *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'fire':
              typeMatches.rock *= 2;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'water':
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 2;
              typeMatches.electric *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'grass':
              typeMatches.flying *= 2;
              typeMatches.poison *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.fire *= 2;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              typeMatches.ice *= 2;
              break;
            case 'electric':
              typeMatches.flying *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'psychic':
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 2;
              typeMatches.psychic *= 0.5;
              typeMatches.dark *= 2;
              break;
            case 'ice':
              typeMatches.fighting *= 2;
              typeMatches.rock *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'dragon':
              typeMatches.ice *= 2;
              typeMatches.dragon *= 2;
              typeMatches.fairy *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'dark':
              typeMatches.fighting *= 2;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 0.5;
              typeMatches.psychic *= 0;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'fairy':
              typeMatches.poison *= 2;
              typeMatches.steel *= 2;
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.dragon *= 0;
              typeMatches.dark *= 0.5;
              break;
          }

          let setDefenseResultsTo = typeMatches;
          for(const property in setDefenseResultsTo){
            resultWeaknesses.innerText += (`${capitalizeFirstLetter(property)} = ${setDefenseResultsTo[property]}x \n`)
          }

        }
        let type2;
        if(data.types.length > 1){
          type2 = data.types[1].type.name;
          resultType2.innerText = `Type 2: ${capitalizeFirstLetter(data.types[1].type.name)}`
        }
        document.querySelector("#weaknessesLabel").classList.remove("hidden")
        weaknessCalculator(type1, type2)
      })
      .catch(err => {
          console.log(`error ${err}`)
        resultName.innerText = "Pokemon not found! (check spelling)"
        resultName.classList.add("error");
      });

}

function getFetchRandom(){
  let poke1 = getRandomNumber(1, 898);
  const url = 'https://pokeapi.co/api/v2/pokemon/'+poke1
  resultWeaknesses.innerText = ""
  resultName.innerText = ""
  resultImage.src = ""
  resultType1.innerText = ""
  resultType2.innerText = ""
  resultAttack.innerText = ""
  resultDefence.innerText = ""
  document.querySelector("#weaknessesLabel").classList.add("hidden")
  resultName.classList.remove("error");

  fetch(url)
      .then(res => {return res.json()} ) // parse response as JSON
      .then(data => {
        let sprite = data['sprites'];
        let type1 = data.types[0].type.name;

        resultName.innerText = capitalizeFirstLetter(data.name);
        resultImage.src = sprite.other["official-artwork"].front_default;
        document.querySelector("#image").classList.remove("hidden");
        resultType1.innerText = `Type 1: ${capitalizeFirstLetter(type1)}`;
        resultType2.innerText = 'Type 2: --'
        

        if(data.stats[1].base_stat > data.stats[3].base_stat){
          resultAttack.innerText = `Physical Attacker(${data.stats[1].base_stat})`
        } else if (data.stats[1].base_stat < data.stats[3].base_stat){
          resultAttack.innerText = `Special Attacker(${data.stats[3].base_stat})`
        } else {
          resultAttack.innerText = `Equal Attack Stats (${data.stats[3].base_stat})`
        }

        if(data.stats[2].base_stat > data.stats[4].base_stat){
          resultDefence.innerText = `Physical Defender(${data.stats[2].base_stat})`
        } else if (data.stats[2].base_stat < data.stats[4].base_stat){
          resultDefence.innerText = `Special Defender(${data.stats[4].base_stat})`
        } else {
          resultDefence.innerText = `Equal Defence Stats (${data.stats[4].base_stat})`
        }

        function weaknessCalculator(type1, type2){
          let typeMatches = {
            normal: 1, fire: 1, water: 1, grass: 1, electric: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dark: 1, dragon: 1, steel: 1, fairy: 1,
          }
          switch(type1){
            case 'normal':
              typeMatches.fighting *= 2;
              typeMatches.ghost *= 0;
              break;
            case 'fight':
              typeMatches.flying *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'flying':
              typeMatches.fighting *= 0.5;
              typeMatches.ground *= 0;
              typeMatches.rock *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 2;
              typeMatches.ice *= 2;
              break;
            case 'poison':
              typeMatches.fighting *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.fairy *= 0.5;
              break;
            case 'ground':
              typeMatches.poison *= 0.5;
              typeMatches.rock *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              typeMatches.electric *= 0;
              typeMatches.ice *= 2;
              break;
            case 'rock':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              break;
            case 'bug':
              typeMatches.fighting *= 0.5;
              typeMatches.flying *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.rock *= 2;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              break;
            case 'ghost':
              typeMatches.normal *= 0;
              typeMatches.fighting *= 0;
              typeMatches.poison *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.ghost *= 2;
              typeMatches.dark *= 2;
              break;
            case 'steel':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0;
              typeMatches.ground *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.dragon *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'fire':
              typeMatches.rock *= 2;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'water':
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 2;
              typeMatches.electric *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'grass':
              typeMatches.flying *= 2;
              typeMatches.poison *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.fire *= 2;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              typeMatches.ice *= 2;
              break;
            case 'electric':
              typeMatches.flying *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'psychic':
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 2;
              typeMatches.psychic *= 0.5;
              typeMatches.dark *= 2;
              break;
            case 'ice':
              typeMatches.fighting *= 2;
              typeMatches.rock *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'dragon':
              typeMatches.ice *= 2;
              typeMatches.dragon *= 2;
              typeMatches.fairy *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'dark':
              typeMatches.fighting *= 2;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 0.5;
              typeMatches.psychic *= 0;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'fairy':
              typeMatches.poison *= 2;
              typeMatches.steel *= 2;
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.dragon *= 0;
              typeMatches.dark *= 0.5;
              break;
          }

          switch(type2){
            case 'normal':
              typeMatches.fighting *= 2;
              typeMatches.ghost *= 0;
              break;
            case 'fight':
              typeMatches.flying *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'flying':
              typeMatches.fighting *= 0.5;
              typeMatches.ground *= 0;
              typeMatches.rock *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 2;
              typeMatches.ice *= 2;
              break;
            case 'poison':
              typeMatches.fighting *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 2;
              typeMatches.fairy *= 0.5;
              break;
            case 'ground':
              typeMatches.poison *= 0.5;
              typeMatches.rock *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              typeMatches.electric *= 0;
              typeMatches.ice *= 2;
              break;
            case 'rock':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 2;
              break;
            case 'bug':
              typeMatches.fighting *= 0.5;
              typeMatches.flying *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.rock *= 2;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              break;
            case 'ghost':
              typeMatches.normal *= 0;
              typeMatches.fighting *= 0;
              typeMatches.poison *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.ghost *= 2;
              typeMatches.dark *= 2;
              break;
            case 'steel':
              typeMatches.normal *= 0.5;
              typeMatches.fighting *= 2;
              typeMatches.flying *= 0.5;
              typeMatches.poison *= 0;
              typeMatches.ground *= 2;
              typeMatches.rock *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.psychic *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.dragon *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'fire':
              typeMatches.rock *= 2;
              typeMatches.ground *= 2;
              typeMatches.bug *= 0.5;
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 2;
              typeMatches.grass *= 0.5;
              typeMatches.ice *= 0.5;
              typeMatches.fairy *= 0.5;
              break;
            case 'water':
              typeMatches.steel *= 0.5;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 2;
              typeMatches.electric *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'grass':
              typeMatches.flying *= 2;
              typeMatches.poison *= 2;
              typeMatches.ground *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.fire *= 2;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              typeMatches.ice *= 2;
              break;
            case 'electric':
              typeMatches.flying *= 0.5;
              typeMatches.ground *= 2;
              typeMatches.steel *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'psychic':
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 2;
              typeMatches.psychic *= 0.5;
              typeMatches.dark *= 2;
              break;
            case 'ice':
              typeMatches.fighting *= 2;
              typeMatches.rock *= 2;
              typeMatches.steel *= 2;
              typeMatches.fire *= 2;
              typeMatches.ice *= 0.5;
              break;
            case 'dragon':
              typeMatches.ice *= 2;
              typeMatches.dragon *= 2;
              typeMatches.fairy *= 2;
              typeMatches.fire *= 0.5;
              typeMatches.water *= 0.5;
              typeMatches.grass *= 0.5;
              typeMatches.electric *= 0.5;
              break;
            case 'dark':
              typeMatches.fighting *= 2;
              typeMatches.bug *= 2;
              typeMatches.ghost *= 0.5;
              typeMatches.psychic *= 0;
              typeMatches.dark *= 0.5;
              typeMatches.fairy *= 2;
              break;
            case 'fairy':
              typeMatches.poison *= 2;
              typeMatches.steel *= 2;
              typeMatches.fighting *= 0.5;
              typeMatches.bug *= 0.5;
              typeMatches.dragon *= 0;
              typeMatches.dark *= 0.5;
              break;
          }

          let setDefenseResultsTo = typeMatches;
          for(const property in setDefenseResultsTo){
            resultWeaknesses.innerText += (`${capitalizeFirstLetter(property)} = ${setDefenseResultsTo[property]}x \n`)
          }

        }
        let type2;
        if(data.types.length > 1){
          type2 = data.types[1].type.name;
          resultType2.innerText = `Type 2: ${capitalizeFirstLetter(data.types[1].type.name)}`
        }
        document.querySelector("#weaknessesLabel").classList.remove("hidden")
        weaknessCalculator(type1, type2)
      })
      .catch(err => {
          console.log(`error ${err}`)
        resultName.innerText = "Pokemon not found! (check spelling)"
        resultName.classList.add("error");
      });

}