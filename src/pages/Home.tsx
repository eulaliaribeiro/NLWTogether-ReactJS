import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleIconImg from '../assets/images/google-icon.svg'
//webpack: module bundler => pré configurações pra cada tipo de arquivo
import { Button } from '../components/Button'
import '../styles/auth.scss'
/* import { useTheme } from '../hooks/useTheme'; */


export function Home() {
  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()
  /* const { theme, toggleTheme } = useTheme() */

  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      // com o await, o restante do código só vai executar se tiver resposta de sucesso, se não poderia ir para um catch
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === ''){
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room just not exists')
      return
    }

    if (roomRef.val().endedAt){
      alert("Room already closed")
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth" /* className={theme} */>
      <aside>
        <img src={IllustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          {/* <div>{theme}</div> */}
          {/* <button onClick={toggleTheme}>Toggle</button> */}
          <img src={LogoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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