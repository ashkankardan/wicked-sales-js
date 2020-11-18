import React from 'react';

export default function Modal(props) {

  function catalogModal() {
    props.hideCatalogModal();
  }

  function checkoutModal() {
    props.hideCheckoutModal();
  }

  if (props.view === 'catalog') {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-title">ATTENTION:</div>
          <div className="modal-description">This is website is solely for demonstration purposes only and is not a functioning shop.</div>
          <div onClick={catalogModal} className="modal-btn btn-secondary">ACCEPT</div>
        </div>
      </div>
    );
  } else if (props.view === 'checkout') {
    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-title">ATTENTION:</div>
          <div className="modal-description">This is website is solely for demonstration purposes only. Please DO NOT enter any personal information.</div>
          <div onClick={checkoutModal} className="modal-btn btn-secondary">ACCEPT</div>
        </div>
      </div>
    );
  }
}
