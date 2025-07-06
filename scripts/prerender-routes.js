const TOTAL_POKEMONS = 80;
const TOTAL_PAGES = 5;

//peticion anonima auntoinvocada
(async () => {
  const fs = require("fs"); //significa file system

  // pokemons ids
  const pokemosIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  //const pokemosPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  let fileContent = pokemosIds.map((id) => `/pokemon/${id}`).join("\n");

  //Esto fue mi solucioon, el lo puso de otra manera para dar mas opciones de como resolverlo
  // let pagesContent = pokemosPages
  //   .map((id) => `/pokemons/pages/${id}`)
  //   .join("\n");

  //fileContent = fileContent.concat("\n" + pagesContent);

  // paginas de pokemons

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  // por nombres de pokemons
  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  //console.log(pokemonNameList);

  // for (let i = 0; i < pokemonNameList.length; i++) {
  //   fileContent += `\n/pokemon/${pokemonNameList[i].name}`;
  // }

  fileContent += pokemonNameList.results
    .map((pokemon) => `\n/pokemon/${pokemon.name}`)
    .join("");

  //aqui va la ruta relativa, solo ponemos el nombre porque esta en la raiz del proyecto
  fs.writeFileSync("routes.txt", fileContent);

  console.log("Routes.txt generated");
})();
