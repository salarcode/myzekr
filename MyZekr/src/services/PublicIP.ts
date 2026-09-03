export const getClientPublicIp = async () => {
	try {
		const res = await fetch('https://api.ipify.org?format=json');
		const data = await res.json();
		return data.ip as string;
	} catch {
		const res = await fetch('https://ifconfig.co/ip');
		return (await res.text()).trim();
	}
};
