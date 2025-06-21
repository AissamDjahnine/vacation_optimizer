import 'package:flutter/material.dart';
import 'services/holiday_service.dart';
import 'utils/date_optimizer.dart';
import 'models/best_vacation_period.dart';

void main() {
  runApp(const VacationOptimizerApp());
}

class VacationOptimizerApp extends StatelessWidget {
  const VacationOptimizerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vacation Optimizer',
      theme: ThemeData(primarySwatch: Colors.teal),
      home: const VacationHomePage(),
    );
  }
}

class VacationHomePage extends StatefulWidget {
  const VacationHomePage({super.key});

  @override
  State<VacationHomePage> createState() => _VacationHomePageState();
}

class _VacationHomePageState extends State<VacationHomePage> {
  int? selectedYear;
  int? selectedMonth;
  String? selectedCountry;
  int? vacationDays;
  String outputMessage = "";
  List<BestVacationPeriod> optimizedPeriods = [];

  final _formKey = GlobalKey<FormState>();
  final List<int> availableYears = [2024, 2025, 2026];
  final List<int> availableMonths = List.generate(12, (index) => index + 1);
  final List<String> availableCountries = ['FR', 'US', 'DE'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Vacation Optimizer')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                _buildDropdown<int>('Year', availableYears, selectedYear,
                        (val) => setState(() => selectedYear = val)),
                const SizedBox(height: 16),
                _buildDropdown<int>('Month', availableMonths, selectedMonth,
                        (val) => setState(() => selectedMonth = val)),
                const SizedBox(height: 16),
                _buildDropdown<String>('Country', availableCountries, selectedCountry,
                        (val) => setState(() => selectedCountry = val)),
                const SizedBox(height: 16),
                _buildVacationDaysInput(),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _optimizeVacation,
                  child: const Text("Optimize Vacation"),
                ),
                const SizedBox(height: 24),
                Text(outputMessage, style: const TextStyle(fontSize: 16)),
                const SizedBox(height: 16),
                ...optimizedPeriods.map((p) => _buildResultCard(p)),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDropdown<T>(String label, List<T> options, T? value, Function(T?) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label),
        DropdownButtonFormField<T>(
          value: value,
          items: options.map((opt) => DropdownMenuItem(value: opt, child: Text('$opt'))).toList(),
          onChanged: onChanged,
          decoration: const InputDecoration(border: OutlineInputBorder()),
        ),
      ],
    );
  }

  Widget _buildVacationDaysInput() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Vacation Days to Use'),
        TextFormField(
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'e.g. 3',
          ),
          onChanged: (val) => vacationDays = int.tryParse(val),
        ),
      ],
    );
  }

  Future<void> _optimizeVacation() async {
    if (selectedYear == null ||
        selectedMonth == null ||
        selectedCountry == null ||
        vacationDays == null) {
      setState(() {
        outputMessage = "⚠️ Please fill all fields before optimizing.";
        optimizedPeriods.clear();
      });
      return;
    }

    final holidays = await HolidayService.fetchHolidays(selectedCountry!, selectedYear!);
    final results = DateOptimizer.findAllOptimizedPeriods(
      holidays: holidays,
      vacationDaysToUse: vacationDays!,
      year: selectedYear!,
      month: selectedMonth!,
    );

    setState(() {
      if (results.isEmpty) {
        outputMessage = "🙁 No interesting options found. Not worth it.";
        optimizedPeriods.clear();
      } else {
        outputMessage = "✅ Best vacation plans:";
        optimizedPeriods = results;
      }
    });
  }

  Widget _buildResultCard(BestVacationPeriod period) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "🗓 ${BestVacationPeriod.formatDate(period.startDate)} → ${BestVacationPeriod.formatDate(period.endDate)}",
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              "🎉 Public Holiday: ${BestVacationPeriod.formatDate(period.relatedHoliday.date)} – ${period.relatedHoliday.localName}",
              style: const TextStyle(fontSize: 14),
            ),
            const Divider(height: 20),
            Text("🏖️ Vacation used: ${period.vacationDaysUsed} days"),
            Text("😎 Total days off: ${period.totalDaysOff} days"),
            Text("⭐ Worth score: ${period.worthScore.toStringAsFixed(2)}"),
            const Divider(height: 20),
            _buildDateGroup("➕ Vacation Days", period.vacationDates),
            _buildDateGroup("🧩 Bridge Days", period.bridgeDates),
            _buildDateGroup("😴 Weekend", period.weekendDates),
          ],
        ),
      ),
    );
  }

  Widget _buildDateGroup(String title, List<DateTime> dates) {
    if (dates.isEmpty) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text(
          dates.map((d) => BestVacationPeriod.formatDate(d)).join(', '),
          style: const TextStyle(color: Colors.teal),
        ),
        const SizedBox(height: 12),
      ],
    );
  }
}