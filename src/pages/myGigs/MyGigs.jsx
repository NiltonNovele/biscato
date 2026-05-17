import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data || [];
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Tem a certeza que pretende apagar este Biscato?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <div>
            <span>Biscato.Mz</span>
            <h1>Meus Biscatos</h1>
            <p>Gerencie os serviços que publicou na plataforma.</p>
          </div>

          {currentUser?.isSeller && (
            <Link to="/add">
              <button>Publicar Biscato</button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="state-box">A carregar os seus Biscatos...</div>
        ) : error ? (
          <div className="state-box error">
            <h3>Algo correu mal</h3>
            <p>Não foi possível carregar os seus Biscatos.</p>
          </div>
        ) : data.length === 0 ? (
          <div className="state-box empty">
            <h3>Nenhum Biscato publicado</h3>
            <p>Publique o seu primeiro serviço para começar a receber pedidos.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Imagem</th>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Vendas</th>
                    <th>Acção</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((gig) => (
                    <tr key={gig._id}>
                      <td>
                        <img
                          className="image"
                          src={gig.cover || "/img/noavatar.jpg"}
                          alt={gig.title}
                        />
                      </td>

                      <td className="gig-title">{gig.title}</td>

                      <td className="price">
                        {gig.price} <sup>MZN</sup>
                      </td>

                      <td>{gig.sales || 0}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(gig._id)}
                          disabled={mutation.isLoading}
                        >
                          <img src="./img/delete.png" alt="" />
                          Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mobile-list">
              {data.map((gig) => (
                <div className="gig-card" key={gig._id}>
                  <div className="card-top">
                    <img
                      className="image"
                      src={gig.cover || "/img/noavatar.jpg"}
                      alt={gig.title}
                    />

                    <div>
                      <h3>{gig.title}</h3>
                      <p>
                        {gig.price} <span>MZN</span>
                      </p>
                    </div>
                  </div>

                  <div className="card-bottom">
                    <span>{gig.sales || 0} venda{gig.sales === 1 ? "" : "s"}</span>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(gig._id)}
                      disabled={mutation.isLoading}
                    >
                      <img src="./img/delete.png" alt="" />
                      Apagar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyGigs;