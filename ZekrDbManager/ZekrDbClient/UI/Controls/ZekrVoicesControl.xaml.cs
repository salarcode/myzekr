using Microsoft.Win32;
using ModernWpf.Controls;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using ZekrDb.Data.Models;
using ZekrDb.Data.Models.Zekr;
using ZekrDbClient.Common;

namespace ZekrDbClient.UI.Controls
{
	/// <summary>
	/// Interaction logic for ZekrVoicesControl.xaml
	/// </summary>
	public partial class ZekrVoicesControl : UserControl
	{
		public ZekrVoicesControl()
		{
			InitializeComponent();
		}

		public static DependencyProperty ZekrVoiceListModelProperty =
			DependencyProperty.Register(nameof(ZekrVoiceListModel), typeof(ObservableCollection<ZekrVoice>), typeof(ZekrVoicesControl),
				new FrameworkPropertyMetadata(null, OnZekrVoiceModelChangedPCC));

		private static void OnZekrVoiceModelChangedPCC(DependencyObject d, DependencyPropertyChangedEventArgs e)
		{
			var c = ((ZekrVoicesControl)d);
			c.ZekrVoiceListModel = (ObservableCollection<ZekrVoice>)e.NewValue;
		}

		public ObservableCollection<ZekrVoice> ZekrVoiceListModel
		{
			get => (ObservableCollection<ZekrVoice>)GetValue(ZekrVoiceListModelProperty);
			set => SetValue(ZekrVoiceListModelProperty, value);
		}

		private async void NewVoiceClicked(object sender, RoutedEventArgs e)
		{
			var openDiag = new OpenFileDialog();
			if (openDiag.ShowDialog() != true) return;

			var sourceFile = openDiag.FileName;
			var fileName = System.IO.Path.GetFileName(sourceFile);
			fileName = fileName.Replace(" ", "-").ToLower();

			if (ZekrModelStore.ZekrVoiceExists(fileName))
			{
				var overrideResult = await UiCommon.ConfirmDialogAsync($"فایل '{fileName}' قبلا وجود دارد. بازنویسی شود؟", "بازنویسی فایل موجود");
				if (overrideResult == ContentDialogResult.Primary)
				{
					ZekrModelStore.SaveZekrVoice(sourceFile, fileName);
				}
				else
				{
					return;
				}
			}
			else
			{
				ZekrModelStore.SaveZekrVoice(sourceFile, fileName);
			}
			if (ZekrVoiceListModel == null)
				ZekrVoiceListModel = new ObservableCollection<ZekrVoice>();

			ZekrVoiceListModel.Add(new ZekrVoice()
			{
				fileSize = ZekrModelStore.ZekrVoiceSize(fileName),
				file = fileName,
				name = ""
			});
		}

	}
}
