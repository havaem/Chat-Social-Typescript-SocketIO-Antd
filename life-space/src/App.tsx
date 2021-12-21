import { useAppDispatch } from "app/hook";
import Cookies from "js-cookie";
import Loading from "pages/Loading";
import { useEffect, useState } from "react";
import { userCurrent } from "reducers/asyncThunk/userThunk";
import AppRoute from "routes";
import ScrollToTop from "utils/ScrollToTop";
import moment from "moment";
import viVN from "antd/lib/locale/vi_VN";
import { ConfigProvider } from "antd";
import { validateMessages } from "constant/validateMessage";
moment.locale("vi");
function App() {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				Cookies.get("token") && (await dispatch(userCurrent()).unwrap());
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		!Cookies.get("language") && Cookies.set("language", "vi");
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<ConfigProvider locale={viVN} form={{ validateMessages: validateMessages }}>
						<ScrollToTop />
						<AppRoute />
					</ConfigProvider>
				</>
			)}
		</>
	);
}

export default App;
