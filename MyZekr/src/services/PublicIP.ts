export const getClientPublicIp = async () => {
	try {
		const res = await fetch('https://api.ipify.org?format=json');
		if (!res.ok) throw new Error(`ipify responded with ${res.status}`);
		const data = await res.json();
		if (typeof data.ip !== 'string') throw new Error('ipify response missing ip');
		return data.ip;
	} catch {
		const res = await fetch('https://ifconfig.co/ip');
		return (await res.text()).trim();
	}
};
