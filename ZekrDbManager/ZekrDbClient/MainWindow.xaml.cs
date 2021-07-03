using System.Windows;
using System.Windows.Media;

namespace ZekrDbClient
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

		private void Window_Loaded(object sender, RoutedEventArgs e)
		{
			this.WindowState = WindowState.Maximized;
		}

		private void sliderScaler_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
		{
			zekrIndex.Scale = e.NewValue;
		}
	}
}
