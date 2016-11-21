import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import './NotFound.css';

const NotFound = ({ currentUser, router }) => (
  <div className="not-found-wrapper">
    <p>ขออภัย, ไม่พบหน้าที่ต้องการ</p>
    <RaisedButton
      label="ย้อนกลับ"
      onClick={() => router.goBack()}
    />
  </div>
);

export default withRouter(NotFound);
