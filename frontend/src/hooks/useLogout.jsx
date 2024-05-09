import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const {setState} = useAuthContext()
    const logout = () => {

        //remove from localStorage
        localStorage.removeItem('user')

        //global context logout
        setState({type: 'LOGOUT'})
    }

    return {logout}
}