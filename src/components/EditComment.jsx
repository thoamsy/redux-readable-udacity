import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const overlayStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,10,10,.86)',
  },
};
const EditComment = ({
  isOpen,
  value,
  onChange,
  submitEdit,
  onRequestClose,
  isPending,
}) => {
  let inputRef;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      onAfterOpen={() => inputRef.select()}
      className="modal is-active"
      style={overlayStyle}
    >
      <article className="modal-content">
        <div className="field">
          <div className={`control ${isPending ? 'is-loading' : ''}`}>
            <input
              name="editedComment"
              ref={node => (inputRef = node)}
              type="text"
              className="input"
              value={value}
              onChange={onChange}
              onKeyUp={submitEdit}
              autoFocus
            />
          </div>
        </div>
      </article>
      <button className="modal-close is-large" onClick={onRequestClose} />
    </Modal>
  );
};

EditComment.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  submitEdit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};
export default EditComment;
