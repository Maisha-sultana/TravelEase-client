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
// FIX: Correctly import the 'auth' object from your firebase init file
import { auth } from '../firebase/firebase.init'; 

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Observer: Watches for changes in user sign-in state
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        // --- নিশ্চিতকরণের জন্য এই লাইনটি যোগ করুন ---
        if (currentUser) {
            console.log('User Display Name:', currentUser.displayName);
            console.log('User Photo URL:', currentUser.photoURL); 
        } else {
             console.log('User logged out.');
        }
        // ---------------------------------------------
        
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
        // 1. Create the user
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // 2. Update user profile immediately after creation
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
        // We also export the auth instance itself for use in other firebase operations
        auth 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {/* Renders children only after initial auth check is complete */}
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;