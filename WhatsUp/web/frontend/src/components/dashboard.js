import { useAuthState }from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Dashboard() {

    const [user, loading, error] = useAuthState(auth);

    return (
        <>
        <h1>Welcome {user?.email}</h1>
        <button onClick={() => auth.signOut()}>Sign Out</button>
        </>
    )
}

export default Dashboard;