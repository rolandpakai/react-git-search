import React, {useState, useEffect} from 'react';
import styled, { css } from "styled-components";
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { DivFlexCenter } from "../styles/styles";
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator';
import SearchBar from "./SearchBar";
import Result from "./Result";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Wrapper = styled(DivFlexCenter)`
  height: 100vh;
  flex-direction: column;
  gap: 1rem;
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const Title = styled(DivFlexCenter)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.title};
    gap: 1rem;
  `}
`;

const Home = () => {
    const [searchText, setSearchText] = useState('test'); 
    const [searchResult, setSearchResult] = useState([]); 

    const fetchSearch = keyword => {
        let url = `https://api.github.com/search/repositories?q=${keyword}`;
        
        trackPromise(
            fetch(url)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data);
            })
        );
    };   

    useEffect(() => {
        if (searchText != '' && searchText != null) {
            fetchSearch(searchText);
        }

    }, [searchText]);

    const handleSubmit = (input) => {
       setSearchText(input);
    };

    return (
        <Container>
        <Header>
            <Title>
              <GithubIcon /> Github Repository Search
            </Title>
            <SearchBar placeholder="Search..." onSubmit={handleSubmit} />
        </Header>
        <ResultsWrapper>
            <LoadingIndicator/>
            <Result data={searchResult.items} />
        </ResultsWrapper> 
        </Container>
      );
}

export default Home;