import { useAppSelector } from "app/hook";
import { pathConstants } from "constant/pathConstant";
import MainLayout from "layouts/MainLayout";
import UserLayout from "layouts/UserLayout";
import ForgetPassword from "pages/ForgetPassword";
import Home from "pages/Home";
import Login from "pages/Login";
import Notfound from "pages/Notfound";
import Profile from "pages/Profile";
import PublicChat from "pages/PublicChat";
import Register from "pages/Register";
import ResetPassword from "pages/ResetPassword";
import Setting from "pages/Setting";
import Verify from "pages/Verify";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRoute(): ReactElement {
	const isLogin = useAppSelector((state) => state.user.data._id) ? true : false;
	return (
		<Routes>
			<Route path={pathConstants.root} element={isLogin ? <UserLayout /> : <MainLayout />}>
				<Route index element={<Home />} />
				{!isLogin ? (
					<>
						<Route path={pathConstants.login} element={<Login />} />
						<Route path={pathConstants.register} element={<Register />} />
						<Route path={pathConstants.verify} element={<Verify />} />
						<Route path={pathConstants.forgetPassword} element={<ForgetPassword />} />
						<Route path={pathConstants.resetPassword} element={<ResetPassword />} />
					</>
				) : (
					<>
						<Route path={pathConstants.publicChat} element={<PublicChat />} />
						<Route path={pathConstants.profile} element={<Profile />} />
						<Route path={`${pathConstants.profile}/:slug`} element={<Profile />} />
						<Route path={pathConstants.setting} element={<Setting />} />
					</>
				)}
			</Route>
			<Route path="*" element={<Notfound />} />
		</Routes>
	);
}
