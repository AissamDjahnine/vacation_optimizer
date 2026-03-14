import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/holiday.dart';

class HolidayService {
  static Future<List<Holiday>> fetchHolidays(
    String countryCode,
    int year,
  ) async {
    final url = Uri.parse(
      'https://date.nager.at/api/v3/PublicHolidays/$year/$countryCode',
    );

    final response = await http.get(url).timeout(const Duration(seconds: 12));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Holiday.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch holidays for $countryCode in $year');
    }
  }
}
