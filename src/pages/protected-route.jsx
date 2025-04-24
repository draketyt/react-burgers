import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, onlyUnauth = false, fromForgot = false }) => {
	const { isAuthenticated } = useSelector(state => state.auth);
	const location = useLocation();

	if (!fromForgot && location.state?.from === 'forgot-password') {
		return <Navigate to="/reset-password" replace={true} />;
	}

	if (onlyUnauth && isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	if (!onlyUnauth && !isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};