using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZekrDb.Data.Models
{
	public static class LanguageList
	{
		public const string LanguageArabic = "ar";
		public const string LanguageFarsi = "fa";

		public class LanguageItem
		{
			public string Name { get; set; }

			public string Key { get; set; }
		}

		static readonly ObservableCollection<LanguageItem> _list = new ObservableCollection<LanguageItem>()
		{
			new LanguageItem()
			{
				Key = null,
				Name = "(انتخاب نشده)"
			},
			new LanguageItem()
			{
				Key = "fa",
				Name = "فارسی"
			},
			new LanguageItem()
			{
				Key = "ar",
				Name = "عربی"
			}
		};

		public static ObservableCollection<LanguageItem> List = _list;
	}
}
