using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using ZekrDb.Data.Annotations;

namespace ZekrDb.Data.Models
{
	public abstract class BaseModel : INotifyPropertyChanged
	{
		public event PropertyChangedEventHandler? PropertyChanged;

		[NotifyPropertyChangedInvocator]
		protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

		protected virtual BaseModelValidationResult ValidateInternal()
		{
			return new BaseModelValidationResult()
			{
				IsValid = true
			};
		}
	}

	public class BaseModelValidationResult
	{
		public bool IsValid { get; set; }

		public List<string> Errors { get; set; } = new();

		public string ErrorsMessage => string.Join("\r\n", Errors);

		public void AddError(string message)
		{
			IsValid = false;
			Errors.Add(message);
		}
	}
}
