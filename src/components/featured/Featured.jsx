import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";

const Featured = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/gigs?search=${search.trim()}`);
    }
  };

  const handlePopularSearch = (term) => {
    navigate(`/gigs?search=${term}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <span className="eyebrow">Biscato.Mz</span>

          <h1>
            Encontre o profissional ideal para o seu <span>Biscato</span>
          </h1>

          <p>
            Ligue-se rapidamente a electricistas, canalizadores, mecânicos,
            técnicos e outros profissionais de confiança em Moçambique.
          </p>

          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="Pesquisar" />
              <input
                type="search"
                placeholder='Procure por "electricista"'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <button onClick={handleSearch}>Pesquisar</button>
          </div>

          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handlePopularSearch("electricista")}>
              Electricista
            </button>
            <button onClick={() => handlePopularSearch("canalizador")}>
              Canalizador
            </button>
            <button onClick={() => handlePopularSearch("mecanico")}>
              Mecânico
            </button>
            <button onClick={() => handlePopularSearch("helpdesk")}>
              Helpdesk
            </button>
          </div>
        </div>

        <div className="right">
          <div className="hero-card main-card">
            <img
              src="https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Electricista profissional"
            />
          </div>

          <div className="hero-card small-card top-card">
            <img
              src="https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=700"
              alt="Canalizador profissional"
            />
          </div>

          <div className="hero-card small-card bottom-card">
            <img
              src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=700"
              alt="Mecânico profissional"
            />
          </div>

          <div className="floating-badge badge-one">
            <strong>+120</strong>
            <span>profissionais</span>
          </div>

          <div className="floating-badge badge-two">
            <strong>24h</strong>
            <span>resposta rápida</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;