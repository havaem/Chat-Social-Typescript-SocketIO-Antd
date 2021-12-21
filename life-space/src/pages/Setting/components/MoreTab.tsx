import { Card } from "antd";
import { translateMessage } from "constant/messageLanguage";
import Cookies from "js-cookie";
import { ReactElement } from "react";

interface Props {
	data: any;
}

export default function MoreTab(props: Props): ReactElement {
	return (
		<Card
			bordered
			className="setting_tab"
			title={translateMessage(Cookies.get("language"), "Basic Infomation")}
		>
			Content of 3
		</Card>
	);
}
