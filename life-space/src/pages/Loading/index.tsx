import { ReactElement } from "react";
import "./style.scss";
interface Props {}

export default function Loading(props: Props): ReactElement {
	return (
		<div className="spinner-loading">
			<div className="spinner-box">
				<div className="configure-border-1">
					<div className="configure-core"></div>
				</div>
				<div className="configure-border-2">
					<div className="configure-core"></div>
				</div>
			</div>
		</div>
	);
}
