﻿using System;
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
		private string _fullName;
		private string _metaTitle;
		private string _metaDescription;
		private string _imageUrl;
		private string _imageClass;
		private string _category;
		private List<string> _parents;
		private List<string> _tags;
		private List<ZekrTime> _zekrTimes;
		private List<ZekrCounter> _zekrCounts;
		private bool? _showZekrCounter;
		private bool? _hasVoice;

		[Display(Name = "UID")]
		public string uid
		{
			get => _uid;
			set { _uid = value; OnPropertyChanged(); }
		}


		[Display(Name = "عنوان بلند کامل")]
		public string fullName
		{
			get => _fullName;
			set { _fullName = value; OnPropertyChanged(); }
		}

		[Display(Name = "عنوان ویژه")]
		[DisplayName("عنوان ویژه")]
		public string metaTitle
		{
			get => _metaTitle;
			set { _metaTitle = value; OnPropertyChanged(); }
		}

		[Display(Name = "شرح ویژه")]
		[DisplayName("شرح ویژه")]
		public string metaDescription
		{
			get => _metaDescription;
			set { _metaDescription = value; OnPropertyChanged(); }
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

		[Browsable(false)]
		[Display(Name = "نمایش ذکر شمار")]
		public bool? showZekrCounter
		{
			get => _showZekrCounter;
			set { _showZekrCounter = value; OnPropertyChanged(); }
		}

		[Browsable(false)]
		[Display(Name = "ذکر شمار")]
		public List<ZekrCounter> zekrCounts
		{
			get => _zekrCounts;
			set { _zekrCounts = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		[Display(Name = "صوت دارد")]
		[DisplayName("صوت دارد")]
		public bool? hasVoice
		{
			get => _hasVoice;
			set { _hasVoice = value; OnPropertyChanged(); }
		}

		protected override BaseModelValidationResult ValidateInternal()
		{
			var validationResult = base.ValidateInternal();
			if (!validationResult.IsValid)
				return validationResult;

			if (string.IsNullOrWhiteSpace(uid))
				validationResult.AddError("UID اجباری است");

			if (string.IsNullOrWhiteSpace(metaTitle))
				validationResult.AddError("نام کوتاه اجباری است");

			if (string.IsNullOrWhiteSpace(fullName))
				validationResult.AddError("نام بلند اجباری است");

			if (string.IsNullOrWhiteSpace(category))
				validationResult.AddError("دسته اجباری است");

			return validationResult;
		}
	}
}