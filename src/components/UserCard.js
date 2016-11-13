import React from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './UserCard.css';

const UserCard = ({ src, name, detail, buttonText, buttonLink, router }) => (
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
  </div>
);

export default withRouter(UserCard);
