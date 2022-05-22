import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [search, setSearch] = useState([]);
  const params = useParams();

  const getSearched = async (search) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query${search}&number=9`
    );
    const recipes = await data.json();
    setSearch(recipes.results);
  };

  useEffect(() => {
    getSearched(search);
  }, [params.search]);

  return (
    <Grid>
      {search.map((item) => {
        return (
          <Card key={item.key}>
            <img src={item.image} alt={item.title} />
            <h4>{item.image}</h4>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
