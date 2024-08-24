import { useCallback, useState } from 'react'

type LoadingState = { [key: string]: boolean }

export default function useLoadingState() {
  const [loading, setLoading] = useState<LoadingState>({})

  const handleLoading = useCallback((name: string) => {
    setLoading((prevState) => ({ ...prevState, [name]: !prevState[name] }))
  }, [])

  return { loading, handleLoading }
}
