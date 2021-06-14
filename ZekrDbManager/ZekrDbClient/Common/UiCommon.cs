using System;
using System.Threading.Tasks;
using System.Windows.Media;
using ModernWpf.Controls;

namespace ZekrDbClient.Common
{
	public static class UiCommon
	{
		public static Brush RandomBrush()
		{
			var rand = new Random();
			return new SolidColorBrush(Color.FromRgb((byte)rand.Next(0, 256), (byte)rand.Next(0, 256),
				(byte)rand.Next(0, 256)));
		}
		public static Brush RandomDarkBrush()
		{
			var rand = new Random();
			return new SolidColorBrush(Color.FromArgb(25,(byte) rand.Next(50, 200), (byte) rand.Next(50, 200),
				(byte) rand.Next(50, 200)));
		}

		public static Task<ContentDialogResult> ErrorDialogAsync(string content, string title)
		{
			var dig = new ContentDialog()
			{
				CloseButtonText = "بستن",
				IsSecondaryButtonEnabled = false,
				IsPrimaryButtonEnabled = false,
				Content = content,
				DefaultButton = ContentDialogButton.Close,
				Title = title 
			};
			return dig.ShowAsync();
		}

		public static Task<ContentDialogResult> ConfirmDialogAsync(string content, string title)
		{
			return ContentDialogAsync("تایید", "انصراف", content, title, true);
		}

		public static Task<ContentDialogResult> ContentDialogAsync(string primaryButtonText, string closeButtonText, string content, string title, bool isPrimaryDefault = false)
		{
			var dig = new ContentDialog()
			{
				PrimaryButtonText = primaryButtonText,
				CloseButtonText = closeButtonText,
				IsSecondaryButtonEnabled = false,
				Content = content,
				DefaultButton = isPrimaryDefault == true ? ContentDialogButton.Primary : ContentDialogButton.Close,
				Title = title,
			};
			return dig.ShowAsync();
		}
	}
}
