import publicIp from 'public-ip';

export const getClientPublicIp = async () =>
	await publicIp.v4({
		fallbackUrls: ['https://ifconfig.co/ip'],
	});
