import React, { Fragment, useState } from 'react';
import Message from '../Message/Message';
import Progress from '../Progress/Progress';
import Search from '../Search/Search';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showFileUpload, setshowFileUpload] = useState(true);
  const [showSearch, setSearch] = useState(false);
  var timeout;
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const checkProgress = () => {
    try {
      axios.post('http://localhost:5000/api/status', {})
        .then(function (response) {
          setUploadPercentage(response.data.data);
        }).catch(function (error) {
          console.log(error);
        });
      timeout = setTimeout(() => {
        checkProgress()
      }, 1000)
    } catch (e) {
      console.log(e);
    }
  }

  const showprogress = () => {
    checkProgress();

  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      axios.post('http://localhost:5000/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
        .then(function (response) {
          if (response.status && response.status === 200) {
            setMessage('File Uploaded');
            setUploadPercentage(100);
            clearTimeout(timeout);
            setTimeout(() => {
              setshowFileUpload(false);
              setSearch(true);
            }, 2000);
          } else {
            setFilename('Choose File');
            setUploadPercentage(0);
            setMessage('There was a problem with the server');
          }
        })
        .catch(function (error) {
          console.log(error);
          setMessage('There was a problem with the server');
          clearTimeout(timeout);
        });

      showprogress();

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {showFileUpload === true ? <div className='row mt-5'>
        <div className='col-md-6 m-auto'>
          {message ? <Message msg={message} /> : null}
          <form onSubmit={onSubmit}>
            <div className='custom-file mb-4'>
              <input
                type='file'
                className='custom-file-input'
                id='uploadField'
                onChange={onChange}
              />
              <label className='custom-file-label' htmlFor='uploadField'>
                {filename}
              </label>
            </div>

            {uploadPercentage !== 0 ? < Progress percentage={uploadPercentage} /> : null}

            <input
              type='submit'
              value='Upload'
              id='uploadButton'
              className='btn btn-primary btn-block mt-4'
            />
          </form>
          {uploadedFile ? (
            <div className='row mt-5'>
              <div className='col-md-6 m-auto'>
                <h3 className='text-center'>{uploadedFile.fileName}</h3>
              </div>
            </div>
          ) : null}
        </div>
      </div> : null}

      {showSearch === true ? <div className='row mt-5'>
        <div className='col-md-6 m-auto'>
          <div className='custom-file mb-4'>
            <Search />
          </div>
        </div>
      </div> : null}
    </Fragment>
  );
};

export default FileUpload;
