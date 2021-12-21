const CracoLessPlugin = require("craco-less-fix");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							// "@primary-color": "#3f87f5",
							"@height-sm": "32px",
							"@height-base": "40px",
							"@height-lg": "48px",
							"@font-family": '"Poppins", sans-serif',
							"@border-radius-base": "6px",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
