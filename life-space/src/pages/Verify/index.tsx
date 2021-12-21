import { Button, Result } from "antd";
import Layout from "antd/lib/layout/layout";
import { useAppDispatch } from "app/hook";
import { translateMessage } from "constant/messageLanguage";
import { pathConstants } from "constant/pathConstant";
import Cookies from "js-cookie";
import Loading from "pages/Loading";
import { ReactElement, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userVerify } from "reducers/asyncThunk/userThunk";

interface Props {}

export default function Verify(props: Props): ReactElement {
	const { token } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const handleVerify = async () => {
		try {
			await dispatch(userVerify({ token })).unwrap();
			setShow(true);
		} catch (error) {
			navigate("/notfound");
		}
	};
	useLayoutEffect(() => {
		handleVerify();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout>
			{show ? (
				<Result
					status="success"
					title={translateMessage(Cookies.get("language"), "Successful verification!")}
					subTitle={translateMessage(
						Cookies.get("language"),
						"Welcome to us! Wish you have a good experience."
					)}
					extra={[
						<Link to={pathConstants.login} key="0">
							<Button type="primary" key="console">
								{translateMessage(Cookies.get("language"), "Login")}
							</Button>
						</Link>,
					]}
				/>
			) : (
				<Loading />
			)}
		</Layout>
	);
}
