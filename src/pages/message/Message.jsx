import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data || [];
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = e.target[0].value.trim();

    if (!message) return;

    mutation.mutate({
      conversationId: id,
      desc: message,
    });

    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <div className="chat-header">
          <span className="breadcrumbs">
            <Link to="/messages">Mensagens</Link> &gt; Conversa
          </span>

          <div>
            <span>Biscato.Mz</span>
            <h1>Conversa do Biscato</h1>
            <p>
              Converse com o cliente ou profissional para combinar detalhes,
              prazos e próximos passos.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="state-box">A carregar mensagens...</div>
        ) : error ? (
          <div className="state-box error">
            <h3>Algo correu mal</h3>
            <p>Não foi possível carregar esta conversa. Tente novamente.</p>
          </div>
        ) : (
          <div className="messages">
            {data.length === 0 ? (
              <div className="empty-chat">
                <h3>Ainda não há mensagens</h3>
                <p>Envie a primeira mensagem para iniciar a conversa.</p>
              </div>
            ) : (
              data.map((m) => (
                <div
                  className={
                    m.userId === currentUser?._id ? "owner item" : "item"
                  }
                  key={m._id}
                >
                  <img
                    src={
                      m.userId === currentUser?._id
                        ? currentUser?.img || "/img/noavatar.jpg"
                        : "/img/noavatar.jpg"
                    }
                    alt="Utilizador"
                  />

                  <p>{m.desc}</p>
                </div>
              ))
            )}
          </div>
        )}

        <form className="write" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Escreva a sua mensagem..."
            disabled={mutation.isLoading}
          />

          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "A enviar..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;