// https://giot.ir/2020/05/16/%d8%b3%d8%b1%d9%88%db%8c%d8%b3-%d8%a7%d8%b3%d8%aa%d8%b9%d9%84%d8%a7%d9%85-ip-%d8%a7%db%8c%d9%86%d8%aa%d8%b1%d9%86%d8%aa%db%8c-%d8%a8%d8%b1%d8%a7%db%8c-%d8%aa%d8%ac%d9%87%db%8c%d8%b2%d8%a7%d8%aa-%d8%a7/
// https://www.giot.ir/webservices/praytimes.php
// https://www.giot.ir/webservices/returnmyip.php?format=json&req_ip=23.5.5.5
// https://www.giot.ir/webservices/returnmyip.php?format=json
// https://keybit.ir/brain/%D9%88%D8%A8-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-%D8%A7%D9%88%D9%82%D8%A7%D8%AA-%D8%B4%D8%B1%D8%B9%DB%8C/
// https://api.keybit.ir/owghat/?long=59.18291&lat=33.73672
// https://api.keybit.ir/owghat/?long=-37.697092&lat=144.925607

/*
 * https://prayertimes.date/api
 * https://prayertimes.date/api/docs/today
 *
 * https://aladhan.com/prayer-times-api
 * https://api.pray.zone/v2/times/today.json?longitude=144.963&latitude=-37.8142&elevation=8000&school=7
 *
 *
 */
export enum ZekrTime {
	AfterMidnight = 'AfterMidnight',
	NightPrayer = 'NightPrayer',
	BetweenDawn = 'BetweenDawn',
	MorningPrayer = 'MorningPrayer',
	AfterMorningPrayer = 'AfterMorningPrayer',
	BeforeNoonPrayer = 'BeforeNoonPrayer',
	NoonPrayer = 'NoonPrayer',
	AfterNoonPrayer = 'AfterNoonPrayer',
	BeforeAsrPrayer = 'BeforeAsrPrayer',
	AsrPrayer = 'AsrPrayer',
	AfterAsrPrayer = 'AfterAsrPrayer',
	AfterSunset = 'AfterSunset',
	BeforeMaghribPrayer = 'BeforeMaghribPrayer',
	MaghribPrayer = 'MaghribPrayer',
	AfterMaghribPrayer = 'AfterMaghribPrayer',
	BetweenMaghribAndIshaPrayer = 'BetweenMaghribAndIshaPrayer',
	BeforeIshaPrayer = 'BeforeIshaPrayer',
	IshaPrayer = 'IshaPrayer',
	AfterIshaPrayer = 'AfterIshaPrayer',
	ThursdayNight = 'ThursdayNight',
	NightOfFriday = 'NightOfFriday',
	Friday = 'Friday',
	FridayEndOfDaylight = 'FridayEndOfDaylight',
	RamadanMonth = 'RamadanMonth',
	RamadanQadrNights = 'RamadanQadrNights',
	EidFitr = 'EidFitr',
	EidAdha = 'EidAdha',
	EidGhadir = 'EidGhadir',
	ArafaDay = 'ArafaDay',
	ArafaNight = 'ArafaNight',
	NightOfSaturday = 'NightOfSaturday',
	ArbaeenHosseini = 'ArbaeenHosseini',
	HalfOfShabanDay = 'HalfOfShabanDay',
	NightsOfWednesday = 'NightsOfWednesday',
}

export function getZekrTimeText(zekrTime: ZekrTime): string {
	switch (zekrTime) {
		case ZekrTime.AfterMidnight:
			return `بعد از نیمه شب`;

		case ZekrTime.NightPrayer:
			return `نماز شب`;

		case ZekrTime.BetweenDawn:
			return `بین الطلوعین`;

		case ZekrTime.MorningPrayer:
			return `نماز صبح`;

		case ZekrTime.AfterMorningPrayer:
			return `بعد نماز صبح`;

		case ZekrTime.BeforeNoonPrayer:
			return `قبل نماز ظهر`;

		case ZekrTime.NoonPrayer:
			return `نماز ظهر`;

		case ZekrTime.AfterNoonPrayer:
			return `بعد نماز ظهر`;

		case ZekrTime.BeforeAsrPrayer:
			return `قبل نماز عصر`;

		case ZekrTime.AsrPrayer:
			return `نماز عصر`;

		case ZekrTime.AfterAsrPrayer:
			return `بعد نماز عصر`;

		case ZekrTime.AfterSunset:
			return `بعد غروب آفتاب`;

		case ZekrTime.BeforeMaghribPrayer:
			return `قبل نماز مغرب`;

		case ZekrTime.MaghribPrayer:
			return `نماز مغرب`;

		case ZekrTime.AfterMaghribPrayer:
			return `بعد نماز مغرب`;

		case ZekrTime.BetweenMaghribAndIshaPrayer:
			return `بعد از نماز مغرب و قبل از نماز عشا`;

		case ZekrTime.BeforeIshaPrayer:
			return `قبل نماز عشا`;

		case ZekrTime.IshaPrayer:
			return `نماز عشا`;

		case ZekrTime.AfterIshaPrayer:
			return `بعد نماز عشا`;

		case ZekrTime.ThursdayNight:
			return `پنج شنبه شب`;

		case ZekrTime.NightOfFriday:
			return `شب جمعه`;

		case ZekrTime.Friday:
			return `جمعه`;

		case ZekrTime.FridayEndOfDaylight:
			return `آخر وقت روز جمعه`;

		case ZekrTime.RamadanMonth:
			return `ماه رمضان`;

		case ZekrTime.RamadanQadrNights:
			return `شب های قدر`;

		case ZekrTime.EidFitr:
			return `عید فطر`;

		case ZekrTime.EidAdha:
			return `عید قربان`;

		case ZekrTime.EidGhadir:
			return `عید قدیر`;

		case ZekrTime.ArafaDay:
			return `روز عرفه`;

		case ZekrTime.ArafaNight:
			return `شب عرفه`;

		case ZekrTime.NightOfSaturday:
			return `شب شنبه`;

		case ZekrTime.ArbaeenHosseini:
			return `اربعین حسینی`;

		case ZekrTime.HalfOfShabanDay:
			return `نیمه شعبان`;

		case ZekrTime.NightsOfWednesday:
			return `شب چهار شنبه`;
	}
	return '';
}
