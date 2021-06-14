using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
// ReSharper disable InconsistentNaming

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrTag : BaseModel
	{
		private string _uid;
		private string _title;

		[Required]
		public string uid
		{
			get => _uid;
			set { _uid = value; OnPropertyChanged(); }
		}

		[Required]
		public string title
		{
			get => _title;
			set { _title = value; OnPropertyChanged(); }
		}
	}
}
