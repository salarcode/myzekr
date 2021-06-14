using System.Windows;
using ModernWpf;

namespace ZekrDbClient
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
	    public App()
	    {
            ThemeManager.Current.ApplicationTheme = ApplicationTheme.Light;
	    }
    }
}
