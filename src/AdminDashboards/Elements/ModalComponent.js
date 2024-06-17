import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ModalComponent = ({ modal, toggle, data, modalTitle, size, scrollable }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} centered={true} size={size ? size : ""} scrollable={scrollable === true ? true : false}>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>
                {data}
            </ModalBody>
        </Modal>
    )
}

export default ModalComponent