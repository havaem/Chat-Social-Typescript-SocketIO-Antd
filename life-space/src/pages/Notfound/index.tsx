import { Button, Result } from "antd";
import { translateMessage } from "constant/messageLanguage";
import Cookies from "js-cookie";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {}

export default function Notfound(props: Props): ReactElement {
	return (
		<Result
			status="404"
			title="404"
			subTitle={translateMessage(
				Cookies.get("language"),
				"Did you make a mistake? This page doesn't exist!"
			)}
			extra={
				<Button type="primary" shape="round">
					<Link to="/">Về trang chủ</Link>
				</Button>
			}
		/>
	);
}
