using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using ZekrDb.Data.Models.Zekr;
using ZekrDbClient.Common;

namespace ZekrDbClient.UI
{
	/// <summary>
	/// Interaction logic for ZekrBodyParser.xaml
	/// </summary>
	public partial class ZekrBodyParser : Window
	{
		public ZekrBodyParser()
		{
			InitializeComponent();
		}

		public ObservableCollection<ZekrBody> ParsedBodies { get; set; } = new ObservableCollection<ZekrBody>();

		public List<ZekrBody> MergedRelatedTranslations => ZekrParser.MergeRelatedTranslations(ParsedBodies.ToList());

		public string ZekrText => txtSource.Text;

		private void ProcessTextButtonClick(object sender, RoutedEventArgs e)
		{
			var text = txtSource.Text;
			if (string.IsNullOrWhiteSpace(text))
				return;

			var list = ZekrParser.ConvertTextLines(text);

			ParsedBodies.Clear();
			list.ForEach(z => ParsedBodies.Add(z));
		}

		private void btnSave_Click(object sender, RoutedEventArgs e)
		{
			if (string.IsNullOrWhiteSpace(ZekrText))
				return;
			DialogResult = true;
		}
	}
}
