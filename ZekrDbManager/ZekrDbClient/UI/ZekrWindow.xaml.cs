using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
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
	/// Interaction logic for ZekrWindow.xaml
	/// </summary>
	public partial class ZekrWindow : Window, INotifyPropertyChanged
	{

		public ZekrWindow()
		{
			InitializeComponent();
			ZekrModel = new Zekr();
		}

		private string _initUid;
		private List<ZekrCategory> _zekrCategories;
		private List<ZekrTag> _zekrTags;
		private List<KeyValuePair<string, string>> _zekrTimes;


		public static DependencyProperty ZekrModelProperty =
			DependencyProperty.Register(nameof(ZekrModel), typeof(Zekr), typeof(ZekrWindow),
				new FrameworkPropertyMetadata(null, OnZekrModelChangedPCC));

		private static void OnZekrModelChangedPCC(DependencyObject d, DependencyPropertyChangedEventArgs e)
		{
			var zekrWindow = ((ZekrWindow)d);
			zekrWindow.ZekrModel = (Zekr)e.NewValue;
			zekrWindow.InitBinding();
			if (zekrWindow.ZekrModel != null)
			{
				zekrWindow.ZekrSources.ZekrSourceModel = zekrWindow.ZekrModel.source;
				zekrWindow.ZekrBenefits.ZekrBenefitsModel = zekrWindow.ZekrModel.benefits;
			}
		}

		public Zekr ZekrModel
		{
			get => (Zekr)GetValue(ZekrModelProperty);
			set => SetValue(ZekrModelProperty, value);
		}

		private void InitBinding()
		{
			if (ZekrModel.tags?.Count > 0)
			{
				TagsCheckBox.SetSelectedItems<ZekrTag>(ZekrModel.tags, (tag, tags) => tags.Contains(tag.uid));
			}
			else
			{
				TagsCheckBox.SetSelectedItems(null);
			}
			if (ZekrModel.zekrTimes?.Count > 0)
			{
				ZekrTimesCheckBox.SetSelectedItems<KeyValuePair<string, string>>(
					ZekrModel.zekrTimes.Select(a => a.ToString()).ToList(),
					(entry, zekrTimes) => zekrTimes.Contains(entry.Key));
			}
			else
			{
				ZekrTimesCheckBox.SetSelectedItems(null);
			}

			_initUid = ZekrModel.uid;
		}

		public List<ZekrCategory> ZekrCategories
		{
			get
			{
				if (_zekrCategories == null)
					_zekrCategories = ZekrModelStore.ReadZekrCategories();
				return _zekrCategories;
			}
		}

		public List<ZekrTag> ZekrTags
		{
			get
			{
				if (_zekrTags == null)
					_zekrTags = ZekrModelStore.ReadZekrTags();

				return _zekrTags;
			}
		}

		public List<KeyValuePair<string, string>> ZekrTimes
		{
			get
			{
				if (_zekrTimes == null)
					_zekrTimes = EnumHelper.GetEnumNameList<ZekrTime>();

				return _zekrTimes;
			}
		}


		/// <exception cref="Exception">Loading failure</exception>
		public void LoadZekr(string uid)
		{
			var zekr = ZekrModelStore.LoadZekrByUid(uid);

			if (zekr != null)
			{
				ZekrModel = zekr;
			}
			else
			{
				ZekrModel = new Zekr();
			}
		}

		public void MarkZekrNew()
		{
			if (ZekrModel != null)
			{
				ZekrModel.uid = "";
			}
		}
		private void UpdateZekrTags()
		{
			var selectedTags = new List<string>(TagsCheckBox.SelectedItems.Count);
			foreach (ZekrTag tag in TagsCheckBox.SelectedItems)
			{
				selectedTags.Add(tag.uid);
			}

			ZekrModel.tags = selectedTags;
		}

		private void UpdateZekrTimes()
		{
			var selectedTimes = new List<ZekrTime>(ZekrTimesCheckBox.SelectedItems.Count);
			foreach (KeyValuePair<string, string> entry in ZekrTimesCheckBox.SelectedItems)
			{
				if (Enum.TryParse(typeof(ZekrTime), entry.Key, true, out var en))
				{
					selectedTimes.Add((ZekrTime)en);
				}
			}
			ZekrModel.zekrTimes = selectedTimes;
		}

		private void AddZekr_Click(object sender, RoutedEventArgs e)
		{
			if (ZekrModel.zekrBody == null)
				ZekrModel.zekrBody = new ObservableCollection<ZekrBody>();

			var body = new ZekrBody();
			ZekrModel.zekrBody.Add(body);

			MainScrollViwer.ScrollToBottom();
			//ListViewZekrList.SelectedIndex = ListViewZekrList.Items.Count - 1;
		}

		private void AddParsedBody_Click(object sender, RoutedEventArgs e)
		{
			if (ZekrModel == null)
				return;

			var parser = new ZekrBodyParser();
			if (parser.ShowDialog() == true)
			{
				var mergedBodies = parser.MergedRelatedTranslations;

				if (ZekrModel.zekrBody == null)
					ZekrModel.zekrBody = new ObservableCollection<ZekrBody>(mergedBodies);
				else
				{
					mergedBodies.ForEach(z => ZekrModel.zekrBody.Add(z));
				}
			}
		}

		private async void ZekrRemoveClick(ZekrBodyControl zekrBodyControl, ZekrBody zekr)
		{
			if (zekr == null)
				return;
			var removeResult = await UiCommon.ConfirmDialogAsync($"آیا واقعا مایل به حذف هستید؟", "حذف");

			if (removeResult == ContentDialogResult.Primary)
				ZekrModel.zekrBody.Remove(zekr);
		}
		private async void ZekrMoveUpClick(ZekrBodyControl zekrBodyControl, ZekrBody zekr)
		{
			if (zekr == null)
				return;

			var index = ZekrModel.zekrBody.IndexOf(zekr);
			if (index == 0)
				return;
			ZekrModel.zekrBody.Move(index, index - 1);
		}
		private async void ZekrMoveDownClick(ZekrBodyControl zekrBodyControl, ZekrBody zekr)
		{
			if (zekr == null)
				return;

			var index = ZekrModel.zekrBody.IndexOf(zekr);
			if (index == ZekrModel.zekrBody.Count - 1)
				return;
			ZekrModel.zekrBody.Move(index, index + 1);
		}

		public event PropertyChangedEventHandler? PropertyChanged;

		[NotifyPropertyChangedInvocator]
		protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
		}

		private void SaveButtonClick(object sender, RoutedEventArgs e)
		{
			if (string.IsNullOrWhiteSpace(_initUid) && !string.IsNullOrWhiteSpace(ZekrModel.uid))
			{
				// check if UID exists? no override
			}
			else if (_initUid != ZekrModel.uid)
			{
				// check if UID exists? no override

			}

			var validationResult = ZekrModel.Validate();
			if (!validationResult.IsValid)
			{
				UiCommon.ErrorDialogAsync(validationResult.ErrorsMessage, "اطلاعات فرم ناقص است");
				return;
			}

			ZekrModelStore.SaveZekr(ZekrModel);
			ZekrIndexStore.ApplyZekrIndex(ZekrModel);

			Close();
		}

		private void CancelButtonClick(object sender, RoutedEventArgs e)
		{
			Close();
		}

		private void TagsCheckBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
		{
			UpdateZekrTags();
		}

		private void ZekrTimeCheckBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
		{
			UpdateZekrTimes();
		}
 
		private void txtUid_LostFocus(object sender, RoutedEventArgs e)
		{
			var text = txtUid.Text.Trim().Replace(' ', '-').ToLower();
			txtUid.Text = text;

		}
	}
}
