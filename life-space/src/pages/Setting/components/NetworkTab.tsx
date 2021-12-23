import { Card } from "antd";
import { translateMessage } from "constant/messageLanguage";
import Cookies from "js-cookie";
import { ReactElement } from "react";

interface Props {
	data: any;
}

export default function NetworkTab(props: Props): ReactElement {
	return (
		<Card
			bordered
			className="setting_tab"
			title={translateMessage(Cookies.get("language"), "Network Integration")}
		></Card>
	);
}
