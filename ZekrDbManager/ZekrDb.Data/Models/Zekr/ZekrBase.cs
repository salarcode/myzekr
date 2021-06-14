using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;
// ReSharper disable InconsistentNaming

namespace ZekrDb.Data.Models.Zekr
{
	public abstract class ZekrBase : BaseModel
	{
		private string _uid;
		private string _shortName;
		private string _fullName;
		private string _imageUrl;
		private string _imageClass;
		private string _category;
		private List<string> _parents;
		private List<string> _tags;
		private List<ZekrTime> _zekrTimes;

		[Display(Name = "UID")]
		public string uid
		{
			get => _uid;
			set { _uid = value; OnPropertyChanged(); }
		}

		[Display(Name = "عنوان کوتاه")]
		[DisplayName("عنوان کوتاه")]
		public string shortName
		{
			get => _shortName;
			set { _shortName = value; OnPropertyChanged(); }
		}

		[Display(Name = "عنوان بلند کامل")]
		public string fullName
		{
			get => _fullName;
			set { _fullName = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		[Display(Name = "Image Url")]
		public string imageUrl
		{
			get => _imageUrl;
			set { _imageUrl = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		[Display(Name = "Image Css Class")]
		public string imageClass
		{
			get => _imageClass;
			set { _imageClass = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		[Display(Name = "دسته")]
		[DisplayName("دسته")]
		public string category
		{
			get => _category;
			set { _category = value; OnPropertyChanged(); }
		}

		[Browsable(false)]
		public List<string> parents
		{
			get => _parents;
			set { _parents = value; OnPropertyChanged(); }
		}

		[Browsable(false)]
		[Display(Name = "تگ ها")]
		public List<string> tags
		{
			get => _tags;
			set { _tags = value; OnPropertyChanged(); }
		}

		
		[Browsable(false)]
		[Display(Name = "زمان ها")]
		public List<ZekrTime> zekrTimes
		{
			get => _zekrTimes;
			set { _zekrTimes = value; OnPropertyChanged(); }
		}

		protected override BaseModelValidationResult ValidateInternal()
		{
			var validationResult = base.ValidateInternal();
			if (!validationResult.IsValid)
				return validationResult;

			if (string.IsNullOrWhiteSpace(uid))
				validationResult.AddError("UID اجباری است");

			if (string.IsNullOrWhiteSpace(shortName))
				validationResult.AddError("نام کوتاه اجباری است");

			if (string.IsNullOrWhiteSpace(fullName))
				validationResult.AddError("نام بلند اجباری است");

			if (string.IsNullOrWhiteSpace(category))
				validationResult.AddError("دسته اجباری است");

			return validationResult;
		}
	}
}