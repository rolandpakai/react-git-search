import React, {useState, useEffect} from 'react';
import styled, { css } from "styled-components";
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { DivFlexCenter } from "../styles/styles";
import SearchBar from "./SearchBar";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { ThreeDots } from 'react-loader-spinner';

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
                //setTimeout(setSearchResult,5000,data);
                console.log(data)
                setSearchResult(data);
            })
        );
    };   

    useEffect(() => {
        if (searchText != '' && searchText != null) {
            console.log("useEffect search... " +searchText);
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
            <Result data={searchResult} />
        </ResultsWrapper> 
        </Container>
      );
}


const Result = (result) => {
    if (result && result.data) {
        const data = result.data;
        if (data.message === "Not Found") {
            return (
            <div className="notfound">
                <h2>Oops !!!</h2>
                <p>Oops no profiles there!. Try Again </p>
            </div>
            );
        } else if(data.items) {
            let userList = data.items.map(user => {
                return (
                    <div className="col-md-4 animated fadeIn" key={user.id}>
                        <a target="#" href={user.html_url}>
                        <div className="card">
                            <div className="card-body">
                                <div className="avatar">
                                    <center>
                                        <img
                                            className="card-img-top"
                                            src={user.owner.avatar_url}
                                            alt={`${user.owner.login}`}
                                        />
                                    </center>
                                </div>  
                                <h5 className="card-title">
                                    <center>
                                     {user.owner.login}
                                    </center>
                                </h5>
                            </div>
                        </div>   
                        </a>
                    </div>
                );
            });

            return (      
                <div className="clearfix">
                    <div className="row">
                        {userList}
                    </div>
                </div>);
        }
    } else {
        console.log("Fetching...");
      return <div className="center">Fetching data . . .</div>;
    }
  };

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker({delay: 4000});
  
    return promiseInProgress &&
      <div
        className="spinner"
      >
      <ThreeDots 
        color="#2BAD60" 
      	height={150} 
	    width={150}  />
      </div>
  };

export default Home;