import 'package:flutter_test/flutter_test.dart';

import 'package:vacation_optimizer/main.dart';

void main() {
  testWidgets('affiche le simulateur et les resultats de ponts', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    expect(find.text('Ponts Malins'), findsAtLeastNWidgets(1));
    expect(find.text('Simulateur'), findsAtLeastNWidgets(1));
    expect(find.text('Ponts 2026'), findsAtLeastNWidgets(1));
    expect(find.text('Vacances scolaires'), findsAtLeastNWidgets(1));
    expect(find.text('RTT mensuel'), findsOneWidget);
    expect(find.text('Ponts recommandés'), findsAtLeastNWidgets(1));
    expect(find.text('Mois suivant'), findsAtLeastNWidgets(1));
    expect(find.text('Ressources utiles'), findsOneWidget);
  });
}
