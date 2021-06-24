import { Link } from 'react-router-dom'
/* import { useAuth } from '../hooks/useAuth'; */
import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
//webpack: module bundler => pré configurações pra cada tipo de arquivo
import '../styles/auth.scss'
import { Button } from '../components/Button'


export function NewRoom() {
  /* const { user } = useAuth() */

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button>
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}