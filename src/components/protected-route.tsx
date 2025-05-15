import React, {FC} from "react";
import {Location, Navigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute:FC<ProtectedRouteProps> = ({ children, anonymous = false, redirectTo = '/', fromForgot = false }) => {
	const { isAuthenticated, isLoading } = useSelector((state:any):any => state.auth);
	const location:Location<any> = useLocation();

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


