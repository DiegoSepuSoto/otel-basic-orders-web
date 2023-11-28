import './App.css';

import SearchButton from "./components/SearchButton";
import OrderStatusModal from "./components/OrderStatusModal";
import {useState} from "react";

interface OrderStatusResponse {
    message: string
}

function App() {
    const [orderInfo, setOrderInfo] = useState("");
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [isModalShowing, setIsModalShowing] = useState(false);

    const getOrderInfo = async (): Promise<void> => {
        try {
            setIsRequestLoading(true);
            const response = await fetch('http://localhost:8082/order?orderID=abc123');

            if (!response.ok) {
                setOrderInfo("Hubo un error con la información");
                return;
            }

            const result = await response.json() as OrderStatusResponse;

            setOrderInfo(result.message);

        } catch (error) {
            setOrderInfo("Hubo un error al consultar la información");
        } finally {
            setIsModalShowing(true);
            setIsRequestLoading(false);
        }
    };

    const closeModal = (): void => {
        setIsModalShowing(false);
    };

    return (
        <div className='center-container'>
            {
                isModalShowing && <OrderStatusModal orderInfo={orderInfo} closeModalButtonHandler={closeModal}/>
            }
            <h1>Busca el estado de la orden:</h1>
            <SearchButton onClickHandler={getOrderInfo} displayText={isRequestLoading ? 'Cargando' : 'Buscar'}
                          isDisabled={isRequestLoading}/>
        </div>
    );
}

export default App;
