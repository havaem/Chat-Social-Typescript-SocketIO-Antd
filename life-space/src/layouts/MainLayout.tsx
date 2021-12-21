import Footer from "components/Footer";
import Header from "components/Header";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
export default function MainLayout(): ReactElement {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
