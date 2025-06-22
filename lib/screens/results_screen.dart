import 'package:flutter/material.dart';
import '../models/best_vacation_period.dart';

class ResultsScreen extends StatelessWidget {
  final List<BestVacationPeriod> periods;
  final String selectedCountry;

  const ResultsScreen({
    super.key,
    required this.periods,
    required this.selectedCountry,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Results'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Center(child: Text(selectedCountry)),
          )
        ],
      ),
      body: periods.isEmpty
          ? Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Text("🙁", style: TextStyle(fontSize: 64)),
              SizedBox(height: 16),
              Text("No interesting plans for these configurations.",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 18)),
            ],
          ),
        ),
      )
          : ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: periods.length,
        itemBuilder: (_, index) {
          final period = periods[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            elevation: 3,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${period.getRankColorEmoji()}  ${period.formatDate(period.startDate)} → ${period.formatDate(period.endDate)}",
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "🎉 ${period.formatDate(period.relatedHoliday.date)} – ${period.relatedHoliday.localName}",
                  ),
                  const Divider(height: 20),
                  Text("🏖️ Vacation used: ${period.vacationDaysUsed}"),
                  Text("😎 Total off: ${period.totalDaysOff}"),
                  Text("⭐ Worth: ${period.worthScore.toStringAsFixed(2)}"),
                  const Divider(height: 20),
                  _buildDateGroup("➕ Vacation Days", period.vacationDates, period),
                  _buildDateGroup("🧩 Bridge Days", period.bridgeDates, period),
                  _buildDateGroup("😴 Weekend", period.weekendDates, period),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildDateGroup(String title, List<DateTime> dates, BestVacationPeriod period) {
    if (dates.isEmpty) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text(
          dates.map((d) => period.formatDate(d)).join(', '),
          style: const TextStyle(color: Colors.teal),
        ),
        const SizedBox(height: 12),
      ],
    );
  }
}