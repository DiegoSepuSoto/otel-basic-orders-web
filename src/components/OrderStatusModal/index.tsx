import './index.css'

import PropTypes from 'prop-types';

function OrderStatusModal({orderInfo, closeModalButtonHandler}: {orderInfo: string, closeModalButtonHandler: () => void}) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Detalle de la orden</h2>
                <p>{orderInfo}</p>
                <button className="close-button" onClick={closeModalButtonHandler}>Cerrar</button>
            </div>
        </div>
    )
}

OrderStatusModal.propTypes = {
    closeModalButtonHandler: PropTypes.func.isRequired,
    orderInfo: PropTypes.string.isRequired,
};

export default OrderStatusModal;