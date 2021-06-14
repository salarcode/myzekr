using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ZekrDb.Data.Models.Zekr
{
	[JsonConverter(typeof(StringEnumConverter))]
	public enum ZekrTime
	{
		[Display(Name = "بعد از نیمه شب")]
		AfterMidnight,

		[Display(Name = "نماز شب")]
		NightPrayer,

		[Display(Name = "بین الطلوعین")]
		BetweenDawn,

		[Display(Name = "نماز صبح")]
		MorningPrayer,

		[Display(Name = "بعد نماز صبح")]
		AfterMorningPrayer,

		[Display(Name = "قبل نماز ظهر")]
		BeforeNoonPrayer,

		[Display(Name = "نماز ظهر")]
		NoonPrayer,

		[Display(Name = "بعد نماز ظهر")]
		AfterNoonPrayer,

		[Display(Name = "قبل نماز عصر")]
		BeforeAsrPrayer,

		[Display(Name = "نماز عصر")]
		AsrPrayer,

		[Display(Name = "بعد نماز عصر")]
		AfterAsrPrayer,

		[Display(Name = "بعد غروب آفتاب")]
		AfterSunset,

		[Display(Name = "قبل نماز مغرب")]
		BeforeMaghribPrayer,

		[Display(Name = "نماز مغرب")]
		MaghribPrayer,

		[Display(Name = "بعد نماز مغرب")]
		AfterMaghribPrayer,

		[Display(Name = "بعد از نماز مغرب و قبل از نماز عشا")]
		BetweenMaghribAndIshaPrayer,

		[Display(Name = "قبل نماز عشا")]
		BeforeIshaPrayer,

		[Display(Name = "نماز عشا")]
		IshaPrayer,

		[Display(Name = "بعد نماز عشا")]
		AfterIshaPrayer,

		[Display(Name = "پنج شنبه شب")]
		ThursdayNight,

		[Display(Name = "شب جمعه")]
		NightOfFriday,

		[Display(Name = "جمعه")]
		Friday,

		[Display(Name = "آخر وقت روز جمعه")]
		FridayEndOfDaylight,

		[Display(Name = "ماه رمضان")]
		RamadanMonth,

		[Display(Name = "شب های قدر")]
		RamadanQadrNights,

		[Display(Name = "عید فطر")]
		EidFitr,

		[Display(Name = "عید قربان")]
		EidAdha,

		[Display(Name = "عید قدیر")]
		EidGhadir,

		[Display(Name = "روز عرفه")]
		ArafaDay,

		[Display(Name = "شب عرفه")]
		ArafaNight,

		[Display(Name = "شب شنبه")]
		NightOfSaturday,

		[Display(Name = "اربعین حسینی")]
		ArbaeenHosseini,

		[Display(Name = "نیمه شعبان")]
		HalfOfShabanDay,

		[Display(Name = "شب چهار شنبه")]
		NightsOfWednesday 
	}
}
