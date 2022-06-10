import React, {useState } from 'react';

const UserCard = (props) => {
    const { user, handleCloseClick, md} = props;
    const [isFadingOut, setIsFadingOut] = useState(false);

    let cardClasses = `col-md${md} user-card`;

    if (isFadingOut) {
        cardClasses += " fade-out"; 
    }

    const handleButtonClick = (e, id) => {
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
                        onClick={e => handleButtonClick(e, user.id)}
                    >
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="card-body">
                    <div className="avatar">
                        <center>
                            <img
                                className="card-img-top"
                                src={user.avatar_url}
                                alt={`${user.login}`}
                            />
                        </center>
                    </div>  
                    <h5 className="card-title">
                        <center>
                        {user.login}
                        </center>
                    </h5>
                </div>
            </div>   
        </div>
    );
};

export default UserCard;