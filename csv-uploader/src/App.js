import React from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fa fa-file-csv' /> File Upload
    </h4>

    <FileUpload />
  </div>
);

export default App;
