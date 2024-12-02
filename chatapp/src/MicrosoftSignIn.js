import React, { useEffect, useState } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './component/Homepage';
import { InteractionStatus } from '@azure/msal-browser';

export const MicrosoftSignIn = () => {
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (inProgress === InteractionStatus.None && !isAuthenticated) {
            instance.loginRedirect({
                scopes: ['User.Read'],
            }).catch(error => {
                console.error('Microsoft Sign-In failed', error);
                setLoading(false);
            });
        } else if (isAuthenticated) {
            const account = instance.getAllAccounts()[0];
            setUser(account);
            setLoading(false);
        }
    }, [instance, inProgress, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthenticatedTemplate>
                            <Homepage user={user} />
                        </AuthenticatedTemplate>
                    }
                />
                <Route
                    path="*"
                    element={
                        <UnauthenticatedTemplate>
                            <Navigate to="/" />
                        </UnauthenticatedTemplate>
                    }
                />
            </Routes>
        </Router>
    );
};

export default MicrosoftSignIn;