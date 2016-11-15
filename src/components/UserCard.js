import React from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './UserCard.css';

const UserCard = ({ src, name, detail, buttonText, buttonText2, buttonLink, buttonLink2, router }) => (
  <div className="user-card">
    <img
      role="presentation"
      src={src}
    />
    <h6>{name}</h6>
    <p>{detail}</p>
    { buttonText ?
      <RaisedButton
        backgroundColor="#3498db"
        labelColor="#fff"
        className="user-card-button"
        label={buttonText}
        onClick={() => router.push(buttonLink)}
      /> : ''
    }
    { buttonText2 ?
      <RaisedButton
        backgroundColor="#e67e22"
        labelColor="#fff"
        className="user-card-button"
        label={buttonText2}
        onClick={() => router.push(buttonLink2)}
      /> : ''
    }
  </div>
);

export default withRouter(UserCard);
