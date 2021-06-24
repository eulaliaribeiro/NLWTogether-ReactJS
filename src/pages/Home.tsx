import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth';

import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleIconImg from '../assets/images/google-icon.svg'
//webpack: module bundler => pré configurações pra cada tipo de arquivo
import { Button } from '../components/Button'
import '../styles/auth.scss'


export function Home() {
  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

// contextos são formas de compartilhar informações entre dois ou mais componentes no react