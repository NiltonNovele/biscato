import { useEffect } from "react";
import "./Footer.scss";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h1>Profissões</h1>
            <span>Electricista</span>
            <span>Canalizador</span>
            <span>Técnico de Helpdesk</span>
            <span>Mecânico</span>
            <span>Carpinteiro</span>
            <span>Pedreiro</span>
            <span>Pintor</span>
            <span>Jardineiro</span>
            <span>Designer Gráfico</span>
            <span>Programador</span>
            <span>Fotógrafo</span>
            <span>Motorista</span>
          </div>

          <div className="item">
            <h1>Sobre</h1>
            <span>Sobre a Biscato.Mz</span>
            <span>Como Funciona</span>
            <span>Carreiras</span>
            <span>Parcerias</span>
            <span>Notícias</span>
            <span>Política de Privacidade</span>
            <span>Termos de Serviço</span>
          </div>

          <div className="item">
            <h1>Suporte</h1>
            <span>Ajuda e Suporte</span>
            <span>Segurança e Confiança</span>
            <span>Vender na Biscato.Mz</span>
            <span>Comprar Serviços</span>
            <span>Centro de Ajuda</span>
            <span>Contactar Suporte</span>
          </div>

          <div className="item">
            <h1>Comunidade</h1>
            <span>Eventos</span>
            <span>Blog</span>
            <span>Fórum</span>
            <span>Normas da Comunidade</span>
            <span>Convidar um Amigo</span>
            <span>Histórias de Sucesso</span>
            <span>Programa de Afiliados</span>
          </div>

          <div className="item contact">
            <h1>SyncTechX</h1>

            <a href="https://www.synctechx.com" target="_blank" rel="noreferrer">
              www.synctechx.com
            </a>

            <a href="tel:+258847529665">
              +258 84 752 9665
            </a>

            <a href="mailto:info@synctechx.com">
              info@synctechx.com
            </a>

            <span>Maputo, Moçambique</span>
          </div>
        </div>

        <hr />

        <div className="bottom">
          <div className="left">
            <h2>Biscato.Mz</h2>
            <span>© Biscato.Mz {new Date().getFullYear()}. Todos os direitos reservados.</span>
          </div>

          <div className="right">
            <div className="social">
              <a href="https://x.com/synctechx" target="_blank" rel="noreferrer" aria-label="X da SyncTechX">
                <img src="./media/twitter.png" alt="X" />
              </a>

              <a href="https://www.facebook.com/profile.php?id=61574813828863" target="_blank" rel="noreferrer" aria-label="Facebook da SyncTechX">
                <img src="./media/facebook.png" alt="Facebook" />
              </a>

              <a href="https://www.linkedin.com/company/synctechx/" target="_blank" rel="noreferrer" aria-label="LinkedIn da SyncTechX">
                <img src="./media/linkedin.png" alt="LinkedIn" />
              </a>

              <a href="https://www.instagram.com/synctechx.mz/" target="_blank" rel="noreferrer" aria-label="Instagram da SyncTechX">
                <img src="./media/instagram.png" alt="Instagram" />
              </a>
            </div>

            <div className="link">
              <img src="./media/language.png" alt="Idioma" />
              <span>Português</span>
            </div>

            <div className="link">
              <img src="./media/coin.png" alt="Moeda" />
              <span>MZN</span>
            </div>

            <div className="link">
              <img src="./media/accessibility.png" alt="Acessibilidade" />
              <span>Acessibilidade</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;