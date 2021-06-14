using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using ModernWpf.Controls;
using ZekrDb.Data.Models.Zekr;
using ZekrDbClient.Common;

namespace ZekrDbClient.UI
{
	/// <summary> Benefits
	/// Interaction logic for ZekrBenefitsControl.xaml
	/// </summary>
	public partial class ZekrBenefitsControl : UserControl
	{
		public ZekrBenefitsControl()
		{
			InitializeComponent();
		}

		public static DependencyProperty ZekrBenefitsModelProperty =
			DependencyProperty.Register(nameof(ZekrBenefitsModel), typeof(ObservableCollection<ZekrBody>), typeof(ZekrBenefitsControl),
				new FrameworkPropertyMetadata(null, OnZekrSourceModelChangedPCC));

		private static void OnZekrSourceModelChangedPCC(DependencyObject d, DependencyPropertyChangedEventArgs e)
		{
			var c = ((ZekrBenefitsControl)d);
			c.ZekrBenefitsModel = (ObservableCollection<ZekrBody>)e.NewValue;
		}

		public ObservableCollection<ZekrBody> ZekrBenefitsModel
		{
			get => (ObservableCollection<ZekrBody>)GetValue(ZekrBenefitsModelProperty);
			set => SetValue(ZekrBenefitsModelProperty, value);
		}

		private void AddBenefitClick(object sender, RoutedEventArgs e)
		{
			if (ZekrBenefitsModel == null)
				ZekrBenefitsModel = new ObservableCollection<ZekrBody>();
			ZekrBenefitsModel.Add(new ZekrBody());
		}


		private async void RemoveBenefitClick(ZekrBodyControl zekrBodyControl, ZekrBody zekr)
		{
			if (zekr == null)
				return;
			var removeResult = await UiCommon.ConfirmDialogAsync($"آیا واقعا مایل به حذف هستید؟", "حذف");

			if (removeResult == ContentDialogResult.Primary)
				ZekrBenefitsModel.Remove(zekr);
		}
	}
}
