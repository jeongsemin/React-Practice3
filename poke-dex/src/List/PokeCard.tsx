import styled from "@emotion/styled";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PokemonDetailType,
  fetchPokemonDetail,
} from "../Service/pokemonService";
import { PokeImageSkeletion } from "../Common/PokeImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();

  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (!isVisible) {
      return;
    }
    (async () => {
      const detail = await fetchPokemonDetail(props.name);
      setPokemon(detail);
    })();
  }, [props.name, isVisible]);

  if (!pokemon) {
    return (
      <Item color={"#fff"} ref={ref}>
        <Header>
          <PokeNameChip name={"포켓몬"} color={"#ffca09"} id={0} />
        </Header>

        <Body>
          <PokeImageSkeletion />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }
  return (
    <Item onClick={handleClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          color={pokemon.color}
          id={pokemon.id}
        />
      </Header>

      <Body>
        <Image src={pokemon.images.dreamWorldFront} alt={pokemon.name}></Image>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;

  padding: 8px;

  width: 250px;
  height: 300px;

  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
`;
const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;
export default PokeCard;
