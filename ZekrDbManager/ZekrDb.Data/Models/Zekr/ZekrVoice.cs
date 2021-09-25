namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrVoice : BaseModel
	{
		private string _name;
		private string _file;
		private long? _fileSize;

		public string name
		{
			get => _name;
			set { _name = value; OnPropertyChanged(); }
		}

		public string file
		{
			get => _file;
			set { _file = value; OnPropertyChanged(); }
		}

		public long? fileSize
		{
			get => _fileSize;
			set { _fileSize = value; OnPropertyChanged(); }
		}
	}
}