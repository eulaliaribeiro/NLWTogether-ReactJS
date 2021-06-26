import { useHistory, useParams } from 'react-router-dom'

import { Fragment } from 'react'

import Modal from 'react-modal'

import LogoImg from '../assets/images/logo.svg'
import DeleteImg from '../assets/images/delete.svg'
import CheckImg from '../assets/images/check.svg'
import AnswerImg from '../assets/images/answer.svg'

/* import { useTheme } from '../hooks/useTheme'; */

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
/* import { useAuth } from '../hooks/useAuth' */
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'
import { useState } from 'react'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  /* const { user } = useAuth() */
  /* const { theme } = useTheme() */
  const history = useHistory()
  const params = useParams<RoomParams>();

  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>()
  const [roomIdModalOpen, setRoomIdModalOpen] = useState<string | undefined>()

  const roomId = params.id
  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })

  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }

  return(
    <div id="page-room" /* className={theme} */>
      <header>
        <div className="content">
        <img src={LogoImg} alt="Letmeask" />
        <div>
        <RoomCode code={roomId} />
        <Button isOutlined onClick={() => setRoomIdModalOpen(roomId)}>Encerrar sala</Button>
        <Modal 
          isOpen={roomIdModalOpen === roomId}
          onRequestClose={() =>  setRoomIdModalOpen(undefined)}
          className="modal"
          overlayClassName="overlay"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.66 18.3398L18.34 29.6598" stroke="#E73F5D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.66 29.6598L18.34 18.3398" stroke="#E73F5D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z" stroke="#E73F5D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>Encerrar sala</h1>
            <p>Tem certeza que você deseja encerrar esta sala?</p>
            <div>
            <button className="cancel-button" onClick={() => setRoomIdModalOpen(undefined)}>Cancelar</button>
            <button className="delete-button" onClick={() => {handleEndRoom(); setQuestionIdModalOpen(undefined)}}>Sim, encerrar</button>
            </div>
          </Modal>
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
          <Fragment           
          /* react vai saber a diferença de uma question pra outra por meio da key --> algoritmo de reconciliação */
          key={question.id}>
          <Question 
          content={question.content}
          author={question.author}
          isAnswered={question.isAnswered}
          isHighlighted={question.isHighlighted}
          >
            {!question.isAnswered && (
              <>
              <button
              type="button"
              onClick={() => handleCheckQuestionAsAnswered(question.id)}
              >
                <img src={CheckImg} alt="Marcar pergunta como respondida" />
              </button>
              <button
              type="button"
              onClick={() => handleHighlightQuestion(question.id)}
              >
                <img src={AnswerImg} alt="Dar destaque à pergunta" />
              </button>
              </>
            ) }
            <button
            type="button"
            onClick={() => setQuestionIdModalOpen(question.id)}
            >
              <img src={DeleteImg} alt="Remover pergunta" />
            </button>
          </Question>
          <Modal 
          isOpen={questionIdModalOpen === question.id}
          onRequestClose={() =>  setQuestionIdModalOpen(undefined)}
          className="modal"
          overlayClassName="overlay"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.99988H5H21" stroke="#ea4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#ea4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>Excluir pergunta</h1>
            <p>Tem certeza que você deseja excluir esta pergunta?</p>
            <div>
            <button className="cancel-button" onClick={() => setQuestionIdModalOpen(undefined)}>Cancelar</button>
            <button className="delete-button" onClick={() => {handleDeleteQuestion(question.id); setQuestionIdModalOpen(undefined)}}>Sim, excluir</button>
            </div>
          </Modal>
          </Fragment>
        )
      })}
      </div>
      </main>
    </div>
  )
}