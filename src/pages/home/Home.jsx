import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";
import {
  Zap,
  Wrench,
  MonitorSmartphone,
  Car,
  Hammer,
  Paintbrush,
  Trees,
  Camera,
  Truck,
  Building2,
} from "lucide-react";

function Home() {
  const exploreItems = [
    { icon: <Zap size={38} strokeWidth={1.8} />, title: "Electricista" },
    { icon: <Wrench size={38} strokeWidth={1.8} />, title: "Canalizador" },
    { icon: <MonitorSmartphone size={38} strokeWidth={1.8} />, title: "Helpdesk" },
    { icon: <Car size={38} strokeWidth={1.8} />, title: "Mecânico" },
    { icon: <Hammer size={38} strokeWidth={1.8} />, title: "Carpinteiro" },
    { icon: <Building2 size={38} strokeWidth={1.8} />, title: "Pedreiro" },
    { icon: <Paintbrush size={38} strokeWidth={1.8} />, title: "Pintor" },
    { icon: <Trees size={38} strokeWidth={1.8} />, title: "Jardineiro" },
    { icon: <Camera size={38} strokeWidth={1.8} />, title: "Fotógrafo" },
    { icon: <Truck size={38} strokeWidth={1.8} />, title: "Motorista" },
  ];

  return (
    <div className="home">
      <Featured />
      <TrustedBy />

      <div className="home-slide">
        <Slide slidesToShow={5} arrowsScroll={5}>
          {cards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </Slide>
      </div>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Todo o talento profissional ao seu alcance</h1>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              O melhor para cada orçamento
            </div>
            <p>
              Encontre serviços de qualidade para diferentes necessidades. Sem complicações,
              apenas soluções claras para cada Biscato.
            </p>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Trabalho de qualidade feito rapidamente
            </div>
            <p>
              Encontre o profissional certo e comece a resolver a sua tarefa em poucos minutos.
            </p>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Pagamentos e contactos mais seguros
            </div>
            <p>
              Partilhe detalhes com segurança e avance apenas quando houver acordo entre cliente
              e profissional.
            </p>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Suporte sempre disponível
            </div>
            <p>
              Tem dúvidas? A nossa equipa está pronta para ajudar clientes e profissionais sempre
              que necessário.
            </p>
          </div>

          <div className="item">
            <video
              poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              src="./img/video.mp4"
              controls
            />
          </div>
        </div>
      </div>

      <div className="why-biscato">
        <div className="container">
          <div className="why-header">
            <div>
              <span>PORQUÊ BISCATO.MZ</span>
              <h1>Trabalhos rápidos, profissionais confiáveis.</h1>
            </div>

            <p>
              Conecte-se com profissionais de confiança em Moçambique, encontre tarefas e
              biscatos rapidamente, e garanta que cada trabalho seja concluído com qualidade.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="icon">＋</div>
              <h3>Encontre trabalhos rapidamente</h3>
              <p>Publique ou descubra tarefas e faça com que sejam concluídas com eficiência.</p>
            </div>

            <div className="why-card">
              <div className="icon">✓</div>
              <h3>Profissionais confiáveis</h3>
              <p>Encontre prestadores avaliados por outros utilizadores para garantir qualidade.</p>
            </div>

            <div className="why-card">
              <div className="icon">≡</div>
              <h3>Maximize os Biscatos</h3>
              <p>Aproveite os trabalhos publicados para ganhar experiência e rendimento.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="explore">
        <div className="container">
          <h1>Explore profissões na Biscato.Mz</h1>

          <div className="items">
            {exploreItems.map((item) => (
              <div className="item" key={item.title}>
                <div className="icon">{item.icon}</div>
                <div className="line"></div>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div className="container">
          <div className="section-heading">
            <h1>Como Funciona o <span>Biscato.Mz</span></h1>
            <p>Um processo simples e seguro que liga clientes a profissionais qualificados.</p>
          </div>

          <div className="steps-wrapper">
            <div className="steps-column">
              <h2>Para Clientes</h2>

              <div className="step">
                <span>1</span>
                <div>
                  <h3>Publique um Biscato</h3>
                  <p>Crie a sua conta e publique a tarefa com detalhes, orçamento e prazos.</p>
                </div>
              </div>

              <div className="step">
                <span>2</span>
                <div>
                  <h3>Receba Propostas</h3>
                  <p>Analise perfis, avaliações e converse com profissionais antes de decidir.</p>
                </div>
              </div>

              <div className="step">
                <span>3</span>
                <div>
                  <h3>Partilha Segura de Contactos</h3>
                  <p>Após acordo mútuo, os contactos são partilhados para concluir a tarefa.</p>
                </div>
              </div>
            </div>

            <div className="steps-column">
              <h2>Para Profissionais</h2>

              <div className="step">
                <span>1</span>
                <div>
                  <h3>Complete o Perfil</h3>
                  <p>Preencha competências e experiência para aumentar confiança e oportunidades.</p>
                </div>
              </div>

              <div className="step">
                <span>2</span>
                <div>
                  <h3>Candidate-se a Biscatos</h3>
                  <p>Explore Biscatos disponíveis e envie mensagens personalizadas.</p>
                </div>
              </div>

              <div className="step">
                <span>3</span>
                <div>
                  <h3>Negocie e Complete</h3>
                  <p>Combine detalhes com o cliente, conclua a tarefa e receba avaliações.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>Biscato.Mz <i>Business</i></h1>
            <h1>Uma solução criada para <i>equipas</i></h1>
            <p>
              Uma experiência pensada para empresas, equipas e clientes que precisam de serviços
              rápidos e profissionais confiáveis.
            </p>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Conecte-se com profissionais com experiência comprovada
            </div>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Encontre o talento certo para cada necessidade
            </div>

            <div className="title">
              <img src="./img/check.png" alt="check" />
              Organize tarefas e aumente a produtividade num só lugar
            </div>

            <button>Explorar Biscato Business</button>
          </div>

          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
              alt="Biscato.Mz Business"
            />
          </div>
        </div>
      </div>

      <div className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <span>Newsletter Biscato.Mz</span>
            <h1>Receba as últimas novidades e novos biscatos</h1>
            <p>
              Subscreva a nossa newsletter e seja o primeiro a saber sobre novos serviços,
              oportunidades, profissionais em destaque e actualizações da plataforma.
            </p>
          </div>

          <form className="newsletter-form">
            <input type="email" placeholder="Digite o seu email" required />
            <button type="submit">Subscrever</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;