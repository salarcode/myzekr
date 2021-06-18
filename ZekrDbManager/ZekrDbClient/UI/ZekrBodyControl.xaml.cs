using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Windows;
using System.Windows.Controls;
using ZekrDb.Data.Models;
using ZekrDb.Data.Models.Zekr;
using ZekrDbClient.Common;

namespace ZekrDbClient.UI
{
	/// <summary>
	/// Interaction logic for ZekrBodyControl.xaml
	/// </summary>
	public partial class ZekrBodyControl : UserControl//, INotifyPropertyChanged
	{
		public ZekrBodyControl()
		{
			InitializeComponent();
			BorderMain.BorderBrush = UiCommon.RandomDarkBrush();
		}


		public Action<ZekrBodyControl, ZekrBody> OnRemoveButtonClick { get; set; }
		public Action<ZekrBodyControl, ZekrBody> OnMoveUpButtonClick { get; set; }
		public Action<ZekrBodyControl, ZekrBody> OnMoveDownButtonClick { get; set; }

		public Visibility MoveUpButtonVisibility
		{
			get => MoveUpButton.Visibility;
			set => MoveUpButton.Visibility = value;
		}

		public Visibility RemoveButtonVisibility
		{
			get => RemoveButton.Visibility;
			set => RemoveButton.Visibility = value;
		}

		public Visibility MoveDownVisibility
		{
			get => MoveDownButton.Visibility;
			set => MoveDownButton.Visibility = value;
		}

		public Visibility TranslationBodyVisibility
		{
			get => AlternateBodyCheck.Visibility;
			set => AlternateBodyCheck.Visibility = value;
		}

		public Visibility AlternateBodyListCheckVisibility
		{
			get => AlternateBodyListCheck.Visibility;
			set => AlternateBodyListCheck.Visibility = value;
		}

		private void TheControl_Loaded(object sender, RoutedEventArgs e)
		{
			DataObject.AddPastingHandler(txtBody, OnBodyPaste);
		}

		private void TheControl_Unloaded(object sender, RoutedEventArgs e)
		{
			DataObject.RemovePastingHandler(txtBody, OnBodyPaste);
		}

		private void OnBodyPaste(object sender, DataObjectPastingEventArgs e)
		{
			// Note: تشخیص خودکار متن که آیا عربی هست یا نه
			// و انتخاب زبان

			var isText = e.SourceDataObject.GetDataPresent(DataFormats.UnicodeText, true);
			if (!isText) return;

			var text = e.SourceDataObject.GetData(DataFormats.UnicodeText) as string;
			if (string.IsNullOrWhiteSpace(text))
				return;

			if (ZekrBodyModel == null) return;
			if (ZekrBodyModel.languageKey != null) return;

			var arabicOrPersian = ZekrParser.IsArabicOrPersian(text);

			if (arabicOrPersian)
			{
				if (ZekrParser.IsArabicQuran(text))
				{
					ZekrBodyModel.languageKey = LanguageList.LanguageArabic;
				}
				else
				{
					ZekrBodyModel.languageKey = LanguageList.LanguageFarsi;
				}
			}
		}

		private void ZekrBodyControl_DataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
		{
			InitialBinding();
		}

		private void InitialBinding()
		{
			var model = ZekrBodyModel;
			if (model == null)
				return;

			if (ZekrBodyModel.alternateBodyList?.Count > 0)
			{
				AlternateBodyListCheck.IsChecked = true;
			}

			if (ZekrBodyModel.translationBody != null)
			{
				AlternateBodyCheck.IsChecked = true;
			}
		}

		public ZekrBody ZekrBodyModel
		{
			get => DataContext as ZekrBody;
			set => DataContext = value;
		}

		private void AddAlternateBody_Click(object sender, RoutedEventArgs e)
		{
			if (ZekrBodyModel == null)
				return;

			if (ZekrBodyModel.alternateBodyList == null)
				ZekrBodyModel.alternateBodyList = new ObservableCollection<ZekrBody>();

			var newZekr = new ZekrBody();
			ZekrBodyModel.alternateBodyList.Add(newZekr);
		}

		private void AddParsedBody_Click(object sender, RoutedEventArgs e)
		{
			if (ZekrBodyModel == null)
				return;

			var parser = new ZekrBodyParser();
			if (parser.ShowDialog() == true)
			{
				var mergedBodies = parser.MergedRelatedTranslations;

				if (ZekrBodyModel.alternateBodyList == null)
					ZekrBodyModel.alternateBodyList = new ObservableCollection<ZekrBody>(mergedBodies);
				else
				{
					mergedBodies.ForEach(z => ZekrBodyModel.alternateBodyList.Add(z));
				}
			}
		}

		private void OnAlternateBodyChange()
		{
			if (ZekrBodyModel == null)
			{
				AlternateBodyCheck.IsChecked = false;
				return;
			}

			if (AlternateBodyCheck.IsChecked == true)
			{
				if (ZekrBodyModel.translationBody == null)
				{
					ZekrBodyModel.translationBody = new ZekrBody();
				}
				AlternateBodyHost.ItemsSource = null;
				AlternateBodyHost.ItemsSource = new List<ZekrBody> { ZekrBodyModel.translationBody };
			}
			else
			{
				ZekrBodyModel.translationBody = null;
				AlternateBodyHost.ItemsSource = null;
			}
		}

		private void AlternateBodyCheck_Unchecked(object sender, RoutedEventArgs e)
		{
			OnAlternateBodyChange();
		}

		private void AlternateBodyCheck_Checked(object sender, RoutedEventArgs e)
		{
			OnAlternateBodyChange();
		}

		private void OnAlternateBodyListChange()
		{
			if (ZekrBodyModel == null)
			{
				AlternateBodyListCheck.IsChecked = false;
				return;
			}
			if (AlternateBodyListCheck.IsChecked == true)
			{
				gridAlternateBodyList.Visibility = Visibility.Visible;
			}
			else
			{
				gridAlternateBodyList.Visibility = Visibility.Collapsed;
				ZekrBodyModel.alternateBodyList?.Clear();
			}
		}

		private void AlternateBodyListCheck_Checked(object sender, RoutedEventArgs e)
		{
			OnAlternateBodyListChange();
		}

		private void AlternateBodyListCheck_Unchecked(object sender, RoutedEventArgs e)
		{
			OnAlternateBodyListChange();
		}

		private void AlternateBodyListRemoveButtonClick(object sender, RoutedEventArgs e)
		{
			if (ZekrBodyModel?.alternateBodyList == null)
				return;

			var btn = sender as Button;
			var zekr = btn?.Tag as ZekrBody;
			if (zekr == null)
				return;

			ZekrBodyModel.alternateBodyList.Remove(zekr);
		}

		private void RemoveButtonClick(object sender, RoutedEventArgs e)
		{
			OnRemoveButtonClick?.Invoke(this, ZekrBodyModel);
		}

		private void MoveUpButtonClick(object sender, RoutedEventArgs e)
		{
			OnMoveUpButtonClick?.Invoke(this, ZekrBodyModel);
		}

		private void MoveDownButtonClick(object sender, RoutedEventArgs e)
		{
			OnMoveDownButtonClick?.Invoke(this, ZekrBodyModel);
		}

		private void MoveUpButtonClick_OLD(object sender, RoutedEventArgs e)
		{
			if (ZekrBodyModel?.alternateBodyList == null)
				return;

			var btn = sender as Button;
			var zekr = btn?.Tag as ZekrBody;
			if (zekr == null)
				return;

			var index = ZekrBodyModel.alternateBodyList.IndexOf(zekr);
			if (index == 0)
				return;
			ZekrBodyModel.alternateBodyList.Move(index, index - 1);
		}

		private void MoveDownButtonClick_OLD(object sender, RoutedEventArgs e)
		{
			if (ZekrBodyModel?.alternateBodyList == null)
				return;

			var btn = sender as Button;
			var zekr = btn?.Tag as ZekrBody;
			if (zekr == null)
				return;

			var index = ZekrBodyModel.alternateBodyList.IndexOf(zekr);
			if (index == ZekrBodyModel.alternateBodyList.Count - 1)
				return;
			ZekrBodyModel.alternateBodyList.Move(index, index + 1);

		}

	}
}
