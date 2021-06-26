import { createContext, ReactNode, useEffect, useState } from "react";
// useEffect: disparo de efeitos colaterais/funcionalidades => disparar uma função sempre que algo acontecer
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  // assim que o componente App for exibido em tela, o useEffect é disparado, indo lá no firebase e ficar monitorando se existia um login pré feito pelo usuário
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
        setLoading(false)
      }
    })

    // boa prática: toda vez que é declarado um event listener é necessário se descadastrar dessa ouvidoria de eventos 
    // no final do método do useEffect
    return () => {
      unsubscribe()
    }
  }, [])
  // vetor vazio: useEffect dispara uma única vez

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  if(loading) {
    return(
      <p>Carregando...</p>
    )
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}