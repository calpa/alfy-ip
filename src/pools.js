const ipPools = [
	{
		url: "https://api.ipify.org?format=json",
		name: "ipify.org"
	},
	{
		url: "https://api.myip.com/",
		name: "myip.com"
	},
	{
		url: "http://ip-api.com/json",
		name: "ip-api.com",
		ip: "query"
	}
];

const chinaIpPools = [
	{
		url: "https://ip.cn/index.php",
		name: "ip.cn",
		options: {
			regex: true,
			json: false
		}
	}
];

const allPools = ipPools.concat(chinaIpPools);

module.exports = {
	ipPools,
	chinaIpPools,
	allPools
};
