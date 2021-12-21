import { Footer as Container } from "antd/lib/layout/layout";
import { ReactElement } from "react";
import "./style.scss";
interface Props {}

export default function Footer(props: Props): ReactElement {
	return (
		<Container className="footer">
			South ©2021 Created by
			<a target={"_blank"} href="https://www.facebook.com/100009457467356/" rel="noreferrer">
				Võ Hoài Nam
			</a>
		</Container>
	);
}
