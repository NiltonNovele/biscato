import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const getSearchParams = () => {
    const params = new URLSearchParams(search);
    return {
      category: params.get("category"),
      searchTerm: params.get("search"),
    };
  };

  const formatTitle = () => {
    const { category, searchTerm } = getSearchParams();
    const value = category || searchTerm || "biscatos";

    return value
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const buildQueryUrl = () => {
    const params = new URLSearchParams(search);

    if (minRef.current?.value) {
      params.set("min", minRef.current.value);
    }

    if (maxRef.current?.value) {
      params.set("max", maxRef.current.value);
    }

    params.set("sort", sort);

    return `/gigs?${params.toString()}`;
  };

  const { isLoading, error, data = [], refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () =>
      newRequest.get(buildQueryUrl()).then((res) => {
        return res.data || [];
      }),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search]);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  const clearFilters = () => {
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    refetch();
  };

  const title = formatTitle();

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Biscato.Mz &gt; {title}</span>

        <div className="header">
          <div>
            <h1>{title}</h1>
            <p>
              Encontre profissionais disponíveis para realizar Biscatos com
              rapidez, segurança e qualidade.
            </p>
          </div>

          <span className="count">
            {isLoading ? "A procurar..." : `${data.length} resultado${data.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="menu">
          <div className="left">
            <span>Orçamento</span>

            <input ref={minRef} type="number" min="0" placeholder="Mín." />

            <input ref={maxRef} type="number" min="0" placeholder="Máx." />

            <button onClick={apply}>Aplicar</button>

            <button className="clear" onClick={clearFilters}>
              Limpar
            </button>
          </div>

          <div className="right">
            <span className="sortBy">Ordenar por</span>

            <button className="sortButton" onClick={() => setOpen(!open)}>
              <span className="sortType">
                {sort === "sales" ? "Mais populares" : "Mais recentes"}
              </span>
              <img src="./img/down.png" alt="Abrir opções" />
            </button>

            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Mais recentes</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Mais populares</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading ? (
            <div className="state-box">A carregar Biscatos...</div>
          ) : error ? (
            <div className="state-box error">
              <h3>Algo correu mal</h3>
              <p>Não foi possível carregar os Biscatos. Tente novamente.</p>
              <button onClick={() => refetch()}>Tentar novamente</button>
            </div>
          ) : data.length === 0 ? (
            <div className="state-box empty">
              <h3>Nenhum Biscato encontrado</h3>
              <p>Experimente alterar a pesquisa, categoria ou orçamento.</p>
            </div>
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;