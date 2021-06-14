using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Newtonsoft.Json;

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrBody : BaseModel
	{
		private string _body;
		private ZekrBody _alternateBody;
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
		public ZekrBody alternateBody
		{
			get => _alternateBody;
			set
			{
				_alternateBody = value; OnPropertyChanged();
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

			if ((_alternateBodyList == null || _alternateBodyList.Count == 0) && (_alternateBody == null))
			{
				if (string.IsNullOrWhiteSpace(body))
				{
					validationResult.AddError("ورود متن اجباری است");
				}
			}

			if (_alternateBody != null)
			{
				var altResult = _alternateBody.Validate();
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
