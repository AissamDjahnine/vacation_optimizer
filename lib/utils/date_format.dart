String formatDate(DateTime date) {
  return '${_weekdayName(date.weekday)} ${date.day.toString().padLeft(2, '0')} ${_monthName(date.month)} ${date.year}';
}

String _weekdayName(int weekday) {
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return names[weekday - 1];
}

String _monthName(int month) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month - 1];
}