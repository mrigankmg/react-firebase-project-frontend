import React, {
    useContext,
    useState,
    useEffect
} from 'react'
import { 
    auth,
    functions,
    firestore
} from '../firebase'
import { CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom';

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState()
    const [allPlayers, setAllPlayers] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        let dataToBeLoadedCount = 2
        const decreaseDataToBeLoadedCount = () => {
            dataToBeLoadedCount -= 1
            if (dataToBeLoadedCount === 0) {
                setDataLoaded(true)
            }
        }

        const unsubscribeAuthStateChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            decreaseDataToBeLoadedCount()
        })

        const unsubscribeGetPlayersCollection = firestore.collection('players')
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
                const players = []
                snapshot.forEach(doc => {
                    players.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setAllPlayers(players)
                decreaseDataToBeLoadedCount()
            })
        
        return () => {
            unsubscribeAuthStateChange()
            unsubscribeGetPlayersCollection()
        }
    }, [])

    useEffect(() => {
        setError('')
    }, [location])

    const loadingWrapper = async callback => {
        setLoading(true)
        await callback()
        setLoading(false)
    }

    const signUp = (name, email, password) => {
        loadingWrapper(async () => {
            try {
                await auth.createUserWithEmailAndPassword(email, password)
                await functions.httpsCallable('addPlayerRecord')({ name })
            } catch (err) {
                setError(err.message)
            }
        })
    }

    const logIn = async (email, password) => {
        loadingWrapper(async () => {
            try {
                await auth.signInWithEmailAndPassword(email, password)
            } catch (err) {
                setError(err.message)
            }
        })
    }

    const logOut = async () => {
        loadingWrapper(async () => {
            try {
                await auth.signOut()
            } catch (err) {
                setError(err.message)
            }
        })
    }

    const value = { 
        currentUser,
        allPlayers,
        error,
        setError,
        signUp,
        logIn,
        logOut
    }

    return (
        <AuthContext.Provider value={ value }>
            { dataLoaded && !loading ? children : 
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        WebkitTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)'
                    }}/>
            }
        </AuthContext.Provider>
    )
}
