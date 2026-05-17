import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();

    const value = e.target[0].value.trim();

    if (!value) return;

    dispatch({
      type: "ADD_FEATURE",
      payload: value,
    });

    e.target[0].value = "";
  };

  const handleUpload = async () => {
    if (!singleFile) {
      alert("Por favor, seleccione uma imagem de capa.");
      return;
    }

    setUploading(true);

    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      alert("Imagens carregadas com sucesso.");
    } catch (err) {
      console.log(err);
      alert("Não foi possível carregar as imagens. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <div className="page-header">
          <span>Biscato.Mz</span>
          <h1>Publicar novo Biscato</h1>
          <p>
            Crie um serviço claro e profissional para que clientes encontrem o seu trabalho
            com facilidade.
          </p>
        </div>

        <div className="sections">
          <div className="info">
            <div className="section-title">
              <h2>Informações principais</h2>
              <p>Descreva o serviço que pretende oferecer na plataforma.</p>
            </div>

            <label htmlFor="title">Título do Biscato</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Ex: Faço reparações eléctricas ao domicílio"
              onChange={handleChange}
            />

            <label htmlFor="cat">Categoria</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="">Seleccione uma categoria</option>
              <option value="electricista">Electricista</option>
              <option value="canalizador">Canalizador</option>
              <option value="helpdesk">Técnico de Helpdesk</option>
              <option value="mecanico">Mecânico</option>
              <option value="carpinteiro">Carpinteiro</option>
              <option value="pedreiro">Pedreiro</option>
              <option value="pintor">Pintor</option>
              <option value="jardineiro">Jardineiro</option>
              <option value="designer-grafico">Designer Gráfico</option>
              <option value="programador">Programador</option>
              <option value="fotografo">Fotógrafo</option>
              <option value="motorista">Motorista</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="cover">Imagem de capa</label>
                <input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />

                <label htmlFor="images">Imagens adicionais</label>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>

              <button type="button" onClick={handleUpload} disabled={uploading}>
                {uploading ? "A carregar..." : "Carregar imagens"}
              </button>
            </div>

            <label htmlFor="desc">Descrição completa</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Explique o que faz, como trabalha, que tipo de problemas resolve e porque os clientes devem escolher o seu serviço."
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button
              type="button"
              className="create-btn desktop-btn"
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "A publicar..." : "Publicar Biscato"}
            </button>
          </div>

          <div className="details">
            <div className="section-title">
              <h2>Detalhes do serviço</h2>
              <p>Adicione preço, prazo, revisões e benefícios incluídos.</p>
            </div>

            <label htmlFor="shortTitle">Título curto</label>
            <input
              id="shortTitle"
              type="text"
              name="shortTitle"
              placeholder="Ex: Reparação eléctrica"
              onChange={handleChange}
            />

            <label htmlFor="shortDesc">Descrição curta</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              onChange={handleChange}
              placeholder="Resumo rápido do seu serviço para aparecer nos cartões."
              cols="30"
              rows="8"
            ></textarea>

            <div className="form-row">
              <div>
                <label htmlFor="deliveryTime">Prazo de entrega</label>
                <input
                  id="deliveryTime"
                  type="number"
                  name="deliveryTime"
                  placeholder="Ex: 3"
                  min="1"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="revisionNumber">N.º de revisões</label>
                <input
                  id="revisionNumber"
                  type="number"
                  name="revisionNumber"
                  placeholder="Ex: 2"
                  min="0"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="feature">Adicionar benefícios</label>
            <form className="add-feature" onSubmit={handleFeature}>
              <input
                id="feature"
                type="text"
                placeholder="Ex: Deslocação incluída"
              />
              <button type="submit">Adicionar</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.length > 0 ? (
                state.features.map((f) => (
                  <div className="item" key={f}>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: f })
                      }
                    >
                      {f}
                      <span>×</span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-features">
                  Nenhum benefício adicionado ainda.
                </p>
              )}
            </div>

            <label htmlFor="price">Preço inicial</label>
            <input
              id="price"
              type="number"
              onChange={handleChange}
              name="price"
              placeholder="Ex: 1500"
              min="0"
            />

            <button
              type="button"
              className="create-btn mobile-btn"
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "A publicar..." : "Publicar Biscato"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;