import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children, anonymous = false, redirectTo = '/', fromForgot = false }) => {
	const { isAuthenticated, isLoading } = useSelector(state => state.auth);
	const location = useLocation();

	if (isLoading) return null;

	if (fromForgot && location.state?.from !== 'forgot-password') {
		return <Navigate to="/forgot-password" replace />;
	}

	if (anonymous && isAuthenticated) {
		return <Navigate to={redirectTo} replace />;
	}

	if (!anonymous && !isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};


ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	anonymous: PropTypes.bool,
	redirectTo: PropTypes.string,
	fromForgot: PropTypes.bool,
};