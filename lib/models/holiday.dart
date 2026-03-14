class Holiday {
  final String localName;
  final DateTime date;

  Holiday({required this.localName, required this.date});

  factory Holiday.fromJson(Map<String, dynamic> json) {
    return Holiday(
      localName: json['localName'],
      date: DateTime.parse(json['date']),
    );
  }
}
