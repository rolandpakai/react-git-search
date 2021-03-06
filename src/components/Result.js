import React, {useState, useEffect} from 'react';
import UserCard from './UserCard';

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
        return (      
            <div className="clearfix">
                <div className="row">
                {result.map(user => (
                    <UserCard 
                        key={user.id}
                        user={user}
                        handleCloseClick={handleCloseClick}
                        md={result.length > 3 ? "-2" : ""}
                    />
                ))}
                </div>
            </div>
        );
    }
};

export default Result;