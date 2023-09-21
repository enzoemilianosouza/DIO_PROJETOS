function makeRequisition() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  //com o fetch faço a chamada api
  fetch(url)
    //aq trato a resposta como um obj JSON.
    //depois recebo os dados
    .then((response) => response.json())
    .then((data) => {
      //aq exibo a lista através da ref do id
      const pokemonSelect = document.getElementById("pokemonList");

      //aqui o forEach vai iterar oq vem da api
      data.results.forEach((pokemon) => {
        //aq crio um elemento p/ add a lista
        const option = document.createElement("option");
        option.text = pokemon.name;
        option.value = pokemon.url;
        pokemonSelect.add(option);
      });

      //evento p/ exibir os detalhes do pokemon selecionado
      pokemonSelect.addEventListener("change", function () {
        //aq tenho a opção selecionada
        const selectedOption = this.options[this.selectedIndex];
        const selectedPokemonUrl = selectedOption.value;
        //aq eu divido em array a url que recebo através de selectedPokemonUrl com o split/
        //c/ slice eu seleciono o penultimo elemento desse array e dps uso o 0 p/ obter o primeiro elemento do array do resultado do slice.
        const pokemonId = selectedPokemonUrl.split("/").slice(-2, -1)[0];
        //chamo a função p/ exibir os detalhes
        getSelectedPokemonDetails(pokemonId);
      });
    })
    .catch((error) => {
      alert("error: não foi possível fazer a requisição");
      console.error(error);
    });
}

makeRequisition();

function getSelectedPokemonDetails(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //aq através das ref dos id eu defino o conteudo dos elementos c/ os dados da api
      document.getElementById("pokemonName").innerHTML = `nome: ${data.name}`;
      document.getElementById("pokemonId").innerHTML = `ID: ${data.id}`;
      document.getElementById(
        "pokemonHeight"
      ).innerHTML = `altura: ${data.height}`;
      document.getElementById(
        "pokemonWeight"
      ).innerHTML = `peeso: ${data.weight}`;
      //aq defino o src da imagem com o id

      document.getElementById("pokemonImage").src = data.sprites.front_default;
    })
    .catch((error) => {
      alert("error: não foi possível fazer a requisição");
      console.error(error);
    });
}
