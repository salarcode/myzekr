using System;
using System.Collections;
using System.Collections.Generic;
using System.Windows.Controls;
using ReflectionMagic;

namespace ZekrDbClient.Common
{
	internal static class ListBoxExtensions
	{
		/// <summary>
		/// 
		/// </summary>
		/// <typeparam name="T">DataBound Item Type</typeparam>
		/// <param name="lb">List box</param>
		/// <param name="selected">List of selected values</param>
		/// <param name="exists">Check function if exists in selected list</param>
		internal static void SetSelectedItems<T>(this ListBox lb, List<string> selected, Func<T, List<string>, bool> exists)
		{
			var selectedItems = new List<T>();
			var boxItems = lb.Items;
			foreach (T item in boxItems)
			{
				if (exists(item, selected))
				{
					selectedItems.Add(item);
				}
			}

			if (selectedItems.Count == 0) return;

			SetSelectedItems(lb, selectedItems);
		}

		internal static void SetSelectedItems(this ListBox lb, IEnumerable selectedItems)
		{
			var tagsBox = lb.AsDynamic();
			tagsBox.SetSelectedItems(selectedItems);
		}
	}
}
