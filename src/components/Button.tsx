import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// named export
export function Button(props: ButtonProps) {

  return (
    <button className="button" {...props} >

    </button>
  )
}

