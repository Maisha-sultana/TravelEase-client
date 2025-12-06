import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider,  
    signInWithPopup,    
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

import { auth } from '../firebase/firebase.init'; 

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      
        if (currentUser) {
            console.log('User Display Name:', currentUser.displayName);
            console.log('User Photo URL:', currentUser.photoURL); 
        } else {
             console.log('User logged out.');
        }
      
        
        setUser(currentUser);
        setLoading(false);
    });
    return () => unsubscribe();
}, []);

    // Google Sign-In Function
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    
    const emailPasswordSignIn = (email, password) => {
        setLoading(true);
        // Firebase Auth function
        return signInWithEmailAndPassword(auth, email, password); 
    };
    const registerUser = (email, password, name, photoURL) => {
        setLoading(true);
       
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
             
                return updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: photoURL
                })
                .then(() => {
                    // Return the credential object
                    return userCredential;
                })
            });
    };
    // Logout Function
    const logOut = () => {
        setLoading(true); 
        return signOut(auth);
    };

    const authInfo = {
        user,
        loading,
        logOut,
        googleSignIn, 
        emailPasswordSignIn,
        registerUser,
        auth 
    };

    return (
        <AuthContext.Provider value={authInfo}>

            {!loading && children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;