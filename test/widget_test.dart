import 'package:flutter_test/flutter_test.dart';

import 'package:vacation_optimizer/main.dart';
import 'package:vacation_optimizer/app_language.dart';

void main() {
  setUp(() {
    appLanguageNotifier.value = AppLanguage.fr;
  });

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

  testWidgets('navigue vers la page Ponts et retrouve le CTA simulateur', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('Voir tous les ponts 2026'));
    await tester.tap(find.text('Voir tous les ponts 2026'));
    await tester.pumpAndSettle();

    expect(find.text('Ponts 2026 en France'), findsAtLeastNWidgets(1));
    expect(find.text('Utiliser le simulateur'), findsOneWidget);

    await tester.ensureVisible(find.text('Utiliser le simulateur'));
    await tester.tap(find.text('Utiliser le simulateur'));
    await tester.pumpAndSettle();

    expect(find.text('Simulateur'), findsAtLeastNWidgets(1));
  });

  testWidgets('affiche la page Ponts en anglais apres changement de langue', (
    WidgetTester tester,
  ) async {
    appLanguageNotifier.value = AppLanguage.en;
    await tester.pumpWidget(const VacationOptimizerApp());
    await tester.pumpAndSettle();

    expect(find.text('See all bridge ideas for 2026'), findsAtLeastNWidgets(1));
    await tester.ensureVisible(find.text('See all bridge ideas for 2026'));
    await tester.tap(find.text('See all bridge ideas for 2026'));
    await tester.pumpAndSettle();

    expect(find.text('Bridge ideas in France for 2026'), findsAtLeastNWidgets(1));
    expect(find.text('Use the planner'), findsOneWidget);
  });
}
