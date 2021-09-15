using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace ZekrDb.Data.Models.Zekr
{
	public class Zekr : ZekrBase
	{
		private ObservableCollection<ZekrBody> _zekrBody;
		private ObservableCollection<ZekrBody> _benefits = new ObservableCollection<ZekrBody>();
		private ObservableCollection<ZekrReferenceSource> _source = new ObservableCollection<ZekrReferenceSource>();
		private ObservableCollection<ZekrVoice> _zekrVoices;

		public ObservableCollection<ZekrBody> zekrBody
		{
			get => _zekrBody;
			set { _zekrBody = value; OnPropertyChanged(); }
		}

		public ObservableCollection<ZekrBody> benefits
		{
			get => _benefits;
			set { _benefits = value; OnPropertyChanged(); }
		}

		public ObservableCollection<ZekrReferenceSource> source
		{
			get => _source;
			set { _source = value; OnPropertyChanged(); }
		}

		public ObservableCollection<ZekrVoice> zekrVoices
		{
			get => _zekrVoices;
			set { _zekrVoices = value; OnPropertyChanged(); }
		}

		protected override BaseModelValidationResult ValidateInternal()
		{
			var validationResult = base.ValidateInternal();
			if (!validationResult.IsValid)
				return validationResult;

			if (zekrBody == null || zekrBody.Count == 0)
				validationResult.AddError("وارد کردن حداقل یک متن اجباری است");
			else
			{
				for (var index = 0; index < zekrBody.Count; index++)
				{
					var body = zekrBody[index];

					var bodyResult = body.Validate();
					if (!bodyResult.IsValid)
					{
						validationResult.AddError($"خطا در متن شماره {index + 1} : ");
						validationResult.Errors.AddRange(bodyResult.Errors);
					}
				}
			}

			if (benefits?.Count > 0)
			{
				for (int i = 0; i < benefits.Count; i++)
				{
					var b = benefits[i];

					var bodyResult = b.Validate();
					if (!bodyResult.IsValid)
					{
						validationResult.AddError($"خطا در فضیلت شماره {i + 1} : ");
						validationResult.Errors.AddRange(bodyResult.Errors);
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
