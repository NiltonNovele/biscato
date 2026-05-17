import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data || [];
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const isUnread = (conversation) => {
    return (
      (currentUser?.isSeller && !conversation.readBySeller) ||
      (!currentUser?.isSeller && !conversation.readByBuyer)
    );
  };

  const contactLabel = currentUser?.isSeller ? "Cliente" : "Profissional";

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <div>
            <span>Biscato.Mz</span>
            <h1>Mensagens</h1>
            <p>
              Acompanhe conversas com clientes e profissionais sobre os seus
              Biscatos.
            </p>
          </div>

          {!isLoading && !error && (
            <strong>
              {data.length} conversa{data.length === 1 ? "" : "s"}
            </strong>
          )}
        </div>

        {isLoading ? (
          <div className="state-box">A carregar mensagens...</div>
        ) : error ? (
          <div className="state-box error">
            <h3>Algo correu mal</h3>
            <p>Não foi possível carregar as conversas. Tente novamente.</p>
          </div>
        ) : data.length === 0 ? (
          <div className="state-box empty">
            <h3>Nenhuma conversa encontrada</h3>
            <p>Quando iniciar uma conversa, ela aparecerá aqui.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>{contactLabel}</th>
                    <th>Última mensagem</th>
                    <th>Data</th>
                    <th>Acção</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((c) => {
                    const unread = isUnread(c);

                    return (
                      <tr className={unread ? "active" : ""} key={c.id}>
                        <td className="contact">
                          {currentUser?.isSeller ? c.buyerId : c.sellerId}
                        </td>

                        <td className="last-message">
                          <Link to={`/message/${c.id}`} className="link">
                            {c?.lastMessage
                              ? `${c.lastMessage.substring(0, 100)}${
                                  c.lastMessage.length > 100 ? "..." : ""
                                }`
                              : "Sem mensagens ainda"}
                          </Link>
                        </td>

                        <td className="date">{moment(c.updatedAt).fromNow()}</td>

                        <td>
                          {unread ? (
                            <button
                              onClick={() => handleRead(c.id)}
                              disabled={mutation.isLoading}
                            >
                              Marcar como lida
                            </button>
                          ) : (
                            <span className="read-label">Lida</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mobile-list">
              {data.map((c) => {
                const unread = isUnread(c);

                return (
                  <div className={unread ? "message-card active" : "message-card"} key={c.id}>
                    <div className="card-top">
                      <div>
                        <span className="label">{contactLabel}</span>
                        <h3>{currentUser?.isSeller ? c.buyerId : c.sellerId}</h3>
                      </div>

                      {unread ? (
                        <span className="badge">Nova</span>
                      ) : (
                        <span className="badge read">Lida</span>
                      )}
                    </div>

                    <Link to={`/message/${c.id}`} className="preview">
                      {c?.lastMessage
                        ? `${c.lastMessage.substring(0, 120)}${
                            c.lastMessage.length > 120 ? "..." : ""
                          }`
                        : "Sem mensagens ainda"}
                    </Link>

                    <div className="card-bottom">
                      <span>{moment(c.updatedAt).fromNow()}</span>

                      {unread && (
                        <button
                          onClick={() => handleRead(c.id)}
                          disabled={mutation.isLoading}
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;