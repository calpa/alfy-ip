const alfy = require("alfy");

const { ipPools, chinaIpPools, allPools } = require("./pools");

const ipRegex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

const extractIP = text => text.match(ipRegex)[0];

const handlePool = pool => {
	return Promise.all(
		pool.map(item => {
			return alfy.fetch(item.url, item.options);
		})
	).then(res => {
		handleItems(res, pool);
	});
};

const handleItems = (arr, pools) => {
	const ans = arr.map((item, index) => {
		let subtitle = item.country || "";
		const ipName =
			item[pools[index].ip] ||
			item.ip ||
			extractIP(item) ||
			"Somethings goes wrong";

		// If the ip does not match ip regex
		if (ipName.match(ipRegex) === false) {
			subtitle = ipName;
		}

		return {
			title: `${pools[index].name}: ${ipName}`,
			subtitle,
			icon: {
				type: "info",
				path: "icon.png"
			}
		};
	});

	alfy.output(ans);
};

const actions = [
	{
		name: "all",
		action: () => handlePool(allPools)
	},
	{
		name: "china",
		action: () => handlePool(chinaIpPools)
	},
	{
		name: "oversea",
		action: () => handlePool(ipPools)
	}
];

const main = () => {
	const name = alfy.inputMatches(actions, "name");
	name[0].action();
};

module.exports = main;
