import 'package:flutter/material.dart';
import '../services/holiday_service.dart';
import '../utils/date_optimizer.dart';
import 'results_screen.dart';
import 'package:country_flags/country_flags.dart';

const List<String> monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

class OptimizerScreen extends StatefulWidget {
  final String selectedCountry;

  const OptimizerScreen({super.key, required this.selectedCountry});

  @override
  State<OptimizerScreen> createState() => _OptimizerScreenState();
}

class _OptimizerScreenState extends State<OptimizerScreen> {
  int? selectedYear;
  int? selectedMonth;
  int? vacationDays;

  final _formKey = GlobalKey<FormState>();
  final List<int> availableYears = [2024, 2025, 2026];

  // ✅ Use this instead of conflicting `availableMonths`
  final List<Map<String, dynamic>> monthOptions = List.generate(
    12,
        (index) => {
      'label': monthNames[index],
      'value': index + 1,
    },
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vacation Optimizer'),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              children: [
                CountryFlag.fromCountryCode(
                  widget.selectedCountry,
                  height: 20,
                  width: 28,
                  borderRadius: 4,
                ),
                const SizedBox(width: 6),
                Text(widget.selectedCountry),
              ],
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                DropdownButtonFormField<int>(
                  decoration: const InputDecoration(labelText: 'Year', border: OutlineInputBorder()),
                  items: availableYears
                      .map((y) => DropdownMenuItem(value: y, child: Text('$y')))
                      .toList(),
                  value: selectedYear,
                  onChanged: (v) => setState(() => selectedYear = v),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<int>(
                  decoration: const InputDecoration(labelText: 'Month', border: OutlineInputBorder()),
                  items: monthOptions
                      .map((m) => DropdownMenuItem<int>(
                    value: m['value'],
                    child: Text(m['label']),
                  ))
                      .toList(),
                  value: selectedMonth,
                  onChanged: (v) => setState(() => selectedMonth = v),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  decoration: const InputDecoration(labelText: 'Vacation Days', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  onChanged: (v) => vacationDays = int.tryParse(v),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _handleOptimize,
                  child: const Text("Optimize Vacation"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _handleOptimize() async {
    if (selectedYear == null || selectedMonth == null || vacationDays == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('⚠️ Please fill in all fields')),
      );
      return;
    }

    final holidays = await HolidayService.fetchHolidays(widget.selectedCountry, selectedYear!);
    final results = DateOptimizer.findAllOptimizedPeriods(
      holidays: holidays,
      vacationDaysToUse: vacationDays!,
      year: selectedYear!,
      month: selectedMonth!,
    );

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => ResultsScreen(
          periods: results,
          selectedCountry: widget.selectedCountry,
        ),
      ),
    );
  }
}