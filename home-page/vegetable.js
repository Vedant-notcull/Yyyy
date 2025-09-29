class Vegetable{
  boxType
  id;
  name;
  farmers;
  
  constructor(vegeInfo){
    this.boxType = vegeInfo.boxType,
    this.id = vegeInfo.id,
    this.name = vegeInfo.name,
    this.farmers = vegeInfo.farmers
  }
}







export let vegetables = []

 export function loadVegetablesFetch() {
  const promise = fetch(
    'https://vedant-notcull.github.io/Agrobuddy-Backend/vegetables.json'
  ).then((response) => {
    return response.json()
  }).then((vegeData) => {
    vegetables = vegeData.map((vegeInfo) => {
        return new Vegetable(vegeInfo)
    })
    
  })
  
  return promise
}



/*
async function main() {
  await loadProductsFetch();
  console.log(vegetables)
}

main()

*/


export function getVegetable(id) {
  let matchingVege;
  
  vegetables.forEach((vegetable) => {
    if (Number(id) === Number(vegetable.id)) {
      matchingVege = vegetable
    }
  })
  return matchingVege;
}





