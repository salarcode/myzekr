using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
// ReSharper disable InconsistentNaming

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrCategory : BaseModel
	{
		private string _uid;
		private string _title;
		private string _description;
		private string _iconClass;
		private string _imageUrl;
		private string[] _children;
		private string[] _parent;

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

		public string description
		{
			get => _description;
			set { _description = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		public string iconClass
		{
			get => _iconClass;
			set { _iconClass = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		public string imageUrl
		{
			get => _imageUrl;
			set { _imageUrl = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable - Children category UID
		/// </summary>
		public string[] children
		{
			get => _children;
			set { _children = value; OnPropertyChanged(); }
		}


		/// <summary>
		/// nullable
		/// </summary>
		public string[] parent
		{
			get => _parent;
			set { _parent = value; OnPropertyChanged(); }
		}
	}
}
