using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Controls;
using ModernWpf.Controls;
using ZekrDb.Data.Models;
using ZekrDb.Data.Models.Zekr;
using ZekrDbClient.Annotations;
using ZekrDbClient.Common;

namespace ZekrDbClient.UI
{
	/// <summary>
	/// Interaction logic for ZekrindexControl.xaml
	/// </summary>
	public partial class ZekrIndexControl : UserControl, INotifyPropertyChanged
	{
		public ZekrIndexControl()
		{
			InitializeComponent();
		}

		private ObservableCollection<ZekrIndex> _zekrIndexList;


		public ObservableCollection<ZekrIndex> ZekrIndexList
		{
			get
			{
				if (_zekrIndexList == null)
				{
					_zekrIndexList = new ObservableCollection<ZekrIndex>(ZekrModelStore.ReadZekrIndex());
				}

				return _zekrIndexList;
			}
			private set
			{
				_zekrIndexList = value;
				OnPropertyChanged();
			}
		}

		private void RefreshIndexList()
		{
			var updated = new ObservableCollection<ZekrIndex>(ZekrModelStore.ReadZekrIndex());
 			if (_zekrIndexList != null)
			{
				_zekrIndexList.Clear();
			}
            ZekrIndexList = updated;
		}

		private void NewZekrClick(object sender, RoutedEventArgs e)
		{
			new ZekrWindow().Show();
		}

		private void ZekrDuplicateClick(object sender, RoutedEventArgs e)
		{
			var model = (sender as Button)?.DataContext as ZekrIndex;
			if (model == null)
				return;
			var zekrWin = new ZekrWindow();
			try
			{
				zekrWin.LoadZekr(model.uid);
			}
			catch (Exception ex)
			{
				UiCommon.ErrorDialogAsync($"مشکلی در خواندن اطلاعات '{model.uid}' پیش آمده است. \r\n" + ex.Message,
					"خطا");

				zekrWin.Close();
				return;
			}

			zekrWin.MarkZekrNew();

			zekrWin.Owner = Window.GetWindow(this);
			zekrWin.Show();
		}

		private void ZekrEditClick(object sender, RoutedEventArgs e)
		{
			var model = (sender as Button)?.DataContext as ZekrIndex;
			if (model == null)
				return;
			var zekrWin = new ZekrWindow();
			try
			{
				zekrWin.LoadZekr(model.uid);
			}
			catch (Exception ex)
			{
				UiCommon.ErrorDialogAsync($"مشکلی در خواندن اطلاعات '{model.uid}' پیش آمده است. \r\n" + ex.Message,
					"خطا");

				zekrWin.Close();
				return;
			}

			zekrWin.Owner = Window.GetWindow(this);
			zekrWin.Show();
		}

		private async void ZekrRemoveClick(object sender, RoutedEventArgs e)
		{
			var model = (sender as Button)?.DataContext as ZekrIndex;
			if (model == null)
				return;
			var diag = new ContentDialog()
			{
				PrimaryButtonText = "بلی",
				CloseButtonText = "خیر",
				IsSecondaryButtonEnabled = false,
				Content = $"آیا از حذف '{model.fullName}' مطمئن هستید؟",
				DefaultButton = ContentDialogButton.Close
			};
			var diagResult = await diag.ShowAsync();
			if (diagResult == ContentDialogResult.Primary)
			{
				ZekrModelStore.RemoveZekr(model.uid);
				ZekrIndexStore.RemoveZekr(model.uid);
				_zekrIndexList.Remove(model);
			}
		}

		private void RefreshListClick(object sender, RoutedEventArgs e)
		{
			RefreshIndexList();
		}

		public event PropertyChangedEventHandler? PropertyChanged;

		[NotifyPropertyChangedInvocator]
		protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

	}
}
