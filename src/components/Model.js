import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Model = (props) => {
  const [lgShow, setLgShow] = useState(false);
  const [value, setValue] = useState('');
  const [pushValue, setPushValue] = useState(props.previous);
  const handleAdd = () => {
    setPushValue([...pushValue, value]);
    setValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSaveData(pushValue);
    props.isOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setLgShow(true)}>
        Choose option for &nbsp;
        {props.name}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Value for
            {' '}
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="fname">Enter the value</label>
            <input type="text" id="fname" value={value} name="fname" onChange={(e) => setValue(e.target.value)} />
            <div>
            <button type="button" className='btn btn-primary' id="lname" name="lname" onClick={handleAdd}>Add</button>
            <button type="submit" className='btn btn-success' id="lname" name="lname">Submit</button>
            </div>
          </form>
          <ul>
            {pushValue.length > 0 && pushValue.map((item) => (<li>{item}</li>))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Model;
