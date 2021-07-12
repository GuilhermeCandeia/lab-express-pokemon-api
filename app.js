const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

app.get("/pokemon", (request, response) => {
  return response.json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === id;
  });

  if (foundPokemon) {
    return res.json(foundPokemon);
  } else {
    return res.json({ msg: "Pokemon not found." });
  }
});

app.get("/search", (req, res) => {
  const queryParams = req.query;

  console.log(queryParams);

  console.log(queryParams);

  for (let key in queryParams) {
    const foundPokemon = allPokemon.find((pokemonElement) => {
      return pokemonElement[key]
        .toLowerCase()
        .includes(queryParams[key].toLowerCase());
    });

    if (foundPokemon) {
      return res.json(foundPokemon);
    } else {
      return res.json({ msg: "Contact not found." });
    }
  }

  res.json(queryParams);
});

app.post("/pokemon", (req, res) => {
  const formData = req.body;

  const newPokemon = {
    id: uuidv4(),
    name: formData.name,
    types: formData.types,
    height: formData.height,
    weight: formData.weight,
    sprite: formData.sprite,
  };

  allPokemon.push(newPokemon);

  return res.json(newPokemon);
});

app.put("/pokemon/:id", (req, res) => {
  const formData = req.body;

  const id = req.params.id;

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemontElement.id === id;
  });

  const index = allPokemon.indexOf(foundPokemon);

  allPokemon[index] = { ...foundPokemon, ...formData };

  return res.json(allPokemon[index]);
});

app.delete("/pokemon/:id", (req, res) => {
  const id = req.params.id;

  const foundPokemon = allPokemon.find((pokemonElement) => {
    return pokemonElement.id === id;
  });

  const index = allPokemon.indexOf(foundPokemon);

  if (index > 0) {
    allPokemon.splice(index, 1);
    return res.json({ msg: "Contact deleted successfully" });
  } else {
    return res.json({ msg: "Contact not found." });
  }
});

// -- Define your route listeners here! --

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
