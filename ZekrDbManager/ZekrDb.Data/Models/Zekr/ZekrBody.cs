using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Newtonsoft.Json;
using ZekrDb.Data.Infrastructure;

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrBody : BaseModel
	{
		private string _body;
		private ZekrBody _translationBody;
		private ObservableCollection<ZekrBody> _alternateBodyList;
		private string _languageKey;
		private bool? _optional;
		private string _optionalText;

		public string body
		{
			get => _body;
			set => _body = value;
		}


		/// <summary>
		/// nullable
		/// </summary>
		public ZekrBody translationBody
		{
			get => _translationBody;
			set
			{
				_translationBody = value; OnPropertyChanged();
			}
		}

		public ObservableCollection<ZekrBody> alternateBodyList
		{
			get => _alternateBodyList;
			set { _alternateBodyList = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		public string languageKey
		{
			get => _languageKey;
			set { _languageKey = value; OnPropertyChanged(); }
		}

		public bool? optional
		{
			get => _optional;
			set { _optional = value; OnPropertyChanged(); }
		}

		/// <summary>
		/// nullable
		/// </summary>
		public string optionalText
		{
			get => _optionalText;
			set { _optionalText = value; OnPropertyChanged(); }
		}
		protected override BaseModelValidationResult ValidateInternal()
		{
			var validationResult = base.ValidateInternal();
			if (!validationResult.IsValid)
				return validationResult;

			if ((_alternateBodyList == null || _alternateBodyList.Count == 0) && (_translationBody == null))
			{
				if (string.IsNullOrWhiteSpace(body))
				{
					validationResult.AddError("ورود متن اجباری است");
				}
			}

			if (_translationBody != null)
			{
				var altResult = _translationBody.Validate();
				if (!altResult.IsValid)
				{
					validationResult.AddError("خطا در متن دوم: ");
					validationResult.Errors.AddRange(altResult.Errors);
				}
			}

			if (_alternateBodyList?.Count > 0)
			{
				foreach (var altZekrBody in _alternateBodyList)
				{
					var altResult = altZekrBody.Validate();
					if (!altResult.IsValid)
					{
						validationResult.AddError("خطا در لیست متن دوم: ");
						validationResult.Errors.AddRange(altResult.Errors);
					}
				}
			}
			return validationResult;
		}

		public BaseModelValidationResult Validate()
		{
			return ValidateInternal();
		}
	}
}
