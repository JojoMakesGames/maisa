using System.ComponentModel.DataAnnotations;

namespace Maisa.Models
{
    public class NumberToWordsRequest
    {
        [Required]
        public List<int> Numbers { get; set; } = new();
    };
    public class NumberToWords
    {
        public string NumberWord { get; set; } = string.Empty;

        public string URL { get; set; } = string.Empty;

        public NumberToWords(int number)
        {
            NumberWord = Convert(number);
            if (number > 9000)
            {
                URL = "https://i.kym-cdn.com/entries/icons/facebook/000/000/056/itsover1000.jpg";
            }
        }

        private static readonly Dictionary<int, string> _single_digits = new Dictionary<int, string>()
        {
            [0] = "",
            [1] = "One",
            [2] = "Two",
            [3] = "Three",
            [4] = "Four",
            [5] = "Five",
            [6] = "Six",
            [7] = "Seven",
            [8] = "Eight",
            [9] = "Nine",
            [10] = "Ten",
        };
        private static readonly Dictionary<int, string> _unique_nums = new Dictionary<int, string>()
        {
            [11] = "Eleven",
            [12] = "Twelve",
            [15] = "Fifteen",
        };
        private static readonly Dictionary<int, string> _unique_tens_prefixes = new Dictionary<int, string>()
        {
            [2] = "Twen",
            [3] = "Thir",
            [5] = "Fif"
        };
        private static string Convert(int number)
        {
            string output = "";
            if (number == 0)
            {
                return "Zero";
            }

            if (number < 0)
            {
                output += "Negative ";
                number = Math.Abs(number);
            }

            if ((number / 1000) > 0) {
                output += $"{Convert(number / 1000)} Thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0) {
                output += $"{Convert(number / 100)} Hundred ";
                number %= 100;
            }

            if (_unique_nums.ContainsKey(number))
            {
                output += $"{_unique_nums[number]}";
            }
            else if (number >= 20)
            {
                string prefix = _unique_tens_prefixes.ContainsKey(number / 10) ? _unique_tens_prefixes[number / 10] : _single_digits[number / 10];
                output += $"{prefix}ty {_single_digits[number % 10]}";
            }
            else if (number > 10)
            {
                output += $"{_single_digits[number % 10]}teen";
            }
            else
            {
                output += _single_digits[number];
            }

            return output.Trim();
        }
    };
}
