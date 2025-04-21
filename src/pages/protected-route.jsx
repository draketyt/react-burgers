import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isAuthLoading } = useSelector(state => state.auth);

	if (isAuthLoading) {
		return <div className="loading">Загрузка...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
