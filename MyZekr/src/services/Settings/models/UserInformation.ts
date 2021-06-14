export interface UserInformation {
	prayerTimesWeekly: PrayerTime[];
	location: UserLocation;
}

export function getUserInformationInitial(): UserInformation {
	return {
		prayerTimesWeekly: [],
		location: {
			found: false,
			latitude: 0,
			longitude: 0,
			elevation: 0,
			ip_address: '',
			city: '',
			country: '',
			country_code: '',
			timezone: '',
			local_offset: 0,
		},
	};
}

export interface PrayerTime {
	times: {
		Imsak: string;
		Fajr: string;
		Sunrise: string;
		Dhuhr: string;
		Asr: string;
		Sunset: string;
		Maghrib: string;
		Isha: string;
		Midnight: string;
	};
	date: {
		timestamp: 0;
		gregorian: string;
		hijri: string;
	};
	/* 
      {
        "times": {
          "Imsak": "05:48",
          "Sunrise": "07:14",
          "Fajr": "05:58",
          "Dhuhr": "12:20",
          "Asr": "14:49",
          "Sunset": "17:25",
          "Maghrib": "17:28",
          "Isha": "18:36",
          "Midnight": "23:42"
        },
        "date": {
          "timestamp": 1623369600,
          "gregorian": "2021-06-11",
          "hijri": "1442-11-01"
        }
      } 
*/
}
export interface UserLocation {
	found: boolean;
	latitude: number;
	longitude: number;
	elevation: number;
	ip_address: string;
	city: string;
	country: string;
	country_code: string;
	timezone: string;
	local_offset: number;
	/*
		"location": {
			"latitude": -37.814,
			"longitude": 144.96332,
			"elevation": 0,
			"ip_address": "125.168.14.232",
			"city": "Melbourne",
			"country": "Australia",
			"country_code": "AU",
			"timezone": "Australia/Melbourne",
			"local_offset": 10			
		}
	 */
}
