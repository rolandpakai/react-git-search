import React, {useState, useEffect} from 'react';
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { trackPromise } from 'react-promise-tracker';
import styled, { css } from "styled-components";

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

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const Title = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.title};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  `}
`;

const Home = () => {
    const [searchText, setSearchText] = useState('test'); 
    const [searchResult, setSearchResult] = useState([]); 

    const fetchSearch = keyword => {
        let url = `https://api.github.com/search/users?q=${keyword}`;
        
        trackPromise(
            fetch(url)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data);
            })
        );
    };   

    useEffect(() => {
        if (searchText != null && searchText !== '') {
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
              <GithubIcon /> Github User Search
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