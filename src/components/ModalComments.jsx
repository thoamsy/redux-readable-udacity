import React from 'react';
import Modal from 'react-modal';
import '../styles/comment.css';

const ModalComments = () => (
  <Modal
    className="modal is-active"
    overlayClassName="modal-background"
    isOpen={true} ariaHideApp={false}
  >
    <div className="modal-content">
      <h1>nihao</h1>
    </div>
  </Modal>
);
export default ModalComments;
