using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZekrDb.Data.Models.Zekr
{
	public class ZekrCounter : BaseModel
	{
		private string _name;
		private int _count;


		public string name
		{
			get => _name;
			set
			{
				_name = value;
				OnPropertyChanged();
			}
		}


		public int count
		{
			get => _count;
			set
			{
				_count = value;
				OnPropertyChanged();
			}
		}
	}
}