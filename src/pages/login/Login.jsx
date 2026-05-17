import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import newRequest from "../../utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Não foi possível iniciar sessão. Verifique os seus dados."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <span>Biscato.Mz</span>
          <h1>Entrar na sua conta</h1>
          <p>
            Aceda à sua conta para publicar Biscatos, encontrar profissionais ou
            gerir os seus pedidos.
          </p>
        </div>

        <label htmlFor="username">Nome de utilizador</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="ex: joaosilva"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Palavra-passe</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Digite a sua palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "A entrar..." : "Entrar"}
        </button>

        {error && <span className="error-message">{error}</span>}

        <p className="register-link">
          Ainda não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;