using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using ZekrDb.Data.Models.Zekr;

namespace ZekrDbClient.UI
{
	/// <summary>
	/// Interaction logic for ZekrSourcesControl.xaml
	/// </summary>
	public partial class ZekrSourcesControl : UserControl
	{
		public ZekrSourcesControl()
		{
			InitializeComponent();
		}


		public static DependencyProperty ZekrSourceModelProperty =
			DependencyProperty.Register(nameof(ZekrSourceModel), typeof(ObservableCollection<ZekrReferenceSource>), typeof(ZekrSourcesControl),
				new FrameworkPropertyMetadata(null, OnZekrSourceModelChangedPCC));

		private static void OnZekrSourceModelChangedPCC(DependencyObject d, DependencyPropertyChangedEventArgs e)
		{
			var c = ((ZekrSourcesControl)d);
			c.ZekrSourceModel = (ObservableCollection<ZekrReferenceSource>)e.NewValue;
		}

		public ObservableCollection<ZekrReferenceSource> ZekrSourceModel
		{
			get => (ObservableCollection<ZekrReferenceSource>)GetValue(ZekrSourceModelProperty);
			set => SetValue(ZekrSourceModelProperty, value);
 		}

		private void NewSourceClicked(object sender, RoutedEventArgs e)
		{
			if (ZekrSourceModel == null)
			{
				ZekrSourceModel = new ObservableCollection<ZekrReferenceSource>();
			}

			var source = new ZekrReferenceSource();
			ZekrSourceModel.Add(source);
		}
	}
}
