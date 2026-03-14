import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/school_holiday_period.dart';

class SchoolHolidayService {
  static Future<List<SchoolHolidayPeriod>> fetchSchoolHolidaysForZone(
    String zone,
  ) async {
    final encodedWhere = Uri.encodeQueryComponent(
      'zones = "Zone $zone" and population = "Élèves"',
    );
    final url = Uri.parse(
      'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-calendrier-scolaire/records?select=description,start_date,end_date,zones,annee_scolaire&where=$encodedWhere&limit=100',
    );

    final response = await http.get(url).timeout(const Duration(seconds: 12));
    if (response.statusCode != 200) {
      throw Exception('Failed to fetch school holidays for zone $zone');
    }

    final decoded = json.decode(response.body) as Map<String, dynamic>;
    final results = (decoded['results'] as List<dynamic>? ?? const []);

    return results.map((raw) {
      final json = raw as Map<String, dynamic>;
      return SchoolHolidayPeriod(
        description: json['description'] as String? ?? 'Vacances scolaires',
        startDate: DateTime.parse(json['start_date'] as String),
        endDate: DateTime.parse(json['end_date'] as String),
        zone: json['zones'] as String? ?? 'Zone $zone',
        schoolYear: json['annee_scolaire'] as String? ?? '',
      );
    }).toList()
      ..sort((a, b) => a.startDate.compareTo(b.startDate));
  }
}
