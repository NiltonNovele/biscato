import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import "./Register.scss";

function Register() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "Moçambique",
    phone: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.country || !user.phone || !user.desc) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      let url = "";

      if (file) {
        url = await upload(file);
      }

      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <div className="form-header">
            <span>Biscato.Mz</span>
            <h1>Criar nova conta</h1>
            <p>
              Registe-se para publicar Biscatos, encontrar profissionais ou oferecer
              os seus serviços em Moçambique.
            </p>
          </div>

          <label htmlFor="username">Nome de utilizador</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="ex: joaosilva"
            value={user.username}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ex: joao@email.com"
            value={user.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Palavra-passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Crie uma palavra-passe segura"
            value={user.password}
            onChange={handleChange}
          />

          <label htmlFor="file">Foto de perfil</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label htmlFor="country">País</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Moçambique"
            value={user.country}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "A criar conta..." : "Criar Conta"}
          </button>
        </div>

        <div className="right">
          <p className="login-link">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>

          <div className="seller-card">
            <h1>Quero tornar-me profissional</h1>
            <p>
              Active esta opção se pretende receber Biscatos, candidatar-se a
              trabalhos e oferecer serviços na plataforma.
            </p>

            <div className="toggle">
              <label htmlFor="isSeller">Activar conta profissional</label>

              <label className="switch">
                <input
                  id="isSeller"
                  type="checkbox"
                  checked={user.isSeller}
                  onChange={handleSeller}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <label htmlFor="phone">Número de telefone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="+258 84 000 0000"
            value={user.phone}
            onChange={handleChange}
          />

          <label htmlFor="desc">Descrição</label>
          <textarea
            id="desc"
            placeholder="Escreva uma breve descrição sobre si, as suas competências ou o tipo de serviço que procura."
            name="desc"
            cols="30"
            rows="10"
            value={user.desc}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;