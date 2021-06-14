using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;
// ReSharper disable InconsistentNaming

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrReferenceSource : BaseModel
	{
		private string _title;
		private string _url;

		[Required]
		[Display(Name = "عنوان مرجع")]
		[DisplayName("عنوان مرجع")]
		public string title
		{
			get => _title;
			set { _title = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		[DataType(DataType.Url)]
		[Display(Name = "لینک مرجع")]
		[DisplayName("لینک مرجع")]
		public string url
		{
			get => _url;
			set { _url = value; OnPropertyChanged(); }
		}
	}
}
