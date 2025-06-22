import 'package:flutter/material.dart';
import '../models/best_vacation_period.dart';

class ResultsScreen extends StatefulWidget {
  final List<BestVacationPeriod> periods;
  final String selectedCountry;

  const ResultsScreen({
    super.key,
    required this.periods,
    required this.selectedCountry,
  });

  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  int visibleCount = 3;

  List<String> selectedColors = ['🟢'];

  // Active filters
  final Set<String> selectedRanks = {'🟢', '🟠'};

  @override
  Widget build(BuildContext context) {
    // Filtrage par couleur
    final filteredPeriods = widget.periods
        .where((p) => selectedRanks.contains(p.getRankColorEmoji()))
        .toList();

    final visiblePeriods = filteredPeriods.take(visibleCount).toList();
    final hasMore = visibleCount < filteredPeriods.length;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Results'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Center(child: Text(widget.selectedCountry)),
          )
        ],
      ),
      body: Column(
        children: [
          _buildLegendAndFilters(),
          const Divider(height: 0),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: hasMore ? visiblePeriods.length + 1 : visiblePeriods.length,
              itemBuilder: (_, index) {
                if (index < visiblePeriods.length) {
                  return _buildPeriodCard(visiblePeriods[index]);
                } else {
                  return Center(
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          visibleCount += 3;
                        });
                      },
                      child: const Text("Load more options"),
                    ),
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }


  Widget _buildLegendAndFilters() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Filter", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 12,
            children: [
              _buildFilterCheckbox('🟢', 'Great (≥ +3)'),
              _buildFilterCheckbox('🟠', 'Medium (+2)'),
              _buildFilterCheckbox('🔴', 'Low (≤ +1)'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFilterCheckbox(String emoji, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Checkbox(
          value: selectedRanks.contains(emoji),
          onChanged: (_) {
            setState(() {
              if (selectedRanks.contains(emoji)) {
                selectedRanks.remove(emoji);
              } else {
                selectedRanks.add(emoji);
              }
              visibleCount = 3; // Reset pagination
            });
          },
        ),
        Text('$emoji $label'),
      ],
    );
  }

  Widget _buildPeriodCard(BestVacationPeriod period) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "${period.getRankColorEmoji()} ${period.formatDate(period.startDate)} → ${period.formatDate(period.endDate)}",
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text("🎉 ${period.formatDate(period.relatedHoliday.date)} – ${period.relatedHoliday.localName}"),
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