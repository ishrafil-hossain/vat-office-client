import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import initializeFirebase from "../Pages/Home/Login/Firebase/firebase.init";

// initialize firebase app 
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [receptionist, setReceiptionist] = useState(false);

    const auth = getAuth();

    // User registration 
    const registerUser = (email, password, name, department, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, department: department };
                setUser(newUser);
                // save user to the database 
                saveUser(email, name, department);
                // send name to firebase after creation 
                updateProfile(auth.currentUser, {
                    displayName: name,
                    department: department
                }).then(() => {
                }).catch((error) => {
                });

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message, errorCode);
            })
            .finally(() => setIsLoading(false));
    }


    // User Login 
    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                setAuthError(error.message, errorCode);
            })
            .finally(() => setIsLoading(false));
    }


    // User Observation 
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])


    // receiptionist checker 
    useEffect(() => {
        fetch(`https://shrouded-spire-42050.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setReceiptionist(data.receptionist))
    }, [user.email])


    // User Logout 
    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, department) => {
        const user = { email, displayName, department }
        fetch('https://shrouded-spire-42050.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()

    }


    return {
        user,
        isLoading,
        authError,
        receptionist,
        registerUser,
        loginUser,
        logout
    }
}

export default useFirebase;