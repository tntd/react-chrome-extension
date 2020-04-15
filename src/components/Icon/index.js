import React from "react";
import "./iconfont/iconfont";
import "./index.less";

export default ({ type, ...props }) => {
	return (
		<i className={`iconfont ${type}`}>
			<svg aria-hidden="true" className="tnt-icon" {...props}>
				<use xlinkHref={`#${type}`} />
			</svg>
		</i>
	);
};
