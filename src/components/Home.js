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


const Result = (props) => {
    const { data } = props;
    const [result, setResult] = useState([]);

    useEffect(() => {
        setResult(data);
    }, [data]);

    const handleCloseClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const newResult = result.filter(
            (user) => user.id !== id
        );

        setResult(newResult);
    }

    if (result) {
        let userList = result.map(user => (
                <UserCard 
                    key={user.id}
                    user={user}
                    handleCloseClick={handleCloseClick}
                    md={result.length > 3 ? "-2" : ""}
                />
            ));

        return (      
            <div className="clearfix">
                <div className="row">
                    {userList}
                </div>
            </div>
        );
    }
  };

const UserCard = (props) => {
    const { user, handleCloseClick, md} = props;
    const [isFadingOut, setIsFadingOut] = useState(false);

    let cardClasses = `col-md${md} user-card`;

    if (isFadingOut) {
        cardClasses += " fade-out"; 
    }

    const handleOnClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        setIsFadingOut(true);
        setTimeout(() => {  
            handleCloseClick(e, id);
            setIsFadingOut(false);
        },300);
    } 

    const handleCardClick = (e, url) => {
        e.preventDefault();
        e.stopPropagation();

        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div 
            key={user.id}
            className={cardClasses} 
            onClick={e => handleCardClick(e, user.html_url)}
            >
            <div className="card">
                <div className="card-close">
                    <button 
                        type="button" 
                        className="btn-close" 
                        aria-label="Close" 
                        onClick={e => handleOnClick(e, user.id)}
                    >
                        <span aria-hidden="true"></span>
                    </button>
                </div>
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
        </div>
    );
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