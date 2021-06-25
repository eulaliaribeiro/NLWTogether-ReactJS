import { useHistory, useParams } from 'react-router-dom'

import LogoImg from '../assets/images/logo.svg'
import DeleteImg from '../assets/images/delete.svg'


import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
/* import { useAuth } from '../hooks/useAuth' */
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  /* const { user } = useAuth() */
  const history = useHistory()
  const params = useParams<RoomParams>();

  const roomId = params.id
  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
        <img src={LogoImg} alt="Letmeask" />
        <div>
        <RoomCode code={roomId} />
        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
        </div>
        </div>
      </header>

      <main>
      <div className="room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>

      <div className="question-list">
      {/* método map permite que se retorne algo e não apenas itere sobre o array passado*/}      
      {questions.map(question => {
        return (
          <Question 
          /* react vai saber a diferença de uma question pra outra por meio da key --> algoritmo de reconciliação */
          key={question.id}
          content={question.content}
          author={question.author}
          >
            <button
            type="button"
            onClick={() => handleDeleteQuestion(question.id)}
            >
              <img src={DeleteImg} alt="Remover pergunta" />
            </button>
          </Question>
        )
      })}
      </div>
      </main>
    </div>
  )
}