import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data || [];
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err?.response?.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser?.isSeller ? buyerId : sellerId,
        });

        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <div>
            <span>Biscato.Mz</span>
            <h1>Pedidos</h1>
            <p>
              Acompanhe os seus Biscatos solicitados, valores e contactos com
              clientes ou profissionais.
            </p>
          </div>

          {!isLoading && !error && (
            <strong>
              {data.length} pedido{data.length === 1 ? "" : "s"}
            </strong>
          )}
        </div>

        {isLoading ? (
          <div className="state-box">A carregar pedidos...</div>
        ) : error ? (
          <div className="state-box error">
            <h3>Algo correu mal</h3>
            <p>Não foi possível carregar os pedidos. Tente novamente.</p>
          </div>
        ) : data.length === 0 ? (
          <div className="state-box empty">
            <h3>Nenhum pedido encontrado</h3>
            <p>Quando comprar ou receber Biscatos, eles aparecerão aqui.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Imagem</th>
                    <th>Biscato</th>
                    <th>Preço</th>
                    <th>Contacto</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((order) => (
                    <tr key={order._id}>
                      <td data-label="Imagem">
                        <img
                          className="image"
                          src={order.img || "/img/noavatar.jpg"}
                          alt={order.title || "Biscato"}
                        />
                      </td>

                      <td data-label="Biscato" className="order-title">
                        {order.title}
                      </td>

                      <td data-label="Preço" className="price">
                        {order.price} <sup>MZN</sup>
                      </td>

                      <td data-label="Contacto">
                        <button
                          className="contact-btn"
                          onClick={() => handleContact(order)}
                        >
                          <img
                            className="message"
                            src="./img/message.png"
                            alt=""
                          />
                          <span>Mensagem</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-list">
              {data.map((order) => (
                <div className="order-card" key={order._id}>
                  <div className="card-top">
                    <img
                      className="image"
                      src={order.img || "/img/noavatar.jpg"}
                      alt={order.title || "Biscato"}
                    />

                    <div>
                      <h3>{order.title}</h3>
                      <p>
                        {order.price} <span>MZN</span>
                      </p>
                    </div>
                  </div>

                  <button
                    className="contact-btn"
                    onClick={() => handleContact(order)}
                  >
                    <img className="message" src="./img/message.png" alt="" />
                    <span>Enviar mensagem</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;