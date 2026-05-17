import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const menuLinks = [
    { path: "/gigs?category=electricista", name: "Electricista" },
    { path: "/gigs?category=canalizador", name: "Canalizador" },
    { path: "/gigs?category=helpdesk", name: "Helpdesk" },
    { path: "/gigs?category=mecanico", name: "Mecânico" },
    { path: "/gigs?category=carpinteiro", name: "Carpinteiro" },
    { path: "/gigs?category=pedreiro", name: "Pedreiro" },
    { path: "/gigs?category=pintor", name: "Pintor" },
    { path: "/gigs?category=jardineiro", name: "Jardineiro" },
    { path: "/gigs?category=designer-grafico", name: "Designer Gráfico" },
    { path: "/gigs?category=programador", name: "Programador" },
    { path: "/gigs?category=motorista", name: "Motorista" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link brand" to="/">
            <span className="text">Biscato</span>
            <span className="dot">.</span>
            <span className="mz">Mz</span>
          </Link>
        </div>

        <div className="links">
          <Link className="link nav-link" to="/gigs">
            Explorar Biscatos
          </Link>

          <Link className="link nav-link" to="/how-it-works">
            Como Funciona
          </Link>

          {!currentUser?.isSeller && (
            <Link className="link nav-link seller-link" to="/register">
              Tornar-se Profissional
            </Link>
          )}

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || currentUser.image || "/img/noavatar.jpg"}
                alt={currentUser?.username || "Utilizador"}
              />
              <span>{currentUser?.username}</span>

              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Meus Biscatos
                      </Link>

                      <Link className="link" to="/add">
                        Publicar Biscato
                      </Link>
                    </>
                  )}

                  <Link className="link" to="/orders">
                    Pedidos
                  </Link>

                  <Link className="link" to="/messages">
                    Mensagens
                  </Link>

                  <button type="button" onClick={handleLogout}>
                    Terminar Sessão
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="link signin">
                Entrar
              </Link>

              <Link className="link" to="/register">
                <button>Registar</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />

          <div className="menu">
            {menuLinks.map((item) => (
              <Link className="link menuLink" to={item.path} key={item.name}>
                {item.name}
              </Link>
            ))}
          </div>

          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;