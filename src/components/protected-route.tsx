import React, {FC} from "react";
import { Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";

export const ProtectedRoute:FC<ProtectedRouteProps> = ({ children, anonymous = false, redirectTo = '/feed', fromForgot = false,}) => {
	const { isAuthenticated, isLoading,authChecked } = useAppSelector((state):any => state.auth);
	const location = useLocation();

	if (isLoading) return null;

	if (!authChecked) {
		return <p className="text text_type_main-large">Проверка авторизации...</p>;
	}
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


